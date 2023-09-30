import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PureChart from 'react-native-pure-chart-bar-kit';
import modoDark from '../../ModoDark';
// import theme from '../../theme/theme';


const Estadisticas = () => {

  const [historial, setHistorial] = useState([])
  const [historial2, setHistorial2] = useState([100,100,200,500,700,1000,600,100,200])
  const [fecha, setFecha] = useState(['10-10-11','10-10-13','10-10-15','10-10-15','10-10-15','10-10-16','10-10-16','10-10-16','10-10-16'])

  const {theme} = useContext(modoDark)
  const [datos, setDatos] = useState([{x:'10-09-2023', y:100, name:'gola'},{x:'10-09-2023', y:200},{x:'11-09-2023', y:500},{x:'12-09-2023', y:1000},{x:'12-09-2023', y:800}])

  useEffect(() =>{

    const getScore = async() =>{

      try{
        const token = await AsyncStorage.getItem('token')

        const respuesta = await fetch(`http://192.168.1.96:3000/history`, {
          method:'GET',
          headers:{
            authorization: `Bearer ${token}`
          }
        })
        const data = await respuesta.json()

        const historialFiltrado = data.historial.filter((datos) => datos != null) // filtramos para tener solo los que se completaron.
        historialFiltrado.map((item, index) =>{
          setHistorial((previusScore) => [...previusScore, item.score])
        })
        // setHistorial(historialFiltrado)
      }catch(error){
        console.log(error)
      }
    }

    getScore()
  },[])

  return (
    <View style={[styles.contenedor, {backgroundColor:theme.bground.bgPrimary,}]}>
      <Text style={styles.texto}>Estadisticas</Text>

      <View style={styles.datos}>
        <Text>Puntaje obtenido en cada ensayo</Text>
        <PureChart  backgroundColor={'#3FC5D3'} color={"#65EB22"} data={datos} type='line' height={500}  width={'100%'} numberOfYAxisGuideLine={5} />
      </View>
      


      {/* <LineChart
    data={{
      labels: fecha.map((item) => item),
      datasets: [
        {
          data: historial2.map((datos) => datos),
        }
      ]
    }}
    
    width={Dimensions.get("window").width} // from react-native
    height={500}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      decimalPlaces:0,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  /> */}
    </View>
  )
}

export default Estadisticas

const styles = StyleSheet.create({

  contenedor:{
    display:'flex',
    flexDirection:'column',
    gap:20,
    height:'100%'
  },

  datos:{
    width:'100%',
    height:500,
    // textAlign:'center',
    // justifyContent:'center',
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  texto:{
    fontSize:18,
    fontWeight:600
  },
  // chart:{
  //   backgroundColor:'#000',
  //   padding:10
  // }

})