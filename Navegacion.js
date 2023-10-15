import { DrawerActions, NavigationContainer, useNavigation } from "@react-navigation/native"; // contenedor de navegaciones
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // para crear navegaciones en la parte del bottom.
import { createNativeStackNavigator } from "@react-navigation/native-stack"; /// para crear las navegaciones
import { View, Text, Image, TouchableOpacity } from "react-native";
//components
import Home from "./Component/Home/Home";
import Log from "./Component/Home/Log";
import Reg from "./Component/Home/Reg";
import theme from "./theme/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TokenContext from "./TokenContext";
import NavegacionTab from "./NavegacionTab";
import NavegacionDrawer from "./NavegacionDrawer";
import RecoverPassword from "./Component/Home/RecoverPassword";
import SesionInvitado from "./Component/Invitado/SesionInvitado";
import NavegacionInvitado from "./NavegacionInvitado";
import ModoDark from "./ModoDark";
// inicializamos el nativagor
const Stack = createNativeStackNavigator();
// Navigator = para saber cuales seran las navegaciones.
// screen = para saber cuales seran las pantallas de navegacion.

const Navegacion = () => {

  const [tokenAuthentication, setTokenAuthentication] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false)

  React.useEffect(() =>{

    const checkToken = async () =>{
      const token = await AsyncStorage.getItem('token');
      setTokenAuthentication(!!token)  
    };
    checkToken()
  }, [tokenAuthentication]);

  React.useEffect(() =>{
 
  },[darkMode])

// const navegacionDrawer2 = useNavigation()
// const abrirDrawer = () =>{
//   navegacionDrawer2.dispatch(DrawerActions.openDrawer()) // para abrir el drawer desde otra screen.
// }


  return (

    // si tenemos el token entonces mostramos el menu principal.
    <TokenContext.Provider value={{tokenAuthentication, setTokenAuthentication}}>
      <ModoDark.Provider value={{darkMode, setDarkMode, theme: darkMode ? theme.dark : theme.ligth}}>

          {tokenAuthentication ? (  
              <>
                {/* <Stack.Navigator>
                    <Stack.Screen 
                        name='menuPrincipal'
                        component={NavegacionTab}
                        options={{headerTitle:'' , headerShown:false}}
                    />
                </Stack.Navigator> */}

                <Stack.Navigator>
                  <Stack.Screen 
                    name="menuPrincipal"
                    component={NavegacionDrawer}
                    options={{headerTitle:'' , headerShown:false,
                    // headerLeft:(() => { 
                    //   return (
                    //     <TouchableOpacity onPress={abrirDrawer}>
                    //           <Text>Boton</Text>
                    //     </TouchableOpacity>
                    //   )
                      
                    // })
                  }}
                    
                  />
                </Stack.Navigator>
              </>
              
                  
              ) : 
              // si no tenemos el token, mostramos el home, login y register.
              (
                <> 
                  <Stack.Navigator>
                      <Stack.Screen // screen la pantalla que queremos mostrar, name = nombre para llamarlo, component = ponemos el componente que queremos visualizar. options para editar estilos.
                        name="Home"
                        component={Home} // se envia como props para poder navegar.
                        options={{
                          // opciones de estilos para el apartado de navegacion.
                          headerTitle: "", // que no tenga titulo.
                          headerStyle: { backgroundColor: darkMode ? theme.dark.bground.bgPrimary : theme.ligth.bground.bgPrimary }, // estilos
                          headerShadowVisible: false,
                        }} // que no tenga sombra
                      />
                      <Stack.Screen
                          name="Log"
                          component={Log}
                          options={ ({ navigation }) => ({
                            headerTitle: "",
                            headerStyle: { backgroundColor: darkMode ? theme.dark.bground.bgPrimary : theme.ligth.bground.bgPrimary },
                            headerShadowVisible: false,
                            headerLeft: () =>(
                              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                  <Image style={{marginLeft:10, width:30, height:30}} source={require('./assets/Leftarrow.png')} />
                              </TouchableOpacity>
                            )
                          })}
                      />
                      <Stack.Screen
                          name="Register"
                          component={Reg}
                          options={({ navigation }) => ({
                            headerTitle: "",
                          headerStyle: { backgroundColor: darkMode ? theme.dark.bground.bgPrimary : theme.ligth.bground.bgPrimary },
                          headerShadowVisible: false,
                          headerLeft: () =>(
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <Image style={{marginLeft:10 , width:30, height:30}} source={require('./assets/Leftarrow.png')} />
                            </TouchableOpacity>
                          )
                          })}
                      />  
                      <Stack.Screen
                          name="RecoverPassword"
                          component={RecoverPassword}
                          options={({ navigation }) => ({
                          headerTitle: "",
                          headerStyle: { backgroundColor: darkMode ? theme.dark.bground.bgPrimary : theme.ligth.bground.bgPrimary },
                          headerShadowVisible: false,
                          headerLeft: () =>(
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <Image style={{marginLeft:10 , width:30, height:30}} source={require('./assets/Leftarrow.png')} />
                            </TouchableOpacity>
                          )
                        })}
                      />
                      <Stack.Screen
                          name="SesionInvitado"
                          component={NavegacionInvitado}
                          options={{
                          headerTitle: "",
                          headerStyle: { backgroundColor: darkMode ? theme.dark.bground.bgPrimary : theme.ligth.bground.bgPrimary },
                          headerShadowVisible: false,
                          headerShown:false
                        }}  
                      />                                                              
                  </Stack.Navigator>
                </>
              )   
          }
      </ModoDark.Provider>       
    </TokenContext.Provider>
   
  );
};

export default Navegacion;
