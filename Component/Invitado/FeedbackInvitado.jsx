import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
// import theme from '../../theme/theme'
import RenderFeedbackEssay from './RenderFeedbackEssay'
import modoDark from '../../ModoDark'


const FeedbackInvitado = () => {

  const ruta = useRoute()
  const {theme} = useContext(modoDark)

  const {selected, ensayo, largo, minutos, segundos} = ruta.params
  const date = new Date()
  const fecha = date.toLocaleString()

  const PuntajeEnsayo = () =>{

    let contador = 0;
    for (let i=0; i < ensayo.length; i ++){
        ensayo[i].answers.map((item, index) =>{
          if(item.isCorrect === 1){
            if(item.id === selected[i]){
              contador++;
            }
          }
        })
    }

    return contador // formula score
  }

  const puntaje = Math.trunc(100 + (900 / largo) * PuntajeEnsayo()) // formula
  const totalCorrectas = PuntajeEnsayo()
  return (
    <View style={[styles.contenedor, {backgroundColor:theme.bground.bgPrimary,}]}>
        <View style={[styles.contenedorDatos, {backgroundColor:theme.bground.bgSecondary,}]}>
              <Text style={styles.textoPuntaje}>Puntaje obtenido: {puntaje}</Text>
              <View>
                    <Text style={styles.texto}>Realizado el {fecha}</Text>
                    <Text style={styles.texto}>{totalCorrectas} Respuestas correctas</Text>
                    <Text style={styles.texto}>Tardaste {minutos < 10 ? '0'+ minutos : minutos }:{segundos < 10 ? '0'+segundos : segundos} en terminar el ensayo</Text>
              </View>
        </View>

        <FlatList 
          data={ensayo}
          renderItem={({item, index}) => (RenderFeedbackEssay({item, index, selected, theme}))}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{padding:20}}
          ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        />
      </View>
  )
}

export default FeedbackInvitado

const styles = StyleSheet.create({
  contenedor:{
    flex:1,
  },
  contenedorDatos:{ 
    padding:20,
    margin:20,
    borderRadius:10,
    shadowOffset:{width: 2, height:3}, // en que lado afecta
    shadowOpacity:0.2, // la opacidad
    shadowRadius:4, // el radio de la sombra
    elevation:4,
    gap:10
  },
  textoPuntaje:{
    fontSize:18,
    fontWeight:700,
    textAlign:'center'
  },
  texto:{
    fontWeight:600,
    fontSize:16
  },
  separator:{
    height:15
},
})