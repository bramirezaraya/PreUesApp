import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
// import theme from '../../theme/theme'
import WebView from 'react-native-webview'
import modoDark from '../../ModoDark'
const RenderFeedbackEssay = ({item, index, selected, theme}) => {

  

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

            <Text style={{fontWeight:700, fontSize:16}}>{item.question.replace(/Â/g, '')}</Text> 

             <WebView source={{ uri: item.videoLink }} style={styles.videoPlayer} />                   
            
            {item.answers.map((item, i) => (
                <View key={i}>
                    {selected[index] === item.id  ? (
                        <View>
                            {item.isCorrect === 1 ? (
                                <Text style={{color:theme.colors.correcta}}>{item.label}</Text>
                            ) : (
                                <Text style={{color:theme.colors.incorrecta}}>{item.label}</Text>
                            )}
                        </View>
                    ):
                    ( <Text style={{color: item.isCorrect === 1 ? theme.colors.correcta : '#000'}}>{item.label}</Text>)
                    }    
                </View>
            ))}

        </View>
    </View>
  )
}

export default RenderFeedbackEssay

const styles = StyleSheet.create({

    contenedor:{
        width:'100%',
        borderRadius:10,
        padding:20,
        shadowOffset:{width: 2, height:3}, // en que lado afecta
        shadowOpacity:0.2, // la opacidad
        shadowRadius:4, // el radio de la sombra
        elevation:4,
    },
    datos:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        position:'relative'
    },
    contenedorPreguntas:{
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
        width: 280,
        height: 150,
        margin:20,
      },

})