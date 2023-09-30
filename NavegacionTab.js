import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import theme from './theme/theme';
import { View, Text, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

tab = createBottomTabNavigator();

import Menu from "./Component/Ensayos/Menu";
import CreateEssay from './Component/CrearEnsayo/CreateEssay';
import Historial from './Component/Historial/Historial';
import Estadisticas from './Component/Estadisticas/Estadisticas';
import EnsayoPrueba from './Component/Ensayos/EnsayoPrueba';
import EnsayoFeedback from './Component/Ensayos/EnsayoFeedback';

Stack = createStackNavigator()

const MenuLogin = () =>{
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
            options={{
            headerTitle:'Ensayo',
            headerShown:true,
            headerShadowVisible:false,
            }} 
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

function NavegacionTab() {
  return (
    //bottom navigator
    <tab.Navigator 
                screenOptions={{
                  tabBarStyle:{
                      backgroundColor:theme.bground.bgheaderBottom,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius:10,
                    },
                  headerShown:false,// esto quita el header.
                  }
                }       
                >
                    <tab.Screen
                      name="MenuLogin"
                      component={MenuLogin}
                      options={{
                        headerTitle:'',
                        headerShadowVisible:false,
                        headerStyle: { backgroundColor: 'transparent' }, // estilos
                        tabBarLabel: () => null,
                        tabBarIcon:({focused}) => 
                        { return (
                          <View>
                            <Image source={require("./assets/Ensayo.png")} resizeMode="contain" style={{width:25, height:25}} />
                            <Text style = {{color: focused? 'black' : 'white', fontSize:12, fontWeight:600,}}>Menu</Text>
                          </View>       
                          )
                        } 
                      }}
                      
                    />
                    <tab.Screen
                      name="Crear Ensayo"
                      component={CreateEssay}
                      options={{
                        headerTitle:'',
                        headerShadowVisible:false,
                        headerStyle: { backgroundColor: theme.bground.bgPrimary }, //estilos
                        tabBarLabel: () => null, // quitamos el name para que no se vea.
                        tabBarIcon:({focused}) => 
                        { return (
                          <View>
                            <Image source={require("./assets/crearEnsayo.png")} resizeMode="contain" style={{width:25, height:25,}} />
                            <Text style = {{color: focused? 'black' : 'white', fontSize:12, fontWeight:600,}}>CrearEnsayo</Text>
                          </View>       
                          )
                        }
                      }}  
                    />
                    <tab.Screen
                      name="Historial"
                      component={Historial}
                      options={{
                        headerTitle:'',
                        headerShadowVisible:false,
                        headerStyle: { backgroundColor: theme.bground.bgPrimary }, // estilos
                        tabBarLabel: () => null,
                        tabBarIcon:({focused}) => 
                        { return (
                          <View>
                            <Image source={require("./assets/Historial.png")} resizeMode="contain" style={{width:25, height:25,}} />
                            <Text style = {{color: focused? 'black' : 'white', fontSize:12, fontWeight:600,}}>Historial</Text>
                          </View>       
                          )
                        }
                      }}
                    />
                    <tab.Screen
                      name="Estadistica"
                      component={Estadisticas}
                      options={{
                        headerTitle:'',
                        headerShadowVisible:false,
                        headerStyle: { backgroundColor: theme.bground.bgPrimary }, // estilos
                        tabBarLabel: () => null,
                        tabBarIcon:({focused}) => 
                        { return (
                          <View>
                            <Image source={require("./assets/Estadisticas.png")} resizeMode="contain" style={{width:25, height:25,}} />
                            <Text style = {{color: focused? 'black' : 'white', fontSize:12, fontWeight:600,}}>Estadistica</Text>
                          </View>       
                          )
                        }
                      }}
                    />
                </tab.Navigator>     
  )
}

export default NavegacionTab