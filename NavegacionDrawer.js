import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
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
import { useNavigationState, useRoute, useNavigation } from '@react-navigation/native';
import Account from './Component/Perfil/Account';
import modoDark from './ModoDark';
const Stack = createStackNavigator()

const Drawer = createDrawerNavigator();

// stack de componentes que necesita el componente menu, para asi poder navegar.
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
            options={ ({ navigation }) => ({
               headerTitle:'Ensayo',
            headerShown:false,
            headerShadowVisible:false,
            headerLeft: () =>(
              <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                  <Image style={{marginLeft:10, width:20, height:20}} source={require('./assets/Leftarrow.png')} />
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

  const {theme, darkMode} = useContext(modoDark)
  return (
    <Drawer.Navigator
                // editaremos el estilo del drawer utilizando otro componente.
                drawerContent={(props) => <StyleDrawer {...props}/> }  
                >
                    <Drawer.Screen
                      name="MenuLogin"
                      component={MenuLogin}    
                      options={ ({ navigation}) => ({
                         headerTitle:'PreUesApp',
                        headerTintColor:theme.colors.textSecondary, /// color del menu hamburguesa y titulo.
                        headerTitleAlign:'center',
                        headerShadowVisible:false,
                        // headerShown:false,
                        headerStyle: { backgroundColor: theme.bground.bgPrimary },
                        headerLeft: () =>(
                          <TouchableOpacity onPress={() => navigation.openDrawer()}>
                              <Image style={{marginLeft:10, width:30, height:30}} 
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
                        headerTintColor:theme.colors.textSecondary, /// color del menu hamburguesa y titulo.
                        headerTitleAlign:'center',
                        headerShadowVisible:false,
                        headerStyle: { backgroundColor: theme.bground.bgPrimary },
                        headerLeft: () =>(
                          <TouchableOpacity onPress={() => navigation.openDrawer()}>
                              <Image style={{marginLeft:10, width:30, height:30}} 
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
                        headerTintColor:theme.colors.textSecondary, /// color del menu hamburguesa y titulo.
                        headerTitleAlign:'center',
                        headerShadowVisible:false,
                        headerStyle: { backgroundColor: theme.bground.bgPrimary },
                        headerLeft: () =>(
                          <TouchableOpacity onPress={() => navigation.openDrawer()}>
                              <Image style={{marginLeft:10, width:30, height:30}} 
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
                        headerTintColor:theme.colors.textSecondary, /// color del menu hamburguesa y titulo.
                        headerTitleAlign:'center',
                        headerShadowVisible:false,
                        headerStyle: { backgroundColor: theme.bground.bgPrimary }, // estilos
                        headerLeft: () =>(
                          <TouchableOpacity onPress={() => navigation.openDrawer()}>
                              <Image style={{marginLeft:10, width:30, height:30}}
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
                        headerTintColor:theme.colors.textSecondary, /// color del menu hamburguesa y titulo.
                        headerTitleAlign:'center',
                        headerShadowVisible:false,
                        headerStyle: { backgroundColor: theme.bground.bgPrimary }, // estilos
                        headerLeft: () =>(
                          <TouchableOpacity onPress={() => navigation.openDrawer()}>
                              <Image style={{marginLeft:10, width:30, height:30}}  source={darkMode ? require('./assets/menuDark.png') : require('./assets/menu.png')} />
                          </TouchableOpacity>
                        )
                      })}
                    />
                </Drawer.Navigator>    
  )
}

export default NavegacionDrawer

const styles = StyleSheet.create({})