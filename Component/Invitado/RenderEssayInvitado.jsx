import { StyleSheet, Text, View, FlatList} from 'react-native'
import React, { useContext } from 'react'
// import theme from '../../theme/theme'
import { TouchableOpacity } from 'react-native'
import Katex from 'react-native-katex'
import RenderAnswersInvitado from './RenderAnswersInvitado'
const RenderEssayInvitado = ({item, index, selected, setSelected, largo, theme}) => {

    const indexPregunta = index
     // estilos del katex
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
    
  return (
    <View style={[styles.contenedor, {backgroundColor:theme.bground.bgSecondary,}]}>

        {/* Pregunta Ensayo */}
        <View style={styles.datosEnsayo}>
            <Text style={styles.textoTitulo}>Pregunta {index + 1} de {largo}</Text>
            <Katex 
                expression={item.question}
                inlineStyle={inlineStyle}
            />
        </View>
        
        {/* Respuestas Ensayo */}
        <FlatList 
            data={item.answers}
            renderItem={({item, index}) => (RenderAnswersInvitado({item, index, selected, setSelected, theme, indexPregunta}))}
            keyExtractor={(item) => item.id}
            // key={item.answers.id}
        />
      
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
    datosEnsayo:{
        height:80,
        display:'flex',
        flexDirection:'column',
        gap:10,
    },
    textoTitulo:{
        fontSize:16,
        fontWeight:700
    },
})