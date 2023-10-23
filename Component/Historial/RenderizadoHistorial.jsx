import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, { useContext, useState } from 'react'
// import theme from '../../theme/theme'
// import modoDark from '../../ModoDark'
const RenderizadoHistorial = ({item, index, navigation, theme}) => {

    const verMas = () =>{
        navigation.navigate('EnsayoFeedback', { id: item.id });
    }

    // const {theme} = useContext(modoDark)
    // const fecha = new Date(item.createdAt)
    //{item.name.slice(7,8).toUpperCase()+item.name.slice(8)}
  return (
    <View style={[styles.contenedorDatos, {borderBottomColor:theme.bground.bgBorderColor,}]}>
      <Text style={{fontSize:13,textAlign:'center', color:theme.colors.textSecondary, width:'20%'}}>{item.name.slice(0,1).toUpperCase()+item.name.slice(1)}</Text>
      <Text style={{fontSize:13,textAlign:'center', color:theme.colors.textSecondary, width:'20%'}}>{item.score}</Text>
      <Text style={{fontSize:13,textAlign:'center', color:theme.colors.textSecondary, width:'20%'}}>{item.createdAt.slice(0,10)}</Text>
      <Text style={{fontSize:13,textAlign:'center', color:theme.colors.textSecondary, width:'20%'}}>{item.numberOfQuestions}</Text>
      <TouchableOpacity style={[styles.boton, {backgroundColor:theme.bground.bgBlanco, }]} onPress={()=> verMas()}>
            <Text style={{fontSize:13, textAlign:'center'}}>Ver mas</Text>
      </TouchableOpacity>
    </View>
  )
}

export default RenderizadoHistorial

const styles = StyleSheet.create({
    contenedorDatos:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        paddingTop:20,
        paddingBottom:10,
        justifyContent:'space-between',
        borderBottomWidth:2,
    },
    boton:{
      width:60,
      height:20,
      borderRadius:10
    }
})