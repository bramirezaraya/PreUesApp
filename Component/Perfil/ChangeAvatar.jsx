import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import RenderAvatar from './RenderAvatar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '@react-navigation/stack';
const ChangeAvatar = ({theme, AvatarImages, avatar, setAvatar, setCambiarAvatar}) => {

  // paso los valores del objecto a un array.
  const data = Object.entries(AvatarImages).map(([key, value]) => ({
    key,
    ...value,
  }));

  const [avatarElegido, setAvatarElegido] = useState(avatar.name)

  const CambiarAvatar = async(nameAvatar) =>{
    if(nameAvatar !== avatar.name){
      try{
          const token = await AsyncStorage.getItem('token')
          axios.patch(`http://192.168.1.96:3000/changeAvatar/`,{dirAvatar:nameAvatar}, 
          {headers:{
            Authorization:`Bearer ${token}`
          }})
          .then(async(response) => {
            alert('Se ha cambiado correctamente')
            await AsyncStorage.setItem('avatar', nameAvatar)
          })
      }catch(error){
        console.log(error)
      }
    }else{
      alert('Selecciona un avatar distinto')
    }
  }

  return (
    <View style={[styles.contenedorCambiarAvatar,{backgroundColor:theme.bground.bgChange} ]}>
          <Text style={styles.texto}>Sus avatares</Text>

          <FlatList 
            data={data}
            horizontal={true}
            renderItem={({item, index}) => 
            (RenderAvatar({item, index, setAvatarElegido, avatarElegido, theme, setAvatar}))} 
          />      
          <View style={styles.botonCambiarAvatar}>
            <TouchableOpacity onPress={() => setCambiarAvatar(false) } style={[styles.botonAvatar, {backgroundColor:theme.bground.bgBotonCrearEnsayo,}]}>
              <Text>Salir</Text>
             </TouchableOpacity>
            <TouchableOpacity onPress={() =>CambiarAvatar(avatarElegido)} style={[styles.botonAvatar, {backgroundColor:theme.bground.bgBotonCrearEnsayo,}]} >
              <Text>Cambiar Avatar</Text>
            </TouchableOpacity>                  
        </View>
    </View>
  )
}

export default ChangeAvatar

const styles = StyleSheet.create({

  contenedorCambiarAvatar:{
    position:'absolute',
    top:80,   
    left:70, 
    height:300,
    width:340,
    borderRadius:10,
    padding:20,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    zIndex:2
  },
  texto:{
    fontSize:20,
    fontWeight:700
  },
  botonCambiarAvatar:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%'
  },
  botonAvatar:{
    padding:8,
    borderRadius:15,
  },
})