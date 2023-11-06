import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Katex from 'react-native-katex'

const RenderFeedbackAnswers = ({item, index, indexPregunta, selected, theme, }) => {

    const inlineStyleAnswers =`
    html, body {
        background-color: ${theme.bground.bgSecondary};     
        margin: 0;
        color: ${ item.isCorrect === 1 ? theme.colors.correcta : theme.colors.incorrecta}
    }
    .katex {
        font-size: 2.8em;
        margin: 0;
        display: flex;
      }
    `;

    const inlineStyleCorrect =`
    html, body {
        background-color: ${theme.bground.bgSecondary};     
        margin: 0;
        color: ${ item.isCorrect === 1 ? theme.colors.correcta : theme.colors.textSecondary}
    }
    .katex {
        font-size: 2.8em;
        margin: 0;
        display: flex;
      }
    `;

  return (
    <View style={{height:50}}>
        {selected[indexPregunta] === item.id  ? (
            <View style={{height:50, gap:10, display:'flex', flexDirection:'row'}}>
                <Text  style={{fontWeight:600, color: item.isCorrect === 1 ? theme.colors.correcta : theme.colors.incorrecta }}>{String.fromCharCode(65 + index)}.</Text> 
                <Katex 
                    expression={item.label}
                    inlineStyle={inlineStyleAnswers}
                />
            </View>
                    

        ):
        (   <View style={{height:50, gap:10, display:'flex', flexDirection:'row'}}>
                <Text style={{fontWeight:600, color: item.isCorrect === 1 ? theme.colors.correcta : theme.colors.textSecondary}}>{String.fromCharCode(65 + index)}.</Text> 
                <Katex 
                    expression={item.label}
                    inlineStyle={inlineStyleCorrect}
                />
        </View>
            
        )
        }    

    </View>
  )
}

export default RenderFeedbackAnswers

const styles = StyleSheet.create({

})