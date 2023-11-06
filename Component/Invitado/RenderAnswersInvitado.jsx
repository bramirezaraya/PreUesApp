import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Katex from 'react-native-katex'
import { TouchableOpacity } from 'react-native-gesture-handler';
const RenderAnswersInvitado = ({item, index, selected, setSelected, theme, indexPregunta}) => {

    const inlineStyle =`
    html, body {
        background-color: ${ selected[indexPregunta] === item.id ? theme.bground.bgBoton : theme.bground.bgPrimary};     
        margin: 0;
    }
    .katex {
        font-size: 2.8em;
        margin: 0;
        display: flex;
      }
    `; 

  return (
    <View style={{height:80}}>
      <TouchableOpacity
       style={[styles.boton, {backgroundColor:theme.bground.bgPrimary,}, selected[indexPregunta] === item.id && {backgroundColor:theme.bground.bgBoton}]}
       onPress={() => {
                    setSelected( preview =>{
                            const respuestasMarcadas = [...preview]
                            respuestasMarcadas[indexPregunta] = item.id
                            return respuestasMarcadas
                        }
                    )
                }}
        >
        
        <Text style={{fontWeight:600}}>{String.fromCharCode(65 + index)}.</Text> 
        <Katex 
            expression={item.label}
            inlineStyle={inlineStyle}
        />
      </TouchableOpacity>
    </View>
  )
}

export default RenderAnswersInvitado

const styles = StyleSheet.create({
    boton:{
        display:'flex',
        flexDirection:'row',
        gap:10,
        borderRadius:10,
        padding:10,
        height:50
    },
})