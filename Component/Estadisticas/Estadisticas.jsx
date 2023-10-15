import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import modoDark from '../../ModoDark';
import PieChart from 'react-native-pie-chart';
import { useFocusEffect } from '@react-navigation/native';
import ProgressCircle from 'react-native-progress-circle'
import axios from 'axios';

const Estadisticas = () => {

  const [historial, setHistorial] = useState([])
  const {theme} = useContext(modoDark)
  const [datosEnsayos,setDatosEnsayos] = useState()

  const widthAndHeight = 200
  const series = [400, 350, 800, 670]
  const sliceColor = ['bgNumeros', 'bgAlgebra', 'bgProb', 'bgGeometria'] /// colores de la aplicacion para cada tema.
  const labels = ['Números', 'Álgebra', 'Probabilidades', 'GeometrÍa']; // Etiquetas correspondientes a los valores de la serie

  useFocusEffect(
    React.useCallback(() =>{

    const getEssayData = async () =>{    
      try{
        const token = await AsyncStorage.getItem('token')
        axios.get('http://192.168.1.96:3000/allCorrectAnswers', {
          headers:{
            authorization: `Bearer ${token}`
        }})
        .then((response) => {setDatosEnsayos(response.data)})

      }catch(error){console.log(error)}
    }
    // getScore()
    getEssayData()
  },[]))

  
  return (
    <View style={[styles.contenedor, {backgroundColor:theme.bground.bgPrimary,}]}>

      <View style={styles.datos}>
        <Text style={styles.texto}>Promedio general por cada tema</Text>
        <View style={styles.pieChart}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              // sliceColor={sliceColor}
              sliceColor={sliceColor.map(colorKey => theme.bground[colorKey])} /// para usar el color de theme.
              coverRadius={0.55} // tamaño del vacio de la dona.
              coverFill={'#FFF'} // el color del vacio.
              labels={labels}
            />
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                {series.map((label, index) => (
                  <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: theme.bground[sliceColor[index]],
                        marginRight: 5,
                      }}
                    />
                      <View style={styles.datosPie}>
                        <View style={{width:100}}>
                          <Text>{labels[index]}</Text>
                        </View>
                        <Text style={{fontWeight:700}}>{label}</Text>
                      </View>
                    
                  </View>
                ))}
            </View>   
        </View> 
      </View>
      
      <View style={[styles.contenedorDatosEnsayos, {backgroundColor:'#fff'}]}>
            <Text style={{fontSize:17, fontWeight:600}}>Datos ensayos</Text>
            <View style={[styles.datosEnsayos, {borderBottomWidth:1,borderBottomColor:'black',}]}>
                  <ProgressCircle
                      percent={100}
                      radius={45}
                      borderWidth={8}
                      color="blue"
                      shadowColor="#999"
                      bgColor="#fff"
                  >
                    <Image style={{width:40, height:40}} source={require('../../assets/interrogacion.png')} />
                  </ProgressCircle> 
                  <View style={styles.infoEnsayo}>
                    { datosEnsayos ? 
                     <Text style={{fontSize:30, fontWeight:600}}>{datosEnsayos.questionsAnswered}</Text> :
                     (<Text>Cargando</Text>)
                    }    
                    
                    <Text style={{fontSize:15}}>Preguntas realizadas</Text>
                  </View>
            </View>
            <View style={styles.datosEnsayos}>
                  <ProgressCircle
                      percent={ datosEnsayos ? (datosEnsayos.correctAnswers * 100 / datosEnsayos.questionsAnswered) : (10) }
                      radius={45}
                      borderWidth={8}
                      color="#09F145"
                      shadowColor="#A2A5A2"
                      bgColor="#fff"
                  >
                    <Image style={{width:40, height:40}} source={require('../../assets/correctas.png')} />
                  </ProgressCircle> 
                  <View style={styles.infoEnsayo}>   
                    {
                      datosEnsayos ? <Text style={{fontSize:30, fontWeight:600}}>{datosEnsayos.correctAnswers}</Text> :
                      (<Text>Cargando...</Text>)
                    }
                    
                    <Text style={{fontSize:15}}>Preguntas correctas</Text>
                  </View>
            </View>
            
      </View>

    </View>
  )
}

export default Estadisticas

const styles = StyleSheet.create({

  contenedor:{
    display:'flex',
    flexDirection:'column',
    gap:20,
    height:'100%',
    padding:10
  },

  datos:{
    width:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    gap:20,
    backgroundColor:'#fff',
    borderRadius:20
  },
  texto:{
    fontSize:20,
    fontWeight:600
  },
  pieChart:{
    width:'90%',
    display:'flex',
    flexDirection:'row',
    // justifyContent:'space-between',
    padding:20,
    gap:30,
  },
  datosPie:{
    display:'flex',
    flexDirection:'row',
    gap:20,
  },
  contenedorDatosEnsayos:{
    width:'100%',
    borderRadius:20,
    display:'flex',
    flexDirection:'column',
    gap:20,
    padding:30
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