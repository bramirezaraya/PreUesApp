import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PieChart from 'react-native-pie-chart'

const PieChartData = ({theme, sliceColor, series, widthAndHeight, avegare, labels }) => {
  return (
    <View style={styles.pieChart}>
                  <PieChart
                  widthAndHeight={widthAndHeight}
                  series={series}
                  // sliceColor={sliceColor}
                  sliceColor={sliceColor.map(colorKey => theme.bground[colorKey])} /// para usar el color de theme.
                  coverRadius={0.55} // tamaño del vacio de la dona.
                  coverFill={'#FFF'} // el color del vacio.
                  
                />
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    {avegare.map((label, index) => (
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
        width:'90%',
        display:'flex',
        flexDirection:'row',
        padding:20,
        gap:30,
      },
      datosPie:{
        display:'flex',
        flexDirection:'row',
        gap:20,
      },
})