import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
// import PieChart from 'react-native-pie-chart'
import { PieChart } from 'react-native-gifted-charts'

const PieChartData = ({theme, sliceColor, series, widthAndHeight, avegare, labels }) => {
  const data = [{value:100, color:'red'},{value:200,},{value:300},{value:400}]
  const [indexEnsayo, setIndexEnsayo] = useState(null)

  const ScaleEssay = (id) =>{
    if(indexEnsayo != id){
      setIndexEnsayo(id)
      return 0
    }
    setIndexEnsayo(null)
  }
  //exp://192.168.1.96:19000
  return (
    <View style={styles.pieChart}>

                  {/* PieChart anterior otra biblioteca*/}
                  {/* <PieChart
                    widthAndHeight={widthAndHeight}
                    series={series}
                    sliceColor={sliceColor.map(colorKey => theme.bground[colorKey])} /// para usar el color de theme.
                    coverRadius={0.55} // tamaño del vacio de la dona.
                    coverFill={'#FFF'} // el color del vacio.  
                  /> */}

                  {/* PieChart que muestra la distribucion de los temas.*/}
                  <PieChart 
                    data = {series}  
                    focusOnPress={true} 
                    toggleFocusOnPress={true} 
                    strokeWidth={0.07} 
                    strokeColor={'black'}
                    showText={true} 
                    showValuesAsLabels={true} 
                    radius={100}
                    onPress={(item) => ScaleEssay(item.id)}
                   />

                {/* datos de los temas*/}
                <View style={styles.infoPromedio}>
                    {avegare.map((label, index) => (
                      <View key={index} style={[styles.colorTemas, indexEnsayo!=null && index+1 === indexEnsayo ? {transform: [{ scale: 1.15 }], backgroundColor:'#FDBD14'} : null]}>
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
                            <Text style={{fontWeight:700}}>{label.promedio}</Text>
                          </View>
                        
                      </View>
                    ))}
                </View> 
            </View>
  )
}

export default PieChartData

const styles = StyleSheet.create({
    pieChart:{
      width:'100%',
      display:'flex',
      flexDirection:'row',
      padding:20,
      gap:20,
    },
    datosPie:{
      display:'flex',
      flexDirection:'row',
      gap:20,
    },
    infoPromedio:{
      flexDirection: 'column', 
      justifyContent: 'center', 
      gap:10
    },
    colorTemas:{
      flexDirection: 'row', 
      alignItems: 'center', 
      marginRight: 10,
      padding:8,
      borderRadius:15
    }
})