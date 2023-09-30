import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import BotonesDrawer from './BotonesDrawer'
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import tokenContext from './TokenContext'
import { JumpingTransition } from 'react-native-reanimated'
import axios from 'axios'
// import theme from './theme/theme'
import { LinearGradient } from 'react-native-svg'
import modoDark from './ModoDark'

 const StyleDrawer = ({navigation, state}) => {

    // para compartir datos entre componentes.. debo separarlo a otro componente para que quede mas claro.
    const {setTokenAuthentication} = React.useContext(tokenContext);
    const {theme} = useContext(modoDark)
    const {setDarkMode, darkMode} = React.useContext(modoDark)
    
    const logOut = async() =>{
        try{
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('id')
             setTokenAuthentication(false)
             setDarkMode(false)
        } catch(error) {
             console.log(error)
        }
    }
    // const email = await AsyncStorage.getItem('email')
    // console.log(email)
    // var usuario

    const [usuario, setUsuario] = useState('')
    const [email, setEmail] = useState('')

    useEffect( () =>{
        
        const pedidoDatosUsuarios = async() =>{
            try{
                const usuario = await AsyncStorage.getItem('usuario')
                const email = await AsyncStorage.getItem('email')
                if(email !== null){
                    const emailobject = JSON.parse(email)
                     setEmail(emailobject)
                }
                if(usuario !== null){
                    const usuarioObject = JSON.parse(usuario)
                     setUsuario(usuarioObject)
                }
               
                // setUsuario(usuario)
            }  catch(error){
                console.log(error)
            }   
        }
        pedidoDatosUsuarios()
    },[])

    return (
      <DrawerContentScrollView contentContainerStyle={[styles.contenedor, {backgroundColor:theme.bground.bgPrimary}]}>
        <View style={[styles.usuario, {backgroundColor:theme.bground.bgDrawerUser,}]}>
            <Image source={require('./assets/imagenPerfil.png')} />
            <Text style={[styles.text, {color:theme.colors.textBlanco}]}>{email}</Text>
        </View>

        <View style={[styles.Contenedorbotones, {backgroundColor:theme.bground.bgPrimary}]}>
            <BotonesDrawer 
                Text="Perfil"
                onPress = {() => navigation.navigate('Perfil')}
                Imagen={require('./assets/Usuario.png')}
                estado = {state.index === 4}   
            />
            <BotonesDrawer 
                Text = 'Ensayos'
                onPress = {() => navigation.navigate('Menu')}
                Imagen={require('./assets/Ensayo.png')}
                estado = {state.index === 0}
            />
            <BotonesDrawer 
                Text = 'Crear Ensayo'
                onPress = {() => navigation.navigate('Crear Ensayo')}
                Imagen={require('./assets/crearEnsayo.png')}
                estado = {state.index === 1}
            />
            <BotonesDrawer 
                Text = 'Historial'
                onPress = {() => navigation.navigate('Historial')}
                Imagen={require('./assets/Historial.png')}
                estado = {state.index === 2}
            />
            <BotonesDrawer 
                Text = 'Estadisticas'
                onPress = {() => navigation.navigate('Estadistica')}
                Imagen={require('./assets/Estadisticas.png')}
                estado = {state.index === 3}
            />
        </View>
        

        <View style={styles.Change}>
            <View>
                <TouchableOpacity style={styles.menuInterno} onPress={() => {setDarkMode(!darkMode)}} >
                    
                    {darkMode ? (
                        <View  style={{display:'flex', flexDirection:'row', gap:20}}>
                            <Image style={styles.iconos}  source={require('./assets/sol.png')} />
                            <Text  style={[styles.text, {color:theme.colors.textSecondary}]}>Modo Dia</Text>
                        </View>
                        
                    ) : (   <View style={{display:'flex', flexDirection:'row', gap:10}}>
                                <Image style={styles.iconos}  source={require('./assets/moon.png')} />
                                <Text  style={[styles.text, {color:theme.colors.textSecondary}]}>Modo oscuro</Text>
                            </View>
                            
                        )}
                    
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.menuInterno} onPress={logOut} >
                    <Image  style={styles.iconos}  source={require('./assets/log-out.png')}/>
                    <Text style={[styles.text, {color:theme.colors.textSecondary}]}>Cerrar Sesión</Text>                
                </TouchableOpacity>
            </View>
        </View>

      </DrawerContentScrollView>
    )
  }
export default StyleDrawer

const styles = StyleSheet.create({

    contenedor:{
        // margin:15,
        height:'100%',
        position:'relative',
        
    },
    usuario:{
        marginBottom:30,
        display:'flex',
        flexDirection:'column',
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        gap:30,
        position:'absolute',
        top:0,
        width:'100%',
        height:150,
        // borderBottomLeftRadius:30,
        // borderBottomRightRadius:30
    },
    menuInterno:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        gap:20,
        textAlign:'center'
    },
    iconos:{
        width:30,
        height:30,
    },
    text:{
        fontSize:16,
        fontWeight:700,
        textAlign:'center',
        marginTop:5,
        // fontFamily:theme.texto.fontFamily
    },
    Change:{
        display:'flex',
        flexDirection:'column',
        position:'absolute',
        bottom:50,
        gap:30,
        margin:15,
    },
    Contenedorbotones:{
        margin:15,
        position:'absolute',
        top:'22%'

    }

})