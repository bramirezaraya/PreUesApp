import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import modoDark from '../../ModoDark'
// import theme from '../../theme/theme'

const RespuestasRenderizadas = ({respuestaItem, index, respuestas, theme, indexRespuesta}) => {

    // const {theme} = useContext(modoDark)
  return (
      <View style={styles.contenedorRespuestas}>
                {/* primero recorremos las respuestas para encontrar la que el usuario marco */}
                {respuestas[index].id === respuestaItem.id ? (
                    //si la respuesta marcada por el usuario es correcta, marcamos verde, sino marcamos color rojo.
                    <View>
                        {respuestaItem.isCorrect === 1 ? (<Text style={{color:theme.colors.correcta}} >
                            {/* {respuestaItem.label} */}
                            <Text>
                                <Text style={{fontWeight:600}}>{String.fromCharCode(65 + indexRespuesta)}.</Text> 
                                <Text> {respuestaItem.label}</Text>
                            </Text>
                        </Text>) : (<Text style={{color:theme.colors.incorrecta}}>
                            {/* {respuestaItem.label} */}
                            <Text>
                                <Text style={{fontWeight:600}}>{String.fromCharCode(65 + indexRespuesta)}.</Text> 
                                <Text> {respuestaItem.label}</Text>
                            </Text>
                        </Text>)}
                    </View>
                ) : (
                    // en caso que el usuario no haya elegido la respuesta correcta, marcamos la respuesta correcta con color verde.
                    <Text style={{color: respuestaItem.isCorrect === 1 ? theme.colors.correcta : theme.colors.textSecondary}}>
                        {/* {respuestaItem.label} */}
                        <Text>
                                <Text style={{fontWeight:600}}>{String.fromCharCode(65 + indexRespuesta)}.</Text> 
                                <Text> {respuestaItem.label}</Text>
                            </Text>
                    </Text>
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
        width:'90%',
        textAlign:'left',
        borderRadius:15,
    },
})