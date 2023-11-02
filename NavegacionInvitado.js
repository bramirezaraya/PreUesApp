
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import SesionInvitado from "./Component/Invitado/SesionInvitado"
import EnsayoInvitado from "./Component/Invitado/EnsayoInvitado"
import FeedbackInvitado from "./Component/Invitado/FeedbackInvitado"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Text, Image } from "react-native"
const Stack = createStackNavigator()

const NavegacionInvitado = () =>{
  
    return (
      <Stack.Navigator>
        <Stack.Screen 
            name="menuInvitado"
            component={SesionInvitado}
            options={({navigation}) => ({
              headerTitle:'Sesión Invitado',
            headerTitleAlign:'center',
            headerShown:true,
            headerShadowVisible:true,
            headerLeft: () =>(
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <Image style={{marginLeft:10 , width:30, height:30}} source={require('./assets/Leftarrow.png')} />
              </TouchableOpacity>
            )
            })}
        />
          <Stack.Screen 
            name="EnsayoInvitado"
            component={EnsayoInvitado}
            options={({ navigation}) => ({
              headerTitle:'Ensayo Invitado',
            headerTitleAlign:'center',
            headerShown:true,
            headerShadowVisible:true,
            headerLeft: () =>(
              <TouchableOpacity onPress={() => navigation.navigate('menuInvitado')}>
                  <Image style={{marginLeft:10 , width:30, height:30}} source={require('./assets/Leftarrow.png')} />
              </TouchableOpacity>
            )
            })} 
        />
        <Stack.Screen 
            name="feedbackInvitado"
            component={FeedbackInvitado}
            options={({ navigation}) =>({
              headerTitle:'Resultados',
              headerTitleAlign:'center',
              headerShown:true,
              headerShadowVisible:true,
              headerLeft: () =>(
                <TouchableOpacity onPress={() => navigation.navigate('menuInvitado')}>
                    <Image style={{marginLeft:10 , width:30, height:30}} source={require('./assets/Leftarrow.png')} />
                </TouchableOpacity>
              )
            })}
        />

        {/* eliminar despues */}
      </Stack.Navigator>
      
    )
  }

export default NavegacionInvitado
