import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack';

import Menu from "./Component/Ensayos/Menu";
import CreateEssay from './Component/CrearEnsayo/CreateEssay';
import Historial from './Component/Historial/Historial';
import Estadisticas from './Component/Estadisticas/Estadisticas';
import EnsayoPrueba from './Component/Ensayos/EnsayoPrueba';
import EnsayoFeedback from './Component/Ensayos/EnsayoFeedback';
// import theme from './theme/theme';
import StyleDrawer from './StyleDrawer';
import { useNavigationState, useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import Account from './Component/Perfil/Account';
import modoDark from './ModoDark';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuContext from './MenuContext'
import axios from 'axios';
import { Alert } from 'react-native';
const Stack = createStackNavigator()

const Drawer = createDrawerNavigator();

// stack de componentes que necesita el componente menu, para asi poder navegar.
const MenuLogin = () =>{
  /// uses context para ir modificando el header del drawer, y eliminar un ensayo al ser iniciado.
  const {menuEnsayo, setMenuEnsayo, idEssay} = React.useContext(MenuContext)
  const {theme, darkMode} = useContext(modoDark)

  const EliminarEnsayo = (navigation, token) =>{
    axios.delete(`http://192.168.1.96:3000/logicalDelEssay?essayId=${idEssay}&started=${1}`, {headers:{
      Authorization: `Bearer ${token}`
    }})
    setMenuEnsayo(true)
    navigation.navigate('Menu')
  }

  /// para navegar al comienzo y eliminar un ensayo ya iniciado.
  const navegacion = async(navigation) =>{
    const token = await AsyncStorage.getItem('token')

    Alert.alert(
      "¿Seguro que deseas retroceder al menu?",
      "Se perdera todo el progreso realizado",
      [
        {
          text:'Cancelar',
          onPress:() =>{},
          style:'cancel'
        },
        {
          text:'Retroceder',
          style:'cancel',
          onPress:() =>{EliminarEnsayo(navigation, token)}
        }
      ]
    )
  }

    return (
      <Stack.Navigator>
        <Stack.Screen 
            name="Menu"
            component={Menu}         
            options={{
            headerTitle:'',
            headerShown:false,
            headerShadowVisible:false,
            
            }} 
        />
          <Stack.Screen 
            name="EnsayoPrueba"
            component={EnsayoPrueba}
            options={ ({ navigation }) => ({
              headerTitle:'Ensayo',
              headerShown:true,
              headerShadowVisible:false,
              headerStyle: {backgroundColor:theme.bground.bgPrimary},
              headerTintColor:theme.colors.textSecondary, /// color del menu hamburguesa y titulo.
              headerLeft: () =>(
                <TouchableOpacity onPress={() => navegacion(navigation)}>
                    <Image style={{marginLeft:10, width:25, height:25}} source={ darkMode ? require('./assets/ArrowDark.png')  : require('./assets/Leftarrow.png')} />
                </TouchableOpacity>
              ),
              drawerLabel:null
            })} 
        />
        <Stack.Screen 
            name="EnsayoFeedback"
            component={EnsayoFeedback}
            options={{
            headerTitle:'Resultados',
            headerShown:false,
            headerShadowVisible:false,
            }} 
        />  
      </Stack.Navigator>
    )
  }

  

  ///contenedores del drawer.
const NavegacionDrawer = () => {

  /// uses context para ir modificando el header del drawer.
  const {menuEnsayo, setMenuEnsayo} = React.useContext(MenuContext)

  const {theme, darkMode} = useContext(modoDark)
  return (
    <Drawer.Navigator
                // editaremos el estilo del drawer utilizando otro componente.
                drawerContent={(props) => <StyleDrawer {...props}/> }  
                >
                    <Drawer.Screen
                      name="MenuLogin"
                      component={MenuLogin}
                        
                      options={ ({ navigation, route}) => ({
                        headerTitle:'PreUesApp',
                        headerTintColor:theme.colors.textSecondary, /// color del menu hamburguesa y titulo.
                        headerTitleAlign:'center',
                        headerShadowVisible:false,
                        headerTitleStyle:{
                          fontSize:23
                        },       
                        headerShown:menuEnsayo,
                        headerStyle: { backgroundColor: theme.bground.bgPrimary},
                        headerLeft: () =>(
                          <TouchableOpacity onPress={() => navigation.openDrawer()}>
                              <Image style={{marginLeft:15, width:30, height:30}} 
                              source={darkMode ? require('./assets/menuDark.png') : require('./assets/menu.png')}
                              />
                          </TouchableOpacity>
                        ),
                        drawerLabel:'Menu',
                        drawerActiveTintColor:'Menu'
                      })} // estilos                    
                    />
                    <Drawer.Screen
                      name="Crear Ensayo"
                      component={CreateEssay}
                      options={({navigation}) => ({
                        headerTitle:'PreUesApp',
                        headerTitleStyle:{
                          fontSize:23
                        }, 
                        headerTintColor:theme.colors.textSecondary, /// color del menu hamburguesa y titulo.
                        headerTitleAlign:'center',
                        headerShadowVisible:false,
                        headerStyle: { backgroundColor: theme.bground.bgPrimary },
                        headerLeft: () =>(
                          <TouchableOpacity onPress={() => navigation.openDrawer()}>
                              <Image style={{marginLeft:15, width:30, height:30}} 
                             source={darkMode ? require('./assets/menuDark.png') : require('./assets/menu.png')}  />
                          </TouchableOpacity>
                        )
                      })} // estilos   
                    />
                    <Drawer.Screen
                      name="Historial"
                      component={Historial}
                      options={({ navigation}) => ({
                        headerTitle:'PreUesApp',
                        headerTitleStyle:{
                          fontSize:23
                        }, 
                        headerTintColor:theme.colors.textSecondary, /// color del menu hamburguesa y titulo.
                        headerTitleAlign:'center',
                        headerShadowVisible:false,
                        headerStyle: { backgroundColor: theme.bground.bgPrimary },
                        headerLeft: () =>(
                          <TouchableOpacity onPress={() => navigation.openDrawer()}>
                              <Image style={{marginLeft:15, width:30, height:30}} 
                              source={darkMode ? require('./assets/menuDark.png') : require('./assets/menu.png')}  />
                          </TouchableOpacity>
                        )
                      })}// estilos   
                    />
                    <Drawer.Screen
                      name="Estadistica"
                      component={Estadisticas}
                      options={({ navigation }) => ({
                        headerTitle:'PreUesApp',
                        headerTitleStyle:{
                          fontSize:23
                        }, 
                        headerTintColor:theme.colors.textSecondary, /// color del menu hamburguesa y titulo.
                        headerTitleAlign:'center',
                        headerShadowVisible:false,
                        headerStyle: { backgroundColor: theme.bground.bgPrimary }, // estilos
                        headerLeft: () =>(
                          <TouchableOpacity onPress={() => navigation.openDrawer()}>
                              <Image style={{marginLeft:15, width:30, height:30}}
                              source={darkMode ? require('./assets/menuDark.png') : require('./assets/menu.png')}  />
                          </TouchableOpacity>
                        )
                      })}
                    />
                    <Drawer.Screen
                      name="Perfil"
                      component={Account}
                      options={({ navigation }) => ({
                        headerTitle:'PreUesApp',
                        headerTitleStyle:{
                          fontSize:23
                        }, 
                        headerTintColor:theme.colors.textSecondary, /// color del menu hamburguesa y titulo.
                        headerTitleAlign:'center',
                        headerShadowVisible:false,
                        headerStyle: { backgroundColor: theme.bground.bgPrimary }, // estilos
                        headerLeft: () =>(
                          <TouchableOpacity onPress={() => navigation.openDrawer()}>
                              <Image style={{marginLeft:15, width:30, height:30}}  source={darkMode ? require('./assets/menuDark.png') : require('./assets/menu.png')} />
                          </TouchableOpacity>
                        )
                      })}
                    />
                </Drawer.Navigator>    
  )
}

export default NavegacionDrawer

const styles = StyleSheet.create({})