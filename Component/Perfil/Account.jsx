import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import theme from '../../theme/theme'
import { TextInput } from 'react-native-gesture-handler'
import validator from 'validator'
import modoDark from '../../ModoDark'
const Account = () => {

  const {theme} = useContext(modoDark)

  const [usuario, setUsuario] = useState()
  const [email, setEmail] = useState()
  const [cambiarContraseña, setCambiarContraseña] = useState(false)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
  const [validadorPassword, setValidadorPassword] = useState(false)

  const validarPassword = () =>{
    if(newPassword !== '' && newPasswordConfirm !== ''){

      if(validator.equals(newPassword, newPasswordConfirm) && newPassword.length >= 4){
        return true
      }
    }
    return false
  }

  const cambiarPassword = async() =>{

      if(password!== ''){
          if(validarPassword() ){
              try{
                const token = await AsyncStorage.getItem('token')
                axios.patch('http://192.168.1.96:3000/changePassword',{
                  oldPassword:password,
                  newPassword:newPassword
                },{headers:{
                  Authorization:`Bearer ${token}`
                }}
                ).then((response) => {
                  if(response.data.success === 1){
                    // seteamos todo por defecto.
                    alert('Su contraseña ha sido cambiada con exito!')
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

  useEffect(() =>{


    llamarDatos = async() =>{
      const mail = await AsyncStorage.getItem('email')
      const user = await AsyncStorage.getItem('usuario')

      setEmail(JSON.parse(mail))
      setUsuario(JSON.parse(user))
    }

    llamarDatos()

  },[])


  return (
    <View style={[styles.contenedor, {backgroundColor:theme.bground.bgPrimary,}]}>

      <View style={[styles.contenedorDatos, {backgroundColor: theme.bground.bgPerfil,}]}>
            <View style={styles.usuario}>
                  <Text style={[styles.texto , {color:theme.colors.textBlanco,}]}>{usuario}</Text>
                  <Text style={[styles.texto , {color:theme.colors.textBlanco,}]}>{email}</Text>
                  <View style={styles.puntos}>
                      <Text style={[styles.texto , {color:theme.colors.textBlanco,}]}>Tus puntos son : 5000</Text>
                      <Image source={require('../../assets/dollar.png')} />
                  </View>
            </View>
            <View style={styles.perfil}>
                  <Image style={styles.imagen} source={require('../../assets/imagenPerfil.png')} />
            </View> 
      </View>

      <View style={[styles.contenedorBotones, {backgroundColor:theme.bground.bgPerfil,}]}>
              <Text style={[styles.texto , {color:theme.colors.textBlanco,}]}>Configuraciones</Text>
              <View style={styles.containerBoton}>
                <TouchableOpacity style={[styles.boton, {backgroundColor:theme.bground.bgBlanco,}]}>
                    <Text style={[styles.textoBoton, {color:theme.colors.textNegro,}]}>Cambiar avatar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.boton, {backgroundColor:theme.bground.bgBlanco,}]}>
                    <Text style={[styles.textoBoton, {color:theme.colors.textNegro,}]}>Cambiar tema</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCambiarContraseña(!cambiarContraseña)} style={[styles.boton, {backgroundColor:theme.bground.bgBlanco,}]}>
                    <Text style={[styles.textoBoton, {color:theme.colors.textNegro,}]}>Cambiar contraseña</Text>
                </TouchableOpacity>
              </View>
      </View>

      { cambiarContraseña && (
                <View style={[styles.contenedorCambiarPassword, {backgroundColor:theme.bground.bgChange,}]}>
                    <Text style={[styles.textoBoton, {textAlign:'center', color:theme.colors.textNegro,}]}>Cambiar Contraseña</Text>
                    
                    <View style={styles.contenedorInput}>
                        <View style={styles.botonesInput}>
                          <Image style={styles.icono} source={require('../../assets/password.png')} />
                          <TextInput 
                            onChangeText={(value) => setPassword(value)}
                            style={[styles.input, {backgroundColor:theme.bground.bgInputChangePassword,}]}
                            placeholder='Ingresa tu contraseña actual'
                            value={password}
                          />        
                        </View>
                        <View style={styles.botonesInput}>
                          <Image style={styles.icono} source={require('../../assets/password.png')} />
                          <TextInput 
                            onChangeText={(value) => setNewPassword(value)}
                            style={[styles.input, {backgroundColor:theme.bground.bgInputChangePassword,}]}
                            placeholder='Ingresa tu nueva contraseña'
                            value={newPassword}
                          />        
                        </View>
                        <View style={styles.botonesInput}>
                          <Image style={styles.icono} source={require('../../assets/password.png')} />
                          <TextInput 
                            onChangeText={(value) => setNewPasswordConfirm(value)}
                            style={[styles.input, {backgroundColor:theme.bground.bgInputChangePassword,}]}
                            placeholder='Confirma tu nueva contraseña'
                            value={newPasswordConfirm}
                          />        
                        </View>
                    </View>

                    <View style={styles.botonCambiarPassword}>
                      <TouchableOpacity style={[styles.botonPassword, {backgroundColor:theme.bground.bgBotonCrearEnsayo,}]} onPress={() => setCambiarContraseña(false)} >
                        <Text>Salir</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.botonPassword, {backgroundColor:theme.bground.bgBotonCrearEnsayo,}]} onPress={() => cambiarPassword()} >
                        <Text>Cambiar contraseña</Text>
                      </TouchableOpacity>
                    </View>
                    
                </View>
              )}


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
  contenedorCambiarPassword:{
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
  contenedorInput:{
    width:'100%',
    display:'flex',
    flexDirection:'column',
    gap:15,
  },
  botonCambiarPassword:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%'
  },
  botonPassword:{
    padding:8,
    borderRadius:15
  },
  input:{
    width:'90%',
    borderRadius:10,
    paddingLeft:30,
    height:35
  },
  botonesInput:{
    display:'flex',
    flexDirection:'row',
    position:'relative'
  }, 
  icono:{
    width:20,
    height:20,
    position:'absolute',
    top:7,
    left:5,
    zIndex:2,
  },
})