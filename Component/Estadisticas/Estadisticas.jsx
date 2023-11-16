import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect, useState, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import modoDark from '../../ModoDark';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import RenderizadoEstadistica from './RenderizadoEstadistica';
import PieChartData from './PieChartData'; // componenente
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';
import SelectDropdown from 'react-native-select-dropdown';
import {LOCAL_HOST} from '@env'
const Estadisticas = () => {

  const [historial, setHistorial] = useState([])
  const {theme} = useContext(modoDark)
  const [datosEnsayos,setDatosEnsayos] = useState()
  const [avegare, setAverage] = useState([])
  const [tema, setTema] = useState('Todos')

  const widthAndHeight = 200
  var series = 1
  const sliceColor = [ 'bgNumeros', 'bgAlgebra','bgProb', 'bgGeometria'] /// colores de la aplicacion para cada tema.
  const labels = ['Números', 'Álgebra','Probabilidades', 'Geometría']; // Etiquetas correspondientes a los valores de la serie

  const dropdownRefTema = useRef({}) // para resetear el dropdown cuando se envie. usamos la referencia.

  // numeros, algebra, probabilidades, geometria
  useFocusEffect(
    React.useCallback(() =>{
    
    // funcion para recibir todas las respuestas correctas que ha tenido el usuario por tema.
    const getEssayData = async () =>{    
      try{
        const token = await AsyncStorage.getItem('token')
        axios.get(`${LOCAL_HOST}:3000/groupTopicCorrectAnswers?materia=matematica`, {
          headers:{
            authorization: `Bearer ${token}`
        }})
        .then((response) => {setDatosEnsayos(response.data)})

      }catch(error){console.log(error)}
    }

    // funcion para recibir el promedio de cada  temas.
    const getAverage = async () =>{
      const token = await AsyncStorage.getItem('token')
      try{
        axios.get(`${LOCAL_HOST}:3000/allAverageScore/`,{headers:{
          Authorization:`Bearer ${token}`
        }})
        .then((response) => {setAverage(response.data)} )

      }catch(error){
        console.log(error)
      }
    }

    // funcion para recibir los punrajes de cada ensayo predeterminado
    const getScore = async() =>{
      const token = await AsyncStorage.getItem('token')
      axios.get(`${LOCAL_HOST}:3000/scores/`, {headers:{
        Authorization:`Bearer ${token}`
      }}).then((response) => {
        
        const historialFiltrado = response.data.filter(item => item.value > 0)
        setHistorial(historialFiltrado)})

    }

    getAverage()
    getEssayData()
    getScore()
  },[]))

  /// cada vez que se entre a este componente se llamaran estas funciones.
  useFocusEffect(
    React.useCallback(() =>{

      const getScore = async() =>{
        const token = await AsyncStorage.getItem('token')
        if(tema === 'Todos'){
          axios.get(`${LOCAL_HOST}:3000/scores/`, {headers:{
            Authorization:`Bearer ${token}`
          }}).then((response) => {
            const historialFiltrado = response.data.filter(item => item.value > 0)
            setHistorial(historialFiltrado)})
        }else{
          axios.get(`${LOCAL_HOST}:3000/scores?name=${tema}`, {headers:{
            Authorization:`Bearer ${token}`
          }}).then((response) => {
            const historialFiltrado = response.data.filter(item => item.value > 0)
            setHistorial(historialFiltrado)})
        }
      }
      getScore()
    },[tema])
  )

  // promedio de los puntajes para el pieChart.
  if(avegare){
    series = avegare.map(item => ({
      value: item.promedio,
      id: item.id,
      color: theme.bground[sliceColor[item.id-1]],
      textColor:'#fff',
      fontWeight:700
    }))
  }
  /// para setear el color en un nuevo array.
  let datosScore
  if(historial.length > 0){
      datosScore = historial.map( historial => ({
        ...historial,
        frontColor: theme.bground[historial.color],
        sideColor:theme.bground[historial.color],
        topColor:theme.bground[historial.color],
      }))
  }

  return (
    <ScrollView style={[styles.contenedor, {backgroundColor:theme.bground.bgPrimary}]} contentContainerStyle={{gap:30}}>

      <View style={{gap:5, marginLeft:10}}>
          <Text style={{fontSize:22, fontWeight:700, color:theme.colors.textSecondary}}>Estadisticas</Text>
          <Text style={{fontSize:20, color:theme.colors.textSecondary}}>Progreso de tus ensayos</Text>
      </View>

      {/*Datos de la grafica.  */}
      <View style={[styles.datosPieChart , {backgroundColor:'#fff'}]}>
          <View style={styles.drop}>
            <SelectDropdown 
              data={['Todos', 'Números', 'Álgebra', 'Probabilidades', 'Geometría']}
              buttonStyle={[styles.dropdown, {backgroundColor:theme.bground.bgBlanco}]} // estilo del boton
              // buttonTextStyle={styles.colorDropdown} // estilo del texto
              // dropdownStyle={[styles.drop, {backgroundColor:theme.bground.bgPrimary}]} // estilo del dropdown al desplegarze
              defaultButtonText='Filtrar'/// nombre por defecto
              ref={dropdownRefTema}
              renderDropdownIcon={() => {return( <Image style={{width:35, height:35}} source={require('../../assets/filtrar.png')} />)}}
              dropdownIconPosition='right'
              // rowTextStyle={styles.colorDropdown} /// el estilo de cada fila.
              onSelect={(item)=> setTema(item)}
            />
          </View>
          <View style={{flex:1}}>
            <BarChart 
              data = {datosScore ? datosScore : []} 
              isThreeD
              maxValue={1000} 
              stepValue={100} 
              height={350}
              width={260}
              scrollToIndex={datosScore ? datosScore[0] : 0}
              rulesType='solid'
              barWidth={25}
              barBorderTopLeftRadius={20}
              barBorderTopRightRadius={20}
              isAnimated={true}
              yAxisOffset={0}
              showScrollIndicator={true}
              shiftX={200}
              xAxisLabelTexts={datosScore ? datosScore.map((item, index) => item.createdAt) : []} // label del x (fechas)
              spacing={140} // espaciado entre cada bar
              initialSpacing={30}
              yAxisColor={'black'} // color de la linea y
              xAxisColor={'black'} // color linea x
              rulesColor={'#000'} // lineas pequeñas
              xAxisLabelTextStyle={{color:'black'}} /// color del texto X
              yAxisTextStyle={{color:'black'}} // color del texto Y
              renderTooltip={(item, index) => {
                return(
                  <View style={[styles.infoEnsayo, {backgroundColor:theme.bground[item.color],right: datosScore.length - 1 === index && datosScore.length > 1 ? '0%'  : null }]}>
                    <Text style={{color:theme.colors.textBlanco, fontWeight:700}}>Tema : {item.name}</Text>
                    <Text style={{color:theme.colors.textBlanco, fontWeight:700}}>Puntaje : {item.value}</Text>
                    <Text style={{color:theme.colors.textBlanco, fontWeight:700}}>Fecha : {item.createdAt}</Text>
                  </View>
                )
              }}
            /> 
          </View>
                    
      </View>
      
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
    position:'relative',
    display:'flex',
    flexDirection:'column',
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
    padding:10,
    position:'relative',
    marginBottom:30
  },
  infoEnsayo:{
    position:'absolute',
    top:'20%',
    padding:10,
    borderRadius:15,
    width:170
  },
  drop:{
    width:'100%',
    display:'flex',
    justifyContent:'flex-end',
    alignItems:'flex-end',
    height:50
  },
  dropdown:{
    width:'40%'
  }
})