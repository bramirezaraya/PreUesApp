import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import ProgressCircle from 'react-native-progress-circle'
const RenderizadoEstadistica = ({item, index, theme}) => {
  return (
    <View style={[styles.contenedorDatosEnsayos, {backgroundColor:'#fff'}]}>
               <Text style={{fontSize:17, fontWeight:600}}>{item.name}</Text>
                <View style={[styles.datosEnsayos, {borderBottomWidth:1,borderBottomColor:'black',}]}>
                      <ProgressCircle
                          percent={100}
                          radius={35}
                          borderWidth={8}
                          color="blue"
                          shadowColor="#999"
                          bgColor="#fff"
                      >
                        <Image style={{width:30, height:30}} source={require('../../assets/interrogacion.png')} />
                      </ProgressCircle> 
                      <View style={styles.infoEnsayo}>
                        { item ? 
                        <Text style={{fontSize:30, fontWeight:600}}>{item.questionsAnswered}</Text> :
                        (<Text>Cargando...</Text>)
                        }    
                        
                        <Text style={{fontSize:15}}>Preguntas realizadas</Text>
                      </View>
                </View>
                <View style={styles.datosEnsayos}>
                      <ProgressCircle
                          percent={ item ? (item.correctAnswers * 100 / item.questionsAnswered) : (10) }
                          radius={35}
                          borderWidth={8}
                          color="#09F145"
                          shadowColor="#A2A5A2"
                          bgColor="#fff"
                      >
                        <Image style={{width:30, height:30}} source={require('../../assets/correctas.png')} />
                      </ProgressCircle> 
                      <View style={styles.infoEnsayo}>   
                        {
                          item ? 
                          <Text style={{fontSize:30, fontWeight:600}}>{item.correctAnswers}</Text> 
                          : (<Text>Cargando...</Text>)
                        }
                        
                        <Text style={{fontSize:15}}>Preguntas correctas</Text>
                      </View>
                </View> 
              </View>
  )
}

export default RenderizadoEstadistica

const styles = StyleSheet.create({
    contenedorDatosEnsayos:{
        // width:'100%',
        borderRadius:20,
        display:'flex',
        flexDirection:'column',
        gap:20,
        padding:30,
        shadowOffset:{width: 2, height:3}, // en que lado afecta
        shadowOpacity:0.2, // la opacidad
        shadowRadius:3, // el radio de la sombra
        elevation:3,
        shadowColor:'#000000', // color del shadow
        margin:20,
        marginLeft:5,
        height:320,
        position:'relative'
      },
      datosEnsayos:{
        display:'flex',
        flexDirection:'row',
        gap:20,
        padding:20
      },
      infoEnsayo:{
        display:'flex',
        flexDirection:'column',
        // gap:20,
        padding:5,
        justifyContent:'space-evenly'
    },
})