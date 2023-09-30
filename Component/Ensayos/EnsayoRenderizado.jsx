import { StyleSheet, Text, View, Image, FlatList} from 'react-native'
import WebView from 'react-native-webview'
import React, { useContext } from 'react'
import RespuestasRenderizadas from './RespuestasRenderizadas'
import modoDark from '../../ModoDark'
// import theme from '../../theme/theme'

const EnsayoRenderizado = ({item, index, respuestas, theme}) => {

    // const {theme} = useContext(modoDark)
  return (
      <View style={[styles.contenedorPreguntas, {backgroundColor:theme.bground.bgSecondary}]}>
            <View style={{display:'flex',flexDirection:'row' ,justifyContent:'space-between',marginBottom:10, paddingBottom:10, borderBottomWidth:2, borderBottomColor:theme.bground.bgBorderColor }}>
                <Text style={{ fontSize: 18, color: theme.colors.textSecondary, fontWeight: 'bold'}}>
                    Pregunta {index + 1}            
                </Text> 

                {/*si la respuesta que marco es correcta, colocaremos un icono de correcto. */}
                {item.selectedQuestion.answers.map((respuesta, index2)=>(
                    respuesta.id === respuestas[index].answer.id && respuesta.isCorrect === 1 && (
                        <Image style={{width:20, height:20}}  source={require('../../assets/correcto.png')}  />
                    )                                        
                ))}
                {/* en caso contrario pondra el icono incorrecto*/}
                {item.selectedQuestion.answers.map((respuesta, index2)=>(
                    respuesta.id === respuestas[index].answer.id && respuesta.isCorrect === 0 && (
                        <Image style={{width:20, height:20}}  source={require('../../assets/incorrecto.png')}  />
                    )                                        
                ))}
            </View>
                                
            {/* mostramos la pregunta del ensayo*/}
            <Text style={[styles.textoPregunta, {color: theme.colors.textSecondary}]}>
                ¿{item.selectedQuestion.question}?
            </Text>
                                
            {/*Video de la respuesta del ensayo*/}
            <WebView source={{ uri: item.selectedQuestion.videoLink }} style={styles.videoPlayer} />
                                
            {/*renderizamo las respuestas del ensayo, con una constante que llamaremos.*/}
            <FlatList
                data={item.selectedQuestion.answers}
                renderItem={({item: respuestaItem, index:indexRespuesta}) => RespuestasRenderizadas({respuestaItem, index, respuestas, theme,indexRespuesta})}
                keyExtractor={(item) => item.id}
            />
        </View>
  )
}

export default EnsayoRenderizado

const styles = StyleSheet.create({
    contenedorPreguntas:{
        width:350, 
        display:'flex',
        flexDirection:'column',
        marginBottom:10,
        padding:10,
        borderRadius:15,
    },
    textoPregunta:{
        color: 'black', 
    },
    videoPlayer: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width: 280,
        height: 150,
        margin:20,
      },
})