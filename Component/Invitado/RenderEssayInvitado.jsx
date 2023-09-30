import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
// import theme from '../../theme/theme'
import { TouchableOpacity } from 'react-native'

const RenderEssayInvitado = ({item, index, selected, setSelected, largo, theme}) => {

    const indexPregunta = index

    
  return (
    <View style={[styles.contenedor, {backgroundColor:theme.bground.bgSecondary,}]}>

        <View style={styles.datosEnsayo}>
            <Text style={styles.textoTitulo}>Pregunta {index + 1} de {largo}</Text>
            <Text>{item.question.replace(/Â/g, '')}</Text>
        </View>
      
      {item.answers.map((respuesta, index) => (
        <View key={respuesta.id}>
            <TouchableOpacity 
                style={[styles.boton, {backgroundColor:theme.bground.bgPrimary,}, selected[indexPregunta] === respuesta.id && {backgroundColor:theme.bground.bgBoton}]}
                onPress={() => {
                    setSelected( preview =>{
                            const respuestasMarcadas = [...preview]
                            respuestasMarcadas[indexPregunta] = respuesta.id
                            return respuestasMarcadas
                        }
                    )
                }}            
            >
                <Text style={{fontWeight:600}}>{String.fromCharCode(65 + index)}.</Text> 
                <Text>{respuesta.label}</Text>
            </TouchableOpacity>
        </View>  
      ))}
    </View>
  )
}

export default RenderEssayInvitado

const styles = StyleSheet.create({
    contenedor:{
        flex:1,
        padding:20,
        display:'flex',
        flexDirection:'column',
        gap:20,
        borderRadius:10
    },
    boton:{
        display:'flex',
        flexDirection:'row',
        gap:10,
        borderRadius:10,
        padding:10,
    },
    datosEnsayo:{
        gap:10
    },
    textoTitulo:{
        fontSize:16,
        fontWeight:700
    },
})