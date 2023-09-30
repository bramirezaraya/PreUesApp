import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import modoDark from './ModoDark'
const BotonesDrawer = (props) => {

  const {theme} = useContext(modoDark)
  return (
    
    <View style={[styles.contenedor, props.estado && {backgroundColor:theme.bground.drawerMarcado}]}>
      <TouchableOpacity style={styles.boton} onPress={props.onPress}>
        <Image source={props.Imagen} resizeMode="contain" style={{width:25, height:25,}} />
        <Text style={[styles.texto, {color:theme.colors.textSecondary}, props.estado && {color:theme.colors.textBlanco}]}>{props.Text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BotonesDrawer

const styles = StyleSheet.create({

    contenedor:{
        width:240,
        height:40,
        marginBottom:20,
        borderRadius:15,
    },

    texto:{
        fontSize:16,
        fontWeight:700,
        color:'#262121'
    },
    boton:{
        width:'100%', 
        height:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        gap:10
    }

})