import { StyleSheet,View, SafeAreaView, FlatList, Text, Image, TouchableOpacity} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Essay from './Essay'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'
import modoDark from '../../ModoDark'
import {LOCAL_HOST} from '@env'
const Menu = ({navigation}) => {

  const {theme} = useContext(modoDark)

  const datosEnsayos = [
    {
      name:"Ensayo General",
      numberOfQuestions:40,
      selectedTime:80,
      id:5,
      isCustom:0
    },
    {
      name:"Ensayo Números",
      numberOfQuestions:10,
      selectedTime:20,
      id:1,
      isCustom:0
    },
    {
      name:"Ensayo Álgebra",
      numberOfQuestions:10,
      selectedTime:20,
      id:2,
      isCustom:0
    },
    {
      name:"Ensayo Probabilidades",
      numberOfQuestions:10,
      selectedTime:20,
      id:3,
      isCustom:0
    },
    {
      name:"ensayo Geometría",
      numberOfQuestions:10,
      selectedTime:20,
      id:4,
      isCustom:0
    },
  ]

  const [usuario,setUsuario] = useState('')
  const [datosCustom, setDatosCustom] = useState([])
  const [predefinidos, setPredefinidos] = useState(true)
  const [personalizados, setPersonalizados] = useState(false)
  const [cantidadCustom, setCantidadCustom] = useState(0)
  const [monedas, setMonedas] = useState(0)
  /// se usa para renderizar cada vez que se focusea el componente.
useFocusEffect( 
    React.useCallback(() =>{

      const getScore = async() =>{

        try{
          const token = await AsyncStorage.getItem('token')
        
        axios.get(`${LOCAL_HOST}:3000/coins/`, {headers:{
          Authorization: `Bearer ${token}`
        }})
        .then(response => {setMonedas(response.data.coins)})
        }catch(error) {
          console.log(error)
        }
      }

    
    const llamadaDatosUser = async() =>{
      const token = await AsyncStorage.getItem('token')
      const user = await AsyncStorage.getItem('usuario');
      // const monedas = await AsyncStorage.getItem('monedas')
      // setMonedas(monedas)
      setUsuario(JSON.parse(user))

      axios.get(`${LOCAL_HOST}:3000/showCustomEssays`,{ headers:{
        Authorization: `Bearer ${token}`
      }})
      .then((response) => {setDatosCustom(response.data.customEssays), setCantidadCustom(response.data.customEssays.length)})
      .catch((error) => console.log(error))
    }
    llamadaDatosUser();
    getScore()

  },[cantidadCustom])
)

  return (
    <SafeAreaView style={[styles.contenedor2, {backgroundColor:theme.bground.bgPrimary,}]}> 
            <View style={styles.contenedor}>

                  <View style={styles.userData}>
                       <Text style={[styles.textoUser, {fontWeight:100, color:theme.colors.textSecondary}]}>Hola! {usuario}</Text>
                       <Text style={[styles.textoUser, {fontWeight:'bold', color:theme.colors.textInicio}]}>Acumula monedas al realizar Ensayos!</Text>
                       <View style={[styles.UserMoney, {backgroundColor:theme.colors.textInicio}]}>
                            <Image style={{width:25,height:25}} source={require("../../assets/dollar.png")} />
                            <Text style={[styles.textoUser, {fontWeight:'bold', color:theme.colors.textMoney}]}>{monedas}</Text>
                       </View>
                  </View>
                  

                  <View style={[styles.ensayosContenedor, {backgroundColor:theme.bground.bgEnsayosInicio}]}>
                      <View style={styles.tipoEnsayo}>
                            <TouchableOpacity style={[styles.botones, {backgroundColor: predefinidos ? theme.bground.bgInicioBotones : theme.bground.bgInicioSelected} ]} onPress={() => {setPersonalizados(false), setPredefinidos(true)}} >
                              <Text style={[styles.textoBotones, {color: predefinidos ? theme.colors.textBlanco : theme.colors.textNegro}]}>Predefinidos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.botones, {backgroundColor: personalizados ? theme.bground.bgInicioBotones : theme.bground.bgInicioSelected} ]} onPress={() => {setPersonalizados(true), setPredefinidos(false)}} >
                              <Text style={[styles.textoBotones, {color: personalizados ? theme.colors.textBlanco : theme.colors.textNegro}]}>Personalizados</Text>
                            </TouchableOpacity>
                      </View>
                      
                      { predefinidos ? 
                        
                        <FlatList 
                          data={datosEnsayos}
                          horizontal={true}                  
                          renderItem={({item, index}) => (Essay({item,index, navigation, theme})) }
                          keyExtractor={(item) => item.id}                
                        />
                        : datosCustom.length > 0 ? 
                          <FlatList 
                              data={datosCustom}
                              horizontal={true}
                              renderItem={({item, index}) => (Essay({item,index, navigation, setCantidadCustom, cantidadCustom, theme}))}
                              keyExtractor={(item) => item.id}
                          />
                        : <View style={[styles.contenedorTexto , {backgroundColor:theme.bground.bgInicio,}]}>
                              <Text style={[styles.texto, {color:theme.colors.textSecondary}]}> 
                                Primero debes crear un ensayo personalizado.
                              </Text>                                 
                         </View>
                     
                      }
                    
                  </View>
                  <View style={{alignItems:'center', width:'100%'}}>
                      <View style={[styles.crearEnsayo, {backgroundColor:theme.bground.bgInicio,}]}>
                        <Text style={[styles.texto, {width:180, color:theme.colors.textSecondary}]}>Cree sus ensayos personalizados.</Text>
                        <View style={{width:'100%', alignItems:'center'}}>
                          <TouchableOpacity style={[styles.boton, {backgroundColor:theme.bground.bgInicioBottom,}]}
                            onPress={() => navigation.navigate('Crear Ensayo')}
                          >
                            <Text style={[styles.texto, {color:theme.colors.textPrimary}]}>Crear su ensayo</Text>
                        </TouchableOpacity>
                        </View>
                        
                    </View>
                  </View>
                  
            </View>   
    </SafeAreaView>
  )
}

export default Menu

const styles = StyleSheet.create({
  contenedor2:{
    display:'flex',
    flexDirection:'column',
    flex:1,
  },

  contenedor: {
    display:'flex',
    flexDirection:'column',
    // alignItems:'center',
    justifyContent:'space-between',
    height:'100%',
  },
  datosMonedas:{
    display:'flex',
    flexDirection:'row',
    gap:5
  },
  datosUser:{
    width:300,
    height:70,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    shadowOffset:{width: 2, height:3}, // en que lado afecta
    shadowOpacity:0.2, // la opacidad
    shadowRadius:3, // el radio de la sombra
    elevation:3,
    shadowColor:'#000000', // color del shadow
    margin:20
  },
  texto:{
    fontSize:17,
    fontWeight:600,
  },
  crearEnsayo:{
    display:'flex',
    flexDirection:'column',
    width:'70%',
    height:120,
    justifyContent:'space-between',
    padding:15,
    borderRadius:10,
    margin:20,
    shadowOffset:{width: 2, height:3}, // en que lado afecta
    shadowOpacity:0.2, // la opacidad
    shadowRadius:3, // el radio de la sombra
    elevation:3,
    shadowColor:'#000000', // color del shadow
  },
  boton:{
    display:'flex',
    alignItems:'center',
    width:'70%',
    borderRadius:10,
    height:25,
    shadowOffset:{width: 2, height:3}, // en que lado afecta
    shadowOpacity:0.2, // la opacidad
    shadowRadius:3, // el radio de la sombra
    elevation:3,
    shadowColor:'#000000', // color del shadow
  },
  ensayosContenedor:{
    width:'100%',
    height:'50%',
    display:'flex',
    flexDirection:'column',
  },
  tipoEnsayo:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    gap:50,
    padding:20
  },
  botones:{
    width:'40%',
    height:40,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'
  },
  textoBotones:{
    fontSize:16,
    fontWeight:600
  },
  contenedorTexto:{
    width:'80%',
    margin:20,
    padding:20,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'
  },
  userData:{
    display:'flex',
    flexDirection:'column',
    gap:3,
    padding:20
  },
  textoUser:{
    fontSize:20,
  },
  UserMoney:{
    display:'flex',
    flexDirection:'row',
    gap:10,
    borderRadius:25,
    padding:5,
    alignItems:'center',
    width:'20%',
    paddingLeft:10,
  }

})
