import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
// import theme from '../../theme/theme';
import EnsayoRenderizado from './EnsayoRenderizado';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import modoDark from '../../ModoDark';
import {LOCAL_HOST} from '@env'

const EnsayoFeedback = ({navigation}) => {
    
    const route = useRoute();
    const [ensayo, setEnsayo] = useState([])
    const [datosEnsayo, setDatoEnsayo] = useState()
    const [respuestas, setRespuestas] = useState([])
    const {theme} = useContext(modoDark)

    const id = route.params.id;
    const urlEnsayos = `${LOCAL_HOST}:3000/submittedEssay?id=${id}`

    useEffect(() =>{
        const llamadaEnsayo = async() =>{
            try{    
                    const token = await AsyncStorage.getItem('token')

                    const response = await axios.get(urlEnsayos, {headers:{
                        Authorization:`Bearer ${token}`
                    }});
                     
                    setEnsayo(response.data.questions) /// preguntas.
                    setDatoEnsayo(response.data) // score, preguntas y respuestas, fecha.
                    setRespuestas(response.data.chosenAnswers) /// respuestas marcadas por el usuario.
            }catch(error){
                console.log(error)
            }
        }
        llamadaEnsayo()
    },[])

    if (ensayo && ensayo.length > 0 && datosEnsayo && respuestas.length > 0) {
        // const Fecha = new Date(datosEnsayo.createdAt).toLocaleString()
        return (
        <View style={[styles.contenedorFeedback, {backgroundColor:theme.bground.bgPrimary,}]}>
            <View style={styles.contenedor}>
                <View style={[styles.datos, {backgroundColor:theme.bground.bgSecondary,}]}>
                    <Text style={[styles.titulo, {color: theme.colors.textSecondary}]} >Obtuviste: {datosEnsayo.score} puntos</Text>
                    <Text style={[styles.datosEnsayo, {color: theme.colors.textSecondary}]}>Realizado el {datosEnsayo.createdAt}</Text>
                    <Text style={[styles.datosEnsayo, {color: theme.colors.textSecondary}]}>{datosEnsayo.numberOfQuestions} Ejercicios en total</Text>
                    <Text style={[styles.datosEnsayo, {color: theme.colors.textSecondary}]}>{datosEnsayo.numCorrectAnswers} Preguntas correctas</Text>
                    <Text style={[styles.datosEnsayo, {color: theme.colors.textSecondary}]}>{datosEnsayo.coins} Monedas obtenidas</Text>
                    <Text style={[styles.datosEnsayo, {color: theme.colors.textSecondary}]}>Tiempo de demora: {datosEnsayo.totalTime}  </Text>
                    <TouchableOpacity onPress={() => {navigation.navigate('Menu')}} style={styles.boton}>
                        <Text>Finalizar Revisión</Text>
                    </TouchableOpacity>
                </View>
                {/* visualizaremos el ensayo completo.*/}
                <View style={{width:'95%', height:'100%'}}>
                     <FlatList
                        contentContainerStyle={{paddingBottom:250}} // para que el ultimo item se visualice mejor.
                        data={ensayo}
                        renderItem={({ item, index }) => (EnsayoRenderizado({item, index,respuestas, theme, }))}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={() => <View style={styles.separator}></View>} // para separar cada item.
                    /> 
                </View>
                   
            </View>
        </View>
  );
}}
export default EnsayoFeedback

const styles = StyleSheet.create({
    contenedorFeedback:{
        position:'relative',
        // top:10,
        flex:1,
        height:'100%',
    },
    contenedor:{
        flex:1,
        display:'flex',
        flexDirection:'column',
        maxWidth:'100%',
        height:'97%',
        padding:10,
        alignItems:'center', 
        gap:20,
    },
      scrollView:{
        height:'100%',
      },

      espacioFinal:{
        height:400
    },
    datos:{
        width:'100%',
        borderRadius:10,
        textAlign:'left',
        padding:20,
        gap:10,
    },
    boton:{
        display:'flex', 
        width:'50%',
        borderRadius:15,
        backgroundColor:'orange',
        alignItems:'center'
    },
    contenedorBoton:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        width:'100%',
        alignItems:'center',
        gap:20
    },
    titulo:{
        textAlign:'center', 
        fontSize:16,
         marginBottom:10,
         fontWeight:600
    },
    datosEnsayo:{
        fontWeight:600,
    },
    separator:{
        height:15
    }
})