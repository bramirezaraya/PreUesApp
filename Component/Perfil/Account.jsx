import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import theme from '../../theme/theme'
import { TextInput } from 'react-native-gesture-handler'
import validator from 'validator'
import modoDark from '../../ModoDark'
import { useFocusEffect } from '@react-navigation/native'
import ChangePassword from './ChangePassword'
import ChangeAvatar from './ChangeAvatar'
import {LOCAL_HOST} from '@env'
const Account = () => {

  const {theme} = useContext(modoDark)

  // Hooks que se utilizaran en este componente.
  const [usuario, setUsuario] = useState()
  const [email, setEmail] = useState()
  const [cambiarContraseña, setCambiarContraseña] = useState(false)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
  const [validadorPassword, setValidadorPassword] = useState(false)
  const [monedas, setMonedas] = useState(0)
  const [cambiarAvatar, setCambiarAvatar] = useState(false)
  const [avatar, setAvatar] = useState()

  // imagenes de perfil.
  const AvatarImages = {
    avatar1: {img:require('../../assets/avatar1.png'), name:'avatar1'},
    avatar2: {img:require('../../assets/avatar2.png'), name:'avatar2'},
    avatar3: {img:require('../../assets/avatar3.png'), name:'avatar3'},
    avatar4: {img:require('../../assets/avatar4.png'), name:'avatar4'},
  }


  // función para validar que las dos contraseñas sean iguales.
  const validarPassword = () =>{
    if(newPassword !== '' && newPasswordConfirm !== ''){
      // se hace la comprobacion de que sean identicas y cumplan la validacion.
      if(validator.equals(newPassword, newPasswordConfirm) && newPassword.length >= 4){
        return true
      }
    }
    return false
  }

  // función para cambiar la contraseña del usuario.
  const cambiarPassword = async() =>{

      if(password!== ''){
          if(validarPassword()){
              try{
                const token = await AsyncStorage.getItem('token')
                axios.patch(`${LOCAL_HOST}:3000/changePassword`,{
                  oldPassword:password,
                  newPassword:newPassword
                },{headers:{
                  Authorization:`Bearer ${token}`
                }}
                ).then((response) => {
                  if(response.data.success === 1){ 
                    alert('Su contraseña ha sido cambiada con exito!')

                    // seteamos todo por defecto.
                    setPassword(''),
                    setNewPassword(''),
                    setNewPasswordConfirm(''),
                    setCambiarContraseña(false)
                }})
                .catch((error) => alert('Contraseña ingresada incorrecta. Intentelo nuevamente'))
              }catch(error){
                console.log(error)
              }
          }
          else{
            if(newPassword.length < 4){
              return alert('La nueva contraseña debe contener mas de 3 caracteres.')
            }
            return alert('Las contraseñas deben coincidir')
          }
      }
      else{
        return alert('Por favor, ingresa tu contraseña!')
      }

      
  }

  const Cancelar = () =>{
    setCambiarContraseña(false), 
    setPassword(''),
    setNewPassword(''),
    setNewPasswordConfirm('')
  }

  useFocusEffect(
    React.useCallback(() =>{

    llamarDatos = async() =>{
      const mail = await AsyncStorage.getItem('email')
      const user = await AsyncStorage.getItem('usuario')
      const imagen = await AsyncStorage.getItem('avatar')
      setAvatar(AvatarImages[imagen]) // la seteamos con el avatar que tiene, buscamos el nombre en el objecto de imagen.
      setEmail(JSON.parse(mail))
      setUsuario(JSON.parse(user))
    }
    const getScore = async() =>{

      try{
        const token = await AsyncStorage.getItem('token')
      
      axios.get(`${LOCAL_HOST}:3000/coins/`, {headers:{
        Authorization: `Bearer ${token}`
      }})
      .then(response => {setMonedas(response.data.coins)})
      }catch(error) {
        console.log(error)
      }
    }

    llamarDatos()
    getScore()

  },[avatar]))


  return (
    <View style={[styles.contenedor, {backgroundColor:theme.bground.bgPrimary,}]}>

      <View style={[styles.contenedorDatos, {backgroundColor: theme.bground.bgPerfil,}]}>
            <View style={styles.usuario}>
                  <Text style={[styles.texto , {color:theme.colors.textBlanco,}]}>{usuario}</Text>
                  <Text style={[styles.texto , {color:theme.colors.textBlanco,}]}>{email}</Text>
                  <View style={styles.puntos}>
                      <Text style={[styles.texto , {color:theme.colors.textBlanco,}]}>Sus puntos son : {monedas}</Text>
                      <Image source={require('../../assets/dollar.png')} />
                  </View>
            </View>
            <View style={styles.perfil}>
                  {avatar && <Image style={styles.imagen} source={avatar.img} />}
            </View> 
      </View>

      <View style={[styles.contenedorBotones, {backgroundColor:theme.bground.bgPerfil,}]}>
              <Text style={[styles.texto , {color:theme.colors.textBlanco,}]}>Configuraciones</Text>
              <View style={styles.containerBoton}>
                <TouchableOpacity onPress={() => {setCambiarAvatar(!cambiarAvatar), Cancelar()}} style={[styles.boton, {backgroundColor:theme.bground.bgBlanco,}]}>
                    <Text style={[styles.textoBoton, {color:theme.colors.textNegro,}]}>Cambiar avatar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.boton, {backgroundColor:theme.bground.bgBlanco,}]}>
                    <Text style={[styles.textoBoton, {color:theme.colors.textNegro,}]}>Cambiar tema</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setCambiarContraseña(!cambiarContraseña), setCambiarAvatar(false)}} style={[styles.boton, {backgroundColor:theme.bground.bgBlanco,}]}>
                    <Text style={[styles.textoBoton, {color:theme.colors.textNegro,}]}>Cambiar contraseña</Text>
                </TouchableOpacity>
              </View>
      </View>

        {/* Componente cambiar Avatar */}
        {cambiarAvatar && ( 
        <ChangeAvatar 
          theme={theme}
          AvatarImages ={AvatarImages}
          avatar ={avatar}
          setAvatar ={setAvatar}
          setCambiarAvatar={setCambiarAvatar}
        />)}
        {/* componente cambiar contraseña. */}
        { cambiarContraseña && ( 
        <ChangePassword
          setPassword = {setPassword}
          setNewPassword ={setNewPassword}
          setNewPasswordConfirm={setNewPasswordConfirm}
          cambiarPassword ={cambiarPassword}
          Cancelar = {Cancelar}
          theme = {theme}
          password ={ password}
          newPassword = {newPassword}
          newPasswordConfirm = {newPasswordConfirm}
        />)}
    </View>
  )
}

export default Account

const styles = StyleSheet.create({

  contenedor:{

    width:'100%',
    height:'100%',
    padding:20,
    gap:80
  },

  contenedorDatos:{
    padding:20,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    borderRadius:10,
    alignItems:'center'
  },
  usuario:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    height:100,
  },
  puntos:{
    display:'flex',
    flexDirection:'row',
    gap:10
  },
  texto:{
    fontWeight:700,
    fontSize:16
  },
  textoBoton:{
    fontWeight:700,
    fontSize:16,
    marginLeft:20
  },
  imagen:{
    width:64,
    height:64
  },
  contenedorBotones:{
    width:'100%',
    height:300,

    padding:20,
    gap:20,
    borderRadius:10,
  },
  containerBoton:{
    height:'70%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    alignContent:'space-between',

  },
  boton:{
    width:220,
    borderRadius:10,
    height:40,
    justifyContent:'center',
  },
})