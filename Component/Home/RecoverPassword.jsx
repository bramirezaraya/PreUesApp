import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
// import theme from '../../theme/theme'
import axios from 'axios'
import modoDark from '../../ModoDark'
import {LOCAL_HOST} from '@env'
const RecoverPassword = ({navigation}) => {

    const [email, setEmail] = useState('')

    const {theme} = useContext(modoDark)
    
    // Funcion para recuperar contraseña.
    const EnviarPassword = () =>{
        // se consulta al end-point con el email ingresado por el usuario.
        axios.post(`${LOCAL_HOST}:3000/recoverPasswor`, {
            email:email
        })
        .then((response)=> {
            // EN CASO QUE TODO ESTE BIEN, LE LLEGARA UN EMAIL AL USUARIO CON SU NUEVA CONTRASEÑA.
            alert('Se ha enviado la nueva contraseña a su correo, por favor, verifique.')
            setEmail("")
        })
        .catch((error) => {
            console.log(error)
            alert('Por favor, escriba un correo que este registrado con nosotros.')
        })
    }

  return (
    <View style={[styles.contenedor, {backgroundColor:theme.bground.bgPrimary}]}>
        <View >
            <Image style={styles.imagen} source={require("../../assets/Logo.png")} />
        </View>

        <View style={{padding:50}}> 
            <Text style={styles.texto}>Ingrese su email para recibir una nueva contraseña.</Text>
        </View>

        {/* TextInput donde se ingresara el email */}
        <View style={styles.buttons}>
            <View style={styles.textInputContenedor}>
                <Image source={require('../../assets/email.png')} style={styles.icono} />
                <TextInput
                    paddingLeft={30}
                    placeholder="Ingresa tu email"
                    value={email}
                    style={[
                        styles.button,
                        { backgroundColor: theme.bground.bgSecondary },
                    ]}
                    onChangeText={(value) => {
                        setEmail(value)
                    }}
                ></TextInput>
            </View>
        </View>
            {/* boton para recuperar contraseña. */}
            <TouchableOpacity
                style={[
                    styles.button,
                    { backgroundColor: theme.bground.bgInputsPrimary },
                ]}
                onPress={()=> EnviarPassword()}

            >
                <Text style={[styles.texto, { color: theme.colors.textPrimary }]}>
                    Enviar Correo
                </Text>
            </TouchableOpacity>

        {/* Botones para devolverse al apartado de logeo o registro de sesión */}
        <View style={{gap:10, margin:20}}>
            <TouchableOpacity style={styles.opciones} onPress={() => navigation.navigate("Log")}>
                <Text style={styles.texto}>¿Ya tienes una cuenta? </Text>
                <Text style={[styles.texto, {color:theme.colors.textbottom}]}> Iniciar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.opciones} onPress={() => navigation.navigate("Register")}>
                <Text style={styles.texto}>¿No tienes una cuenta? </Text>
                <Text style={[styles.texto, {color:theme.colors.textbottom}]}> Registrate</Text>
            </TouchableOpacity>
        </View>
            

    </View>
  )
}

export default RecoverPassword

const styles = StyleSheet.create({

    contenedor:{
        display:'flex',
        flexDirection:'column',
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'space-between',
    },
    imagen:{
        width:300,
        height:160,
    },
    texto:{
        fontWeight:700,
        fontSize:16,
    },
    buttons: {
        flexDirection: "column",
        width: "100%",
        alignItems:'center'
      },
    button: {
        width: 309,
        height: 45,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
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
    opciones:{
        display:'flex',
        flexDirection:'row'
    }
})