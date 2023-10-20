import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import modoDark from '../../ModoDark';
import { useFocusEffect } from '@react-navigation/native';
import ProgressCircle from 'react-native-progress-circle'
import axios from 'axios';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import RenderizadoEstadistica from './RenderizadoEstadistica';
import PieChartData from './PieChartData'; // componenente
import PureChart from 'react-native-pure-chart';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';
import { color } from 'react-native-reanimated';


const Estadisticas = () => {

  const [historial, setHistorial] = useState([])
  const {theme} = useContext(modoDark)
  const [datosEnsayos,setDatosEnsayos] = useState()
  const [avegare, setAverage] = useState([])

  const widthAndHeight = 200
  var series = 1
  const sliceColor = [ 'bgAlgebra', 'bgGeometria', 'bgNumeros','bgProb'] /// colores de la aplicacion para cada tema.
  const labels = ['Álgebra','Geometría', 'Números',  'Probabilidades', ]; // Etiquetas correspondientes a los valores de la serie

  useFocusEffect(
    React.useCallback(() =>{

    const getEssayData = async () =>{    
      try{
        const token = await AsyncStorage.getItem('token')
        axios.get('http://192.168.1.96:3000/groupTopicCorrectAnswers?materia=matematica', {
          headers:{
            authorization: `Bearer ${token}`
        }})
        .then((response) => {setDatosEnsayos(response.data)})

      }catch(error){console.log(error)}
    }

    const getAverage = async () =>{
      const token = await AsyncStorage.getItem('token')
      try{
        axios.get('http://192.168.1.96:3000/allAverageScore/',{headers:{
          Authorization:`Bearer ${token}`
        }})
        .then((response) => {setAverage(response.data)} )

      }catch(error){
        console.log(error)
      }
    }

    const getScore = async() =>{
      const token = await AsyncStorage.getItem('token')
      axios.get('http://192.168.1.96:3000/scores/', {headers:{
        Authorization:`Bearer ${token}`
      }}).then((response) => setHistorial(response.data))

    }

    getAverage()
    getEssayData()
    getScore()
  },[]))

  if(avegare){
    series = avegare.map(item => item.promedio)
  }
  /// para setear el color en un nuevo array.
  let datosScore
  if(historial.length > 0){
      datosScore = historial.map( historial => ({
        ...historial,
        frontColor: theme.bground[historial.color]
      }))
  }

  return (
    <ScrollView style={[styles.contenedor, {backgroundColor:theme.bground.bgPrimary}]}>

      {/*Datos de la grafica.  */}
      <View style={styles.datosPieChart}>
          <BarChart 
          data = {datosScore ? datosScore : []} 
          maxValue={1000} 
          stepValue={100} 
          height={400} width={400} 
          yAxisOffset={0} 
          showScrollIndicator={true}
          xAxisLabelTexts={datosScore ? datosScore.map((item, index) => item.createdAt) : []} // label del x
          spacing={60} // espaciado entre cada bar
          yAxisColor={'black'} // color de la linea y
          xAxisColor={'black'} // color linea x
          rulesColor={'#000'} // lineas pequeñas
          xAxisLabelTextStyle={{color:'black'}} /// color del texto X
          yAxisTextStyle={{color:'black'}} // color del texto Y
        /> 
      </View>
      

      {/* <PieChart data = {data} maxValue={1000} stepValue={100} height={400} width={400} focusOnPress={true} toggleFocusOnPress={true} strokeWidth={0.5} strokeColor={'black'} showText={true} showValuesAsLabels={true} /> */}

      {/* El pie chart que muestra el promedio de cada tema. */}
      <View style={styles.datos}>
        <Text style={[styles.texto, {marginTop:10,}]}>Promedio general por cada tema</Text>
          { avegare && series.length > 0 ? 
            <PieChartData 
              theme={theme}
              sliceColor={sliceColor}
              series={series}
              widthAndHeight={widthAndHeight}
              avegare={avegare}
              labels={labels}
            />
               
            : <Text>Cargando...</Text>      
            
            } 
      </View>
            
      
      {/* datos del ensayo por cada tema (pregunta totales y correctas) */} 
      <View style={styles.contenedorDatosEnsayos}>
        <Text style={[styles.texto, {textAlign:'center', color:theme.colors.textSecondary}]}>Datos Ensayos</Text>
        { datosEnsayos ?
                <FlatList 
                  data={datosEnsayos}
                  horizontal={true} 
                  renderItem={({item, index}) => (RenderizadoEstadistica({item, index, theme}))}
                  keyExtractor={(item) => item.name}
                />
                : <Text>Cargando...</Text>
                }
      </View> 
            
            
     

    </ScrollView>
  )
}

export default Estadisticas

const styles = StyleSheet.create({

  contenedor:{
    display:'flex',
    flexDirection:'column',
    gap:20,
    height:'100%',
    padding:10,
  },

  datos:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    gap:20,
    backgroundColor:'#fff',
    borderRadius:20,
    shadowOffset:{width: 2, height:3}, // en que lado afecta
    shadowOpacity:0.2, // la opacidad
    shadowRadius:3, // el radio de la sombra
    elevation:3,
    shadowColor:'#000000', // color del shadow
    marginLeft:15,
    marginRight:15,
  },
  texto:{
    fontSize:20,
    fontWeight:600
  },
  contenedorDatosEnsayos:{
    width:'100%',
    display:'flex',
    flexDirection:'column',
    padding:10,
  },
  datosPieChart:{
    margin:10,
    shadowOffset:{width: 2, height:3}, // en que lado afecta
    shadowOpacity:0.2, // la opacidad
    shadowRadius:3, // el radio de la sombra
    elevation:3,
    shadowColor:'#000000', // color del shadow
    borderRadius:15,
    padding:10
  }
})