import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
// import theme from '../../theme/theme';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import modoDark from '../../ModoDark';
import {LOCAL_HOST} from '@env'

const CreateEssay = ({navigation}) => {

  const {theme} = useContext(modoDark)
  const [nombre, setNombre] = useState('')
  const [tema, setTema] = useState([])
  const [preguntas, setPreguntas] = useState();
  const [minutos, setMinutos] = useState();


  const dropdownRefPreguntas = useRef({}) // para resetear el dropdown cuando se envie. usamos la referencia.
  const dropdownRefMinutos = useRef({})


  // funcion que agrega o elimina el ensayo que ha marcado el usuario.
 const seleccionarTema = (Idensayo) =>{
    // en caso que el ensayo ya este, lo quitamos. esto quiere decir que el usuario lo desmarco.
    if(tema.includes(Idensayo)){
      setTema(tema.filter((t) => t !== Idensayo ))
    }
    else{
      // usamos propagacion para añadir el nuevo ensayo.
      setTema([...tema, Idensayo])
    }
 }

 const ValidarNombre = (nombre) =>{
    if(nombre.length > 22){
        return true
    }
    return false
 }

 const ValidarEspacios = (nombre) =>{
  const spaceCount = (nombre.match(/ /g) || []).length; // para contar los espacios.
  if(spaceCount > 2){
    return true
  }

  return false
 }

  const enviarDatos =  async() =>{
    if(!tema || !nombre || !preguntas || !minutos){
      return alert('Debe marcar todas las opciones')
    }else{
      if(tema.length < 2){
        return alert('Debe elegir dos temas como minimo')
      }
      if(ValidarEspacios(nombre) || ValidarNombre(nombre)){
        return alert('Por favor, verifique el formato del campo nombre')
      }
      
      try{
    
        const id_usuario = await AsyncStorage.getItem('id_usuario');
        const token = await AsyncStorage.getItem('token')
        // datos del ensayo creado.
        const ensayoPersonalizado = {
            userId:id_usuario,
            essayIDS: tema,
            numberOfQuestions: preguntas,
            isCustom:'1',
            name: nombre,
            durationTime:minutos,
        }

        axios.post(`${LOCAL_HOST}:3000/newEssay/`, ensayoPersonalizado, {headers:{
          Authorization:`Bearer ${token}`
        }}).then((response) => { setMinutos(), setNombre(''),setPreguntas(),setTema([]), dropdownRefPreguntas.current.reset(), dropdownRefMinutos.current.reset(), navigation.navigate('MenuLogin')})

      }catch(error){
        console.log(error)
      }
      //post para guardar el ensayo creado. 
    }

  }
  // cantidad de preguntas
  const data = {
    0: [6, 12, 16, 20],
    1: [6, 12, 16, 20],
    2: [6, 12, 16, 20],
    3: [9, 18, 24, 30],
    4: [12, 24, 32, 40]
  };
  return (
    <View style={[styles.contenedor, {backgroundColor:theme.bground.bgPrimary,}]}>
          <View style={styles.infoTitulos}>
            <Text style={{fontSize:22, fontWeight:700, color:theme.colors.textSecondary}}>Crear Ensayo</Text>
            <Text style={[styles.titulo, {textAlign:'justify', color:theme.colors.textSecondary}]}>Para crear su ensayo, complete los siguientes campos</Text>
          </View>
          
          <View style={[styles.contenedorEssay, {backgroundColor:theme.bground.bgCreateEssay}]}>
            <View style={{gap:10}}>
              <Text style={[styles.tituloDatos, { color:theme.colors.textSecondary}]}>Nombre</Text>
              <View style={styles.nombre}>
                <TextInput 
                  placeholder='Ingrese un nombre'
                  style={[styles.input, {backgroundColor:theme.bground.bgBlanco,}]}
                  value={nombre}
                  onChangeText={(value) => [setNombre(value), ValidarNombre(value)]}
                  // maxLength={22}
                />
                {ValidarNombre(nombre) && <Text style={{color:theme.colors.incorrecta, marginTop:10}}>Debe contener maximo 22 caracteres</Text>}
                {ValidarEspacios(nombre) && <Text style={{color:theme.colors.incorrecta, marginTop:10}}>Debe contener maximo 2 espacios</Text>}
              </View>
            </View>

                <View>
                    <Text style={[styles.tituloDatos, {color:theme.colors.textSecondary}]}>Tema</Text>
                    <Text style={{fontSize:17,color:theme.colors.textSecondary}}>Debe seleccionar dos temas</Text>
                    <View style={styles.temas}>
                        <TouchableOpacity style={[styles.boton, {backgroundColor: tema.includes(4) ? theme.bground.bgBotonCrearEnsayo : theme.bground.bgBlanco}]}
                          onPress={() => seleccionarTema(4)}
                        >
                            <Text style={[styles.texto]}>Geometría</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.boton, {backgroundColor: tema.includes(1) ? theme.bground.bgBotonCrearEnsayo : theme.bground.bgBlanco}]}
                          onPress={() => seleccionarTema(1)}
                        >
                            <Text style={[styles.texto]}>Álgebra</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.boton, {backgroundColor: tema.includes(2) ? theme.bground.bgBotonCrearEnsayo : theme.bground.bgBlanco}]}
                          onPress={() => seleccionarTema(2)}
                        >
                            <Text style={[styles.texto]}>Números</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.boton, {backgroundColor: tema.includes(3) ? theme.bground.bgBotonCrearEnsayo: theme.bground.bgBlanco}]}
                          onPress={() => seleccionarTema(3)}
                        >
                            <Text style={[styles.texto]}>Probabilidad</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{gap:10}}>
                      <Text style={[styles.tituloDatos, {color:theme.colors.textSecondary}]}>Preguntas</Text>
                      <View style={styles.preguntas}>
                          <SelectDropdown 
                            data={data[tema.length]}
                            buttonStyle={[styles.dropdown, {backgroundColor:theme.bground.bgBlanco}]} // estilo del boton
                            buttonTextStyle={styles.colorDropdown} // estilo del texto
                            dropdownStyle={[styles.drop, {backgroundColor:theme.bground.bgPrimary}]} // estilo del dropdown al desplegarze
                            defaultButtonText='Seleccione el numero de preguntas'/// nombre por defecto
                            ref={dropdownRefPreguntas}
                            // rowTextStyle={styles.colorDropdown} /// el estilo de cada fila.
                            onSelect={(item)=> setPreguntas(item)}
                          />
                      </View>
                </View>
                
                <View style={{gap:10}}>
                      <Text style={[styles.tituloDatos, {color:theme.colors.textSecondary}]}>Tiempo</Text>
                      <View style={styles.minutos}>
                          <SelectDropdown 
                            data={[15,30,45,60]}
                            buttonStyle={[styles.dropdown, {backgroundColor:theme.bground.bgBlanco}]} // estilo del boton
                            buttonTextStyle={styles.colorDropdown} // estilo del texto
                            dropdownStyle={[styles.drop, {backgroundColor:theme.bground.bgPrimary}]} // estilo del dropdown al desplegarze
                            defaultButtonText='Seleccione los minutos deseado'
                            ref={dropdownRefMinutos}
                            // rowTextStyle={styles.colorDropdown} /// el estilo de cada fila.
                            onSelect={(item) => setMinutos(item)}
                          />
                      </View>
                </View>

              <View style={styles.contenedorBoton}>
                <TouchableOpacity style={[styles.botonRealizar, {backgroundColor:theme.bground.bgBotonCrearEnsayo,}]} onPress={() => enviarDatos()}>
                  <Text style={styles.texto}>Crear Ensayo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
  )   
}

export default CreateEssay

const styles = StyleSheet.create({
  contenedor:{
    // flex:1,
    height:'100%',
    display:'flex',
    flexDirection:'column',
    textAlign:'justify'
  },
  contenedorDatos:{
    height:'98%',
    display:'flex',
    flexDirection:'column',
    borderRadius:15,
    padding:5,
    gap:30,
  },
  contenedorEssay:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    height:'75%',
    padding:30,
  },
  infoTitulos:{
    padding:30,
    display:'flex',
    flexDirection:'column',
    gap:10,
    width:'90%'
  },
  contenedorBoton:{
    display:'flex',
    alignItems:'center'
  },
  boton:{
    width:150,
    height:30,
    borderRadius:15,
    display:'flex',
    justifyContent:'center',
    margin:10
  },
  temas:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
  },
  titulo:{
    fontSize:20,
    fontWeight:600,
    marginTop:10,
  },

 tituloDatos:{
  fontSize:18,
  fontWeight:700
  },
  botonPregunta:{
    width:50,
    height:30,
    borderRadius:15,
    display:'flex',
    justifyContent:'center',
    // backgroundColor:theme.bground.bgPrimary,
    margin:10
  },
  texto:{
    textAlign:'center', 
    fontSize:16
  },
  preguntas:{
    display:'flex',
    flexDirection:'row',
  },
  minutos:{
    display:'flex',
    flexDirection:'row',
    
  },
  input:{
    display:'flex',
    width:'100%',
    height:40,
    borderRadius:15,
    padding:10,
  },
  nombre:{
    display:'flex',
    alignItems:'center',
    width:'80%'
  },
  botonRealizar:{
    height:30,
    borderRadius:15,
    justifyContent:'center',
    width:200,
  },
  dropdown:{
    width:'80%',
    height:40,
    borderRadius:15,
  },
  colorDropdown:{
    fontSize:15
  },
  drop:{
      borderRadius:15,
  },
})