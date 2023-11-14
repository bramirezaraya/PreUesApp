import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
// import theme from '../../theme/theme'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import axios from 'axios'
import modoDark from '../../ModoDark'
import {LOCAL_HOST} from '@env'

const SesionInvitado = ({navigation}) => {

  const {theme} = useContext(modoDark)
  
  const EnsayoGeneral = async() =>{

    try{
        axios.get(`${LOCAL_HOST}:3000/allQuestions/`)
        .then((response) => {
          
          const arrayNumeros = response.data[0].questions.slice(0,2) // llamo solamente 1 pregunta de cada tema.
          const arrayAlgebra = response.data[1].questions.slice(0,2)
          const arrayProbabilidad = response.data[2].questions.slice(0,2)
          const arrayGeometria = response.data[3].questions.slice(0,2)
          const ensayoGeneral = arrayNumeros.concat(arrayAlgebra,arrayProbabilidad,arrayGeometria)
          navigation.navigate('EnsayoInvitado', {ensayo: ensayoGeneral, tiempo:16, largo:ensayoGeneral.length})
      })
      .catch((error) => console.log(error))
    }catch(error){
      console.log(error)
    }
  }

  return (
    <View style={[styles.contenedor, {backgroundColor:theme.bground.bgPrimary,}]}>

        <View style={styles.contenedorDatos}>
          <View style={[styles.contenedorTexto, {backgroundColor: theme.bground.bgInicio,}]}>
              <Text style={styles.texto}>Estas como usuario <Text style={{fontWeight:700}}>Invitado</Text></Text>
              <Text style={styles.texto}>Solo tendras acceso a realizar un ensayo general de 8 preguntas</Text>       
          </View>
        </View>

        {/* contenedor Ensayo. */}
        <View style={[styles.contenedorEnsayo, {backgroundColor:theme.bground.bgEnsayosInicio,}]}>

              <TouchableOpacity style={[styles.boton, {height:40, width:'40%', backgroundColor:theme.bground.bgInicioBotones,}]}>
                <Text style={[styles.texto, {color:theme.colors.textPrimary, fontWeight:700}]}>Ensayo General</Text>
              </TouchableOpacity>

            <View style={[styles.containerEnsayo, {backgroundColor:theme.bground.bgInicio,}]}>
                  <Image style={styles.imagen} source={require('../../assets/imagenesEnsayo.png')} />
                  <View style={styles.datosEnsayo}>
                        <Text style={{fontWeight:600, textAlign:'center', fontSize:16}}>Ensayo General</Text>
                        <View style={styles.datos}>
                            <Image style={styles.icono} source={require('../../assets/math.png')} />
                            <Text style={{fontSize:15}}>8 Preguntas</Text>
                        </View>
                        <View style={styles.datos}>
                            <Image style={styles.icono} source={require('../../assets/time.png')} />
                            <Text style={{fontSize:15}}>16 Minutos</Text>
                        </View>                      
                  </View>
                  <View style={styles.contenedorBoton}>
                      <TouchableOpacity style={[styles.botonInicio, {backgroundColor:theme.bground.bgBoton,}]} onPress={() => EnsayoGeneral()}>
                          <Text>Iniciar</Text>
                      </TouchableOpacity>
                  </View>
            </View>

        </View>

        <View style={styles.contenedorIniciar}>
              <View style={[styles.datosIniciar, {backgroundColor:theme.bground.bgInicio,}]}>
                  <Text style={styles.texto}>Para acceder a todas las herramientas <Text style={{fontWeight:700, color:theme.colors.textbottom}}>Inicia Sesión !</Text> </Text>
                  <TouchableOpacity style={[styles.boton, {backgroundColor:theme.bground.bgInicioBotones,}]} onPress={() => navigation.navigate('Log') }>
                      <Text style={[styles.texto, {color:theme.colors.textPrimary, fontWeight:700}]}>Inciar Sesión</Text>
                  </TouchableOpacity>
              </View>
        </View>
    </View>
  )
}

export default SesionInvitado

const styles = StyleSheet.create({

  contenedor:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    height:'100%'
  },
  contenedorDatos:{
    margin:20,
  },
  contenedorTexto:{
      width:'100%',
      height:100,
      padding:30,
      borderRadius:10,
      shadowOffset:{width: 2, height:3}, // en que lado afecta
      shadowOpacity:0.2, // la opacidad
      shadowRadius:4, // el radio de la sombra
      elevation:4,
      shadowColor:'#000000', // color del shadow,
      justifyContent:'center',
      alignItems:'center',
      gap:10
  },
  texto:{
    fontSize:16,
    fontWeight:600
  },

  contenedorEnsayo:{
    width:'100%',
    height:'50%',
    padding:30,
    justifyContent:'center',
    alignItems:'center',
    gap:30
  },

  containerEnsayo:{
    width:'60%',
    height:'70%',
    borderRadius:10,
  },

  imagen:{
    top:0,
    position:'absolute',
    width:'100%',
    height:'50%'
  },
  datosEnsayo:{
    display:'flex',
    flexDirection:'column',
    gap:10,
    position:'absolute',
    top:'50%',
    padding:10,
    width:'100%'
  },
  datos:{
    display:'flex',
    flexDirection:'row',
    gap:10,
  },

  icono:{
    width:25,
    height:25
  },
  contenedorBoton:{
    position:'absolute',
    bottom:5,
    right:5
  },

  botonInicio:{
    width:100,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
  },

  contenedorIniciar:{
    margin:20
  },
  datosIniciar:{
    width:'100%',
    height:130,
    padding:20,
    borderRadius:10,
    shadowOffset:{width: 2, height:3}, // en que lado afecta
    shadowOpacity:0.2, // la opacidad
    shadowRadius:4, // el radio de la sombra
    elevation:4,
    shadowColor:'#000000', // color del shadow,
    alignItems:'center',
    justifyContent:'space-between',
    gap:20
  },

  boton:{
    borderRadius:10,
    width:'70%',
    height:30,
    justifyContent:'center',
    alignItems:'center'
  },


})