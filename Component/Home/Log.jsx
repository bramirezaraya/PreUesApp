import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import TokenContext from "../../TokenContext";
import {LOCAL_HOST} from '@env'
//importamos asyncStorage para poder guardar en el localstorage
import AsyncStorage from "@react-native-async-storage/async-storage";
import modoDark from "../../ModoDark";
import MenuContex from "../../MenuContext"
const Log = ({ navigation }) => {

  const url = `${LOCAL_HOST}:3000/login/`
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  // llamamos al usecontext para poder utilizar el token authentication y poder modificarlo al momento de iniciar sesion.
  const {setTokenAuthentication} = React.useContext(TokenContext)
  const {setAvatar} = React.useContext(MenuContex)

  const {theme} = React.useContext(modoDark)

  // funcion para logear al usuario.
  const login = () =>{

    // si todo esta digitado correctamente, se hara la peticion al Backend.
    if(email && password){

      // creamos un objecto para enviarlos al Backend.
      const usuario = {
        email: email,
        password: password,
      }
      
      // se hace la peticion al backend
      axios.post(url, usuario)
      .then( async(response) =>{
        console.log(response.data)
        // seteamos el token, id, email, nombre usuario y las moendas del usuario en el localstorage.
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('id_usuario', JSON.stringify(response.data.id));
        await AsyncStorage.setItem('email', JSON.stringify(response.data.email))
        await AsyncStorage.setItem('usuario', JSON.stringify(response.data.name[0].toUpperCase() + response.data.name.slice(1)))
        await AsyncStorage.setItem('monedas', JSON.stringify(response.data.coins) )
        await AsyncStorage.setItem('avatar', response.data.avatar)
        setAvatar(response.data.avatar)
        //guardamos el token en el header a si poder actualizar sin problema.
        //cada ves que hagamos una solicitud utilizara el header que estamos configurando.
        // asi poder identificar al usuario.
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token.access}`
        setTokenAuthentication(true);
        navigation.navigate('menuPrincipal') // si no hubo ningun problema, enviamos al usuario al menu principal.
      }
      )
      .catch((error) =>{
        console.log(error.response.data.msg)
        alert(error.response.data.msg)
      })
    }
    else{
      alert('Complete todos los campos')
    }
  }



  return (
    <View style={[styles.container, {backgroundColor: theme.bground.bgPrimary,}]}>
      <View>
        <Image style={styles.logo} source={require("../../assets/Logo.png")} />
      </View>

      <View style={styles.container2}>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>
          Bienvenido de nuevo!
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: theme.colors.textbottom,
          }}
        >
          Preparate para practicar!
        </Text>
      </View>
      
      {/* text Input para ingresar el email del usuario */}
      <View style={styles.buttons}>
        <View style={styles.textInputContenedor}>
          <Image source={require('../../assets/email.png')} style={styles.icono} />
            <TextInput
            paddingLeft={30}
            placeholder="Ingresa tu email"
            style={[
              styles.button,
              { backgroundColor: theme.bground.bgSecondary },
            ]}
            onChangeText={(value) => {
              setEmail(value)
            }}

          ></TextInput>
        </View>
        
        {/* text Input para ingresar la contraseña del usuario */}
        <View style={styles.textInputContenedor}>
          <Image source={require('../../assets/password.png')} style={styles.icono} />
            <TextInput
            secureTextEntry={true}
            paddingLeft={30}
            placeholder="Ingresa tu contraseña"
            style={[
              styles.button,
              { backgroundColor: theme.bground.bgSecondary },
            ]}
            onChangeText={(value) => {
              setPassword(value)
            }}
          ></TextInput>
        </View>
        
        {/*Boton en caso que el usuario no recuerde su contraseña */}
        <TouchableOpacity onPress={() => navigation.navigate("RecoverPassword")}>
          <Text style={{ textAlign: "right", color:'#13A7EC' }}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        
        {/*Boton para logear al usuario, y usar la funcion de login.*/}
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.bground.bgInputsPrimary },
          ]}
          onPress={login}
        >
          <Text style={[styles.text, { color: theme.colors.textPrimary }]}>
            Iniciar Sesión
          </Text>
        </TouchableOpacity>
      </View>
      {/* Boton en caso que el usuario no tenga un cuenta, y asi dirigirlo al menu de registro. */}
      <View>
        <TouchableOpacity
          style={{ padding: 20, flexDirection: "row" }}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={[styles.text, { color: theme.colors.textSecondary }]}>
            No tienes una cuenta?{" "}
          </Text>
          <Text style={[styles.text, { color: theme.colors.textbottom }]}>
            Registrate
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Log;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "99%",
  },
  container2: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 160,
  },
  buttons: {
    flexDirection: "column",
    width: "80%",
    alignItems:'center',
  },
  button: {
    width: 309,
    height: 45,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
  },
  textInputContenedor:{
    position:'relative',
    display:'flex',
    flexDirection:'row',
  },

  icono:{
    width:20, 
    height:20, 
    position:'absolute',
    top:33, 
    zIndex:2, 
    marginLeft:5
  },
});
