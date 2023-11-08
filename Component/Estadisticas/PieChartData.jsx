import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { PieChart } from 'react-native-gifted-charts'

const PieChartData = ({theme, sliceColor, series, widthAndHeight, avegare, labels }) => {
  const [indexEnsayo, setIndexEnsayo] = useState(null)
  // los ordenamos para que queden con sus id en orden ascendente.
  avegare.sort((a,b) => a.id - b.id)

  const ScaleEssay = (id) =>{
    if(indexEnsayo != id){
      setIndexEnsayo(id)
      return 0
    }
    setIndexEnsayo(null)
  }

  return (
    <View style={styles.pieChart}>

                  {/* PieChart que muestra la distribucion de los temas.*/}
                <View style={{flex:1}}>
                  <PieChart 
                    data = {series}  
                    focusOnPress={true} 
                    toggleFocusOnPress={true} 
                    strokeWidth={0.1} 
                    strokeColor={'#000'}
                    showText={true} 
                    showValuesAsLabels={true} 
                    radius={90}
                    onPress={(item) => ScaleEssay(item.id)}
                   />
                </View>
                  

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
      gap:5,
      flex:1
    },
    colorTemas:{
      flexDirection: 'row', 
      alignItems: 'center', 
      padding:8,
      borderRadius:15
    }
})