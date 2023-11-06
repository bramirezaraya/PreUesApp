import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import modoDark from '../../ModoDark'
import Katex from 'react-native-katex'
// import theme from '../../theme/theme'

const RespuestasRenderizadas = ({respuestaItem, index, respuestas, theme, indexRespuesta}) => {

    // para marcar el katex con la respuesta correcta o para marcarla por defecto en un color normal.
    const inlineStyle =`
    html, body {
        padding: 10;
        color:${respuestaItem.isCorrect === 1 ? theme.colors.correcta : theme.colors.textSecondary};
        background-color:${theme.bground.bgSecondary};
    }
    .katex {
        font-size: 2.8em;
        margin: 0;
        display: flex;
    }
    `;

    // para marcar si es correcta de color verde o incorrecta de color rojo.
    const inlineStyleCorrect =`
    html, body {
        padding: 10;
        color:${respuestaItem.isCorrect === 1 ? theme.colors.correcta : theme.colors.incorrecta};
        background-color:${theme.bground.bgSecondary};
    }
    .katex {
        font-size: 2.8em;
        margin: 0;
        display: flex;
    }
    `;

    // const {theme} = useContext(modoDark)
  return (
      <View style={styles.contenedorRespuestas}>
                {/* primero recorremos las respuestas para encontrar la que el usuario marco */}
                {respuestas[index].id === respuestaItem.id ? (
                    //si la respuesta marcada por el usuario es correcta, marcamos verde, sino marcamos color rojo.
                    <View style={{height:30, display:'flex', flexDirection:'row', gap:5}}>
                        <Text style={{fontWeight:600, color: respuestaItem.isCorrect === 1 ? theme.colors.correcta : theme.colors.incorrecta }}>{String.fromCharCode(65 + indexRespuesta)}.</Text>
                        <Katex 
                            expression={respuestaItem.label}
                            inlineStyle={inlineStyleCorrect}
                        />
                    </View>
                ) : (
                    // en caso que el usuario no haya elegido la respuesta correcta, marcamos la respuesta correcta con color verde.
                    <View style={{height:30, display:'flex', flexDirection:'row', gap:5}}>
                         <Text  style={{fontWeight:600, color: respuestaItem.isCorrect === 1 ? theme.colors.correcta : theme.colors.textSecondary}}>{String.fromCharCode(65 + indexRespuesta)}. </Text> 
                        <Katex 
                            expression={respuestaItem.label}
                            inlineStyle={inlineStyle}
                        />
                    </View>
                )}
                {/* <Text style={[styles.textoPregunta, {color: respuestas[index] === respuestaItem.answer_id && 'red'}, {color: respuestaItem.right === 1 && 'green'}]}>{respuestaItem.label}</Text> */}
        </View>
  )
}

export default RespuestasRenderizadas

const styles = StyleSheet.create({
    contenedorRespuestas:{
        display:'flex',
        flexDirection:'column',
        padding:5,
        margin:10,
        width:400,
        textAlign:'left',
        borderRadius:15,
    },
})