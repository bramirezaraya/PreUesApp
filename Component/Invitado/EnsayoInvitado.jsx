import { StyleSheet, Text, View, FlatList , Image} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
// import theme from '../../theme/theme'
import RenderEssayInvitado from './RenderEssayInvitado'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Katex from 'react-native-katex';
import modoDark from '../../ModoDark'
const EnsayoInvitado = ({navigation}) => {

    const ruta = useRoute()
    const {theme} = useContext(modoDark)
    // ensayo con 20 preguntas, tiempo 30 minutos.
    const {ensayo, tiempo, largo} = ruta.params
    const [selected, setSelected] = useState([])
    const [minutos, setMinutos] = useState()
    const [segundos, setSegundos] = useState()
    const [tiempoEnsayo, setTiempoEnsayo] = useState(tiempo * 60)
    useEffect(() => {

        let timer
        setMinutos(Math.floor(tiempoEnsayo / 60)); // redondea al decimal mas cercano
        setSegundos(tiempoEnsayo % 60); /// sacamos modulo del total del tiempo.

        const actualizarTiempo = () =>{
            if(tiempoEnsayo > 0){
                setTiempoEnsayo(tiempoAnterior => tiempoAnterior - 1)
            }else{
            }
        }

        // llamamos la funcion cada 1 segundo.
        timer = setInterval(actualizarTiempo, 1000);

        // limpiamos el temporizador, para que se ejecute normalmente.
        return () => {
            clearInterval(timer);
          };

    }, [tiempoEnsayo])


    const EnviarEnsayo = () =>{

        if(selected.length === ensayo.length){
            // const tiempoTotal = 30 * 60 - tiempoEnsayo 
            var min = 0
            if(minutos === 25){
                min = 25
            }else{
                min = 24-minutos
            }
            const seg = 60 - segundos
            navigation.navigate('feedbackInvitado', {ensayo:ensayo, selected:selected, minutos:min, segundos:seg, largo:largo})
           
        }else{
            alert('Debes contestar todas las preguntas.')
        }    
    }

  return (
    <View style={[styles.contenedor, {backgroundColor:theme.bground.bgPrimary,}]}>

            <View style={styles.tiempo}>
                <Image style={{width:25,height:25}} source={require('../../assets/time.png')} />
                <Text style={[styles.time, {color:theme.colors.textSecondary}]}>{minutos < 10 ? '0'+minutos : minutos}:{segundos < 10 ? '0'+segundos : segundos}</Text>
            </View>
            {ensayo ? <FlatList 
                data={ensayo}
                renderItem={({item, index}) => (RenderEssayInvitado({item, index, selected, setSelected, largo, theme}))}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{padding:20}}
                ItemSeparatorComponent={() => <View style={styles.separator}></View>}
            /> : <Text>Cargando..</Text>}

            <View style={styles.contenedorBoton}>
                <TouchableOpacity style={[styles.boton, {backgroundColor:theme.bground.bgBoton,}]} onPress={() => EnviarEnsayo()}>
                    <Text>Finalizar Ensayo</Text>
                </TouchableOpacity>
            </View>
    </View>

  )
}

export default EnsayoInvitado

const styles = StyleSheet.create({
    contenedor:{
        flex:1,
    },
    separator:{
        height:15
    },
    contenedorBoton:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        margin:10
    },
    boton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
    },
    tiempo:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        justifyContent:'flex-end',
        paddingRight:30,
        height:30,
        marginTop:20,
        gap:10,
    },
    time:{
        fontSize:18,
    },
})