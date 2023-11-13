import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'






const ChangePassword = ({Cancelar,setPassword,setNewPassword, setNewPasswordConfirm,cambiarPassword, theme, password, newPassword, newPasswordConfirm}) => {
  return (
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
                            secureTextEntry={true}
                            maxLength={16}
                          />        
                        </View>
                        <View style={styles.botonesInput}>
                          <Image style={styles.icono} source={require('../../assets/password.png')} />
                          <TextInput 
                            onChangeText={(value) => setNewPassword(value)}
                            style={[styles.input, {backgroundColor:theme.bground.bgInputChangePassword,}]}
                            placeholder='Ingresa tu nueva contraseña'
                            value={newPassword}
                            secureTextEntry={true}
                            maxLength={16}
                          />        
                        </View>
                        <View style={styles.botonesInput}>
                          <Image style={styles.icono} source={require('../../assets/password.png')} />
                          <TextInput 
                            onChangeText={(value) => setNewPasswordConfirm(value)}
                            style={[styles.input, {backgroundColor:theme.bground.bgInputChangePassword,}]}
                            placeholder='Confirma tu nueva contraseña'
                            value={newPasswordConfirm}
                            secureTextEntry={true}
                            maxLength={16}
                          />        
                        </View>
                    </View>

                    <View style={styles.botonCambiarPassword}>
                      <TouchableOpacity style={[styles.botonPassword, {backgroundColor:theme.bground.bgBotonCrearEnsayo,}]} onPress={() => {Cancelar()}} >
                        <Text>Salir</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.botonPassword, {backgroundColor:theme.bground.bgBotonCrearEnsayo,}]} onPress={() => cambiarPassword()} >
                        <Text>Cambiar contraseña</Text>
                      </TouchableOpacity>
                    </View>
                    
                </View>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
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
      textoBoton:{
        fontWeight:700,
        fontSize:16,
        marginLeft:20
      },
})