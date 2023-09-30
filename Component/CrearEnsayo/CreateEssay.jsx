import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
// import theme from '../../theme/theme';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import modoDark from '../../ModoDark';

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
  

  const enviarDatos =  async() =>{
    if(!tema || !nombre || !preguntas || !minutos){
      return alert('Debe marcar todas las opciones')
    }else{
      if(tema.length < 2){
        return alert('Debe elegir dos temas como minimo')
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

        axios.post('http://192.168.1.96:3000/newEssay/', ensayoPersonalizado, {headers:{
          Authorization:`Bearer ${token}`
        }}).then((response) => { setMinutos(), setNombre(''),setPreguntas(),setTema([]), dropdownRefPreguntas.current.reset(), dropdownRefMinutos.current.reset(), navigation.navigate('MenuLogin')})

      }catch(error){
        console.log(error)
      }
      //post para guardar el ensayo creado.



      
    }

  }

  return (
    <View style={[styles.contenedor, {backgroundColor:theme.bground.bgPrimary,}]}>
          <View style={[styles.contenedorDatos, {backgroundColor:theme.bground.bgSecondary,}]}>
            <View>
              <Text style={{ textAlign:'center', fontSize:20, color:theme.colors.textSecondary}}>Crear Ensayo</Text>
              <Text style={[styles.titulo, {borderBottomColor:theme.bground.bgBorderColor, textAlign:'justify', padding:10, paddingBottom:10, borderBottomWidth:2, color:theme.colors.textSecondary}]}>Para crear su ensayo debe ingresar los siguientes datos.</Text>
            </View>
              
              <View>
                <Text style={[styles.tituloDatos, { color:theme.colors.textSecondary, fontSize:16}]}>Escriba un nombre para su ensayo</Text>
                <View style={styles.nombre}>
                  <TextInput 
                    placeholder='Ingrese un nombre'
                    style={[styles.input, {backgroundColor:theme.bground.bgBlanco,}]}
                    value={nombre}
                    onChangeText={(value) => setNombre(value)}
                  />
                </View>
              </View>

              <View>
                  <Text style={[styles.tituloDatos, {color:theme.colors.textSecondary, fontSize:16}]}>Debe seleccionar dos temas como minimo.</Text>
                  <View style={styles.temas}>
                      <TouchableOpacity style={[styles.boton, {backgroundColor: tema.includes(4) ? theme.bground.bgBotonCrearEnsayo : theme.bground.bgBlanco}]}
                        onPress={() => seleccionarTema(4)}
                      >
                          <Text style={[styles.texto]}>Geometria</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={[styles.boton, {backgroundColor: tema.includes(1) ? theme.bground.bgBotonCrearEnsayo : theme.bground.bgBlanco}]}
                        onPress={() => seleccionarTema(1)}
                      >
                          <Text style={[styles.texto]}>Algebra</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={[styles.boton, {backgroundColor: tema.includes(2) ? theme.bground.bgBotonCrearEnsayo : theme.bground.bgBlanco}]}
                        onPress={() => seleccionarTema(2)}
                      >
                          <Text style={[styles.texto]}>Numeros</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={[styles.boton, {backgroundColor: tema.includes(3) ? theme.bground.bgBotonCrearEnsayo: theme.bground.bgBlanco}]}
                        onPress={() => seleccionarTema(3)}
                      >
                          <Text style={[styles.texto]}>Probabilidad</Text>
                      </TouchableOpacity>
                  </View>
              </View>
              <View>
                    <Text style={[styles.tituloDatos, {color:theme.colors.textSecondary, fontSize:16}]}>Seleccione la cantidad de preguntas.</Text>
                    <View style={styles.preguntas}>
                        <SelectDropdown 
                          data={[12,20,32,40]}
                          buttonStyle={[styles.dropdown, {backgroundColor:theme.bground.bgBlanco}]} // estilo del boton
                          buttonTextStyle={styles.colorDropdown} // estilo del texto
                          dropdownStyle={[styles.drop, {backgroundColor:theme.bground.bgPrimary}]} // estilo del dropdown al desplegarze
                          defaultButtonText='Cantidad de preguntas'/// nombre por defecto
                          ref={dropdownRefPreguntas}
                          // rowTextStyle={styles.colorDropdown} /// el estilo de cada fila.
                          onSelect={(item)=> setPreguntas(item)}
                        />
                    </View>
              </View>
              
              <View>
                    <Text style={[styles.tituloDatos, {color:theme.colors.textSecondary, fontSize:16}]}>Seleccione la cantidad de minutos.</Text>
                    <View style={styles.minutos}>
                        <SelectDropdown 
                          data={[15,30,45,60]}
                          buttonStyle={[styles.dropdown, {backgroundColor:theme.bground.bgBlanco}]} // estilo del boton
                          buttonTextStyle={styles.colorDropdown} // estilo del texto
                          dropdownStyle={[styles.drop, {backgroundColor:theme.bground.bgPrimary}]} // estilo del dropdown al desplegarze
                          defaultButtonText='Cantidad de minutos'
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
    padding:10,
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
    fontSize:16,
    fontWeight:600,
    borderBottomWidth:1,
    marginTop:10,
    marginBottom:10,
  },

 tituloDatos:{
  textAlign:'center', 
  fontWeight:600
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
    margin:10,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center'
  },
  minutos:{
    margin:10,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center'
  },
  input:{
    display:'flex',
    width:'100%',
    height:40,
    borderRadius:15,
    padding:10,
  },
  nombre:{
    margin:10,
    display:'flex',
    alignItems:'center'
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