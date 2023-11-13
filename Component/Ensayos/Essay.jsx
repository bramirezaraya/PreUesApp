import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
// import theme from '../../theme/theme'
import {ImageBackground } from 'react-native-web'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { isCancel } from 'axios'
import {LOCAL_HOST} from '@env'
// props == nombre, cantidadPreguntas, tiempo en minutos, navigation, [id], isCustom. 

const Essay = (props) => {


  const nombreEnsayo = props.item.name
  const ensayoNombre = nombreEnsayo.slice(0,1).toUpperCase()
  let id_ensayo
  if(props.item.id === 5){
    id_ensayo=[1,2,3,4]
  }else{
    id_ensayo = [props.item.id]
  }
  
  const custom = props.item.isCustom


  const EliminarEnsayo = async() =>{

    const token = await AsyncStorage.getItem('token')

    axios.delete(`${LOCAL_HOST}:3000/logicalDelEssay?essayId=${id_ensayo}`, {headers:{
      Authorization: `Bearer ${token}`
    }})
    .then((response) => { props.setCantidadCustom(props.cantidadCustom -1)}) // actualizamos el setcantidadcustom, para que se renderice el componente.
    .catch((error) => console.log(error))
  
  }

  const eliminar = () =>{
    Alert.alert(

      "¿Seguro que deseas eliminar el ensayo?",
      "Esta acción no se puede deshacer",
      [
        {
          text:'Cancelar',
          onPress:() =>{},
          style:'cancel'
        },
        {
          text:'Eliminar',
          onPress:() =>{EliminarEnsayo()}
        },
      ]
    )
  }

  return (
    <View style={[styles.contenedor, {backgroundColor:props.theme.bground.bgInicio,}]}>
      
      <Image  style={styles.imagen} source={require('../../assets/imagenesEnsayo.png')} />
      { custom === 1 && (
        <TouchableOpacity style={styles.eliminar} onPress={() => eliminar()}>
           <Image style={styles.iconoEliminar} source={require('../../assets/eliminar.png')} />
        </TouchableOpacity>
       
      )}
      
      <View style={styles.contenedorDatos}>
        <Text style={[styles.textoName, {textAlign:'center', color: props.theme.colors.textSecondary,}]}>{ensayoNombre}{props.item.name.slice(1)}</Text>
        <View style={styles.datosEnsayo}>
            <Image style={styles.icono} source={require('../../assets/math.png')} />
           <Text style={[styles.texto, {color: props.theme.colors.textSecondary,}] }>{props.item.numberOfQuestions} preguntas</Text>
        </View>
        <View style={styles.datosEnsayo}>
          <Image style={styles.icono} source={require('../../assets/time.png')} />
          <Text style={[styles.texto, {color: props.theme.colors.textSecondary,}] }>{props.item.selectedTime} minutos</Text>
        </View> 
      </View>

      <TouchableOpacity style={[styles.boton, { backgroundColor:props.theme.bground.bgBoton,}]} onPress={() => props.navigation.navigate('EnsayoPrueba', {nombre:nombreEnsayo , id_ensayo:id_ensayo, isCustom:custom})}>
        <Text style={[styles.texto, {textAlign:'center', color: props.theme.colors.textNegro,}]}>Iniciar</Text>
      </TouchableOpacity>


    </View>
  )
}

export default Essay

const styles = StyleSheet.create({

  contenedor:{
    width: 250,
    height: 250,
    flexDirection:'column',
    borderRadius:10,
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:10,
    shadowOffset:{width: 2, height:3}, // en que lado afecta
    shadowOpacity:0.2, // la opacidad
    shadowRadius:3, // el radio de la sombra
    elevation:3,
    shadowColor:'#000000', // color del shadow
    margin:10,
    position:'relative'
  },

  texto:{
    fontWeight:600,  
    fontSize:16,
  },
  textoName:{
    fontWeight:600,
    fontSize:16,
  },

  imagen:{
      width:'100%',
      height:'50%',
      position:'absolute',
      borderRadius:10,
  },
  contenedorDatos:{
    position:'absolute',
    top:'50%',
    display:'flex',
    flexDirection:'column',
    width:'100%',
    gap:10,
  },
  icono:{
    width:20,
    height:20,
  },
  datosEnsayo:{
    display:'flex',
    flexDirection:'row',
    gap:10,
    marginLeft:20
  },
  boton:{
    position:'absolute',
    bottom:5,
    width:100,
    borderRadius:10,
    shadowOffset:{width: 2, height:3}, // en que lado afecta
    shadowOpacity:0.2, // la opacidad
    shadowRadius:3, // el radio de la sombra
    elevation:3,
    shadowColor:'#000000', // color del shadow
  },
  eliminar:{
    position:'absolute',
    top:5,
    right:10,
  },
  iconoEliminar:{
    width:20,
    height:20,
  }
})