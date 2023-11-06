import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
// import theme from '../../theme/theme'
import WebView from 'react-native-webview'
import modoDark from '../../ModoDark'
import Katex from 'react-native-katex'
import { FlatList } from 'react-native-gesture-handler'
import RenderFeedbackAnswers from './RenderFeedbackAnswers'
const RenderFeedbackEssay = ({item, index, selected, theme}) => {

    const inlineStyle =`
    html, body {
        background-color: ${theme.bground.bgSecondary};     
        margin: 0;
    }
    .katex {
        font-size: 2.8em;
        margin: 0;
        display: flex;
      }
    `;

      const indexPregunta = index;

  return (
    <View style={[styles.contenedor, {backgroundColor:theme.bground.bgSecondary,}]}>
        <View style={styles.datos}>
            <Text style={{fontWeight:700, fontSize:18}}>Pregunta {index + 1}</Text>
            {item.answers.map ((item, i) => (
                <View key={i} style={{position:'absolute', right:0}}>
                    {selected[index] === item.id && (
                        <View>
                            {item.isCorrect === 1 ? (
                                <Image style={styles.icono} source={require('../../assets/correcto.png')} />
                            ): (<Image style={styles.icono} source={require('../../assets/incorrecto.png')} />)  
                            }
                        </View>
                    )}
                </View>
            ))}
        </View>
        
        <View style={styles.contenedorPreguntas}>      
            <Katex 
                expression={item.question}
                inlineStyle={inlineStyle}
            />
        </View>
        
        <View style={{height:'40%', width:'100%'}}>
            <WebView source={{ uri: item.videoLink }} style={[styles.videoPlayer]} />
        </View>
        
        
        <View style={{width:'100%', height:200}}>
            <FlatList 
                data={item.answers}
                renderItem={({item, index}) => (RenderFeedbackAnswers({item, index,indexPregunta, selected, theme}))}
                keyExtractor={(item) => item.id}               
            />
        </View>
        

    </View>
  )
}

export default RenderFeedbackEssay

const styles = StyleSheet.create({

    contenedor:{
        width:'100%',
        borderRadius:10,
        padding:15,
        shadowOffset:{width: 2, height:3}, // en que lado afecta
        shadowOpacity:0.2, // la opacidad
        shadowRadius:4, // el radio de la sombra
        elevation:4,
        height:700,
        display:'flex',
        justifyContent:'space-between',
        gap:20
    },
    datos:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        position:'relative'
    },
    contenedorPreguntas:{
        display:'flex',
        flexDirection:'column',
        height:80,
        gap:20
    },
    icono:{
        width:20,
        height:20,
        position:'absolute',
        right:0,
    },
    videoPlayer: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        margin:20,
      },

})