import { StyleSheet, Text, View, Image, FlatList} from 'react-native'
import WebView from 'react-native-webview'
import React, { useContext } from 'react'
import RespuestasRenderizadas from './RespuestasRenderizadas'
import modoDark from '../../ModoDark'
import Katex from 'react-native-katex'
// import theme from '../../theme/theme'

const EnsayoRenderizado = ({item, index, respuestas, theme}) => {

    const inlineStyle =`
    html, body {
        background-color: ${theme.bground.bgSecondary};     
        margin: 0;
    }
    .katex {
        font-size: 2.5em;
        margin: 0;
        display: flex;
      }
    `;

    // const {theme} = useContext(modoDark)
  return (
      <View style={[styles.contenedorPreguntas, {backgroundColor:theme.bground.bgSecondary}]}>
            <View style={{display:'flex',flexDirection:'row' ,justifyContent:'space-between',marginBottom:10, paddingBottom:10, borderBottomWidth:2, borderBottomColor:theme.bground.bgBorderColor }}>
                <Text style={{ fontSize: 18, color: theme.colors.textSecondary, fontWeight: 'bold'}}>
                    Pregunta {index + 1}            
                </Text> 

                {/*si la respuesta que marco es correcta, colocaremos un icono de correcto. */}
                {item.answers.map((respuesta, index2)=>(
                    respuesta.id === respuestas[index].id && respuesta.isCorrect === 1 && (
                        <Image style={{width:20, height:20}}  source={require('../../assets/correcto.png')}  />
                    )                                        
                ))}
                {/* en caso contrario pondra el icono incorrecto*/}
                {item.answers.map((respuesta, index2)=>(
                    respuesta.id === respuestas[index].id && respuesta.isCorrect === 0 && (
                        <Image style={{width:20, height:20}}  source={require('../../assets/incorrecto.png')}  />
                    )                                        
                ))}
            </View>
                                
            {/* mostramos la pregunta del ensayo*/}
            {/* <Text style={[styles.textoPregunta, {color: theme.colors.textSecondary}]}>
                ¿{item.question}?
            </Text> */}
            <Katex 
                expression={item.question}
                inlineStyle={inlineStyle} 
            />
                                
            {/*Video de la respuesta del ensayo*/}
            <WebView source={{ uri: item.videoLink }} style={styles.videoPlayer} />
                                
            {/*renderizamo las respuestas del ensayo, con una constante que llamaremos.*/}
            <FlatList
                data={item.answers}
                renderItem={({item: respuestaItem, index:indexRespuesta}) => RespuestasRenderizadas({respuestaItem, index, respuestas, theme,indexRespuesta})}
                keyExtractor={(item) => item.id}
            />
        </View>
  )
}

export default EnsayoRenderizado

const styles = StyleSheet.create({
    contenedorPreguntas:{
        width:'100%', 
        display:'flex',
        flexDirection:'column',
        marginBottom:10,
        padding:10,
        borderRadius:15,
        height:600
    },
    textoPregunta:{
        color: 'black', 
    },
    videoPlayer: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        // width: 280,
        // height: 150,
        width:'90%',
        height:'70%',
        margin:10,
      },
})