import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Katex from 'react-native-katex';

const RenderAnswers = ({item, index, selected, setSelected, theme, indexPregunta}) => {


    const inlineStyle =`
        html, body {
            padding: 10;
            background-color:${selected[indexPregunta] == item.id ? 'orange' : theme.bground.bgensayoFondoRespuestaBlanco}
        }
        .katex {
            font-size: 2.8em;
            margin: 0;
            display: flex;
        }
        `;


  return (
    
        //seteamos las respuestas marcadas un en array.//si es que la respuesta es igual a la marcada, la marcamos con un bg orange.
        <View key={index} style={[styles.contenedorRespuestas, {backgroundColor:theme.bground.bgensayoFondoRespuestaBlanco,}, selected[indexPregunta] == item.id ? {backgroundColor:'orange',borderRadius:10,} : styles.respuesta]}>                              
            <TouchableOpacity style={{display:'flex',flexDirection:'row', gap:10, height:40}}
                onPress={() => setSelected(preview =>{
                         const newRespuesta = [...preview] /// copiamos todas las respuestas previas del array completo.
                         newRespuesta[indexPregunta] = item.id // marcamos la respuesta que ha elegido en la pregunta.
                          return newRespuesta
                })}
            >   
                    <Text  style={{fontWeight:600}}>{String.fromCharCode(65 + index)}. </Text> 
                    {/* <Text style={{fontWeight:600}}>{respuesta.label}</Text>  */}
                    <Katex 
                        expression={item.label}
                        inlineStyle={inlineStyle} 
                    />
                                            
            </TouchableOpacity>
        </View>                
  )
}

export default RenderAnswers

const styles = StyleSheet.create({

    contenedorRespuestas:{
        borderRadius:10,
        minHeight:40,    
        display:'flex',
        flexDirection:'column',
        shadowOffset:{width: 1, height:4}, // en que lado afecta
        shadowOpacity:0.2, // la opacidad
        shadowRadius:3, // el radio de la sombra
        shadowColor:'#000000', // color del shadow
        padding:5,
        margin:10,
        backgroundColor:'#fff'
    },
    respuesta:{

    },

})