import { View, Text, StyleSheet, Image, FlatList} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import { ScrollView, TouchableOpacity } from 'react-native'
import MenuContext from '../../MenuContext'
import Katex from 'react-native-katex'
// import theme from '../../theme/theme'
import RenderAnswers from './RenderAnswers'
const submit_answers = "http://192.168.1.96:3000/submitAnswers/"; 

import left from '../../assets/ArrowLeft.png'
import right from '../../assets/ArrowRight.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
import modoDark from '../../ModoDark'

const EnsayoPrueba = ({navigation}) => {

    const {theme} = useContext(modoDark)

    const [ensayos, setEnsayos] = useState([])
    const [indexPregunta, setIndexPregunta] = useState(0);
    const [selected, setSelected] = useState([])
    const [idEnsayo, setIdEnsayo] = useState();
    const [tiempo, setTiempo] = useState()
    const [minutos, setMinutos] = useState()
    const [segundos, setSegundos] = useState()
    const [cantidadPaginas, setCantidadPaginas] = useState(0)
    const [modulo, setModulo] = useState(0)
    const[indexPagination, setIndexPagination] = useState(0)
    const array= new Array(4).fill('')
    const [arrayModulo, setArrayModulo] = useState([])

    const {setMenuEnsayo, setIdEssay} = useContext(MenuContext)
    // avanzar pregunta
    const AvanzarPregunta = () =>{
        if(indexPregunta < ensayos.length - 1){
            setIndexPregunta(indexPregunta + 1)
        }
    }
    //retroceder pregunta
    const RetrocederPregunta = () =>{
        if(indexPregunta > 0){
            setIndexPregunta(indexPregunta - 1)
        }
    }

    const route = useRoute();
    const {nombre, id_ensayo, isCustom} = route.params
    
    const inlineStyle =`
    html, body {
        background-color: ${theme.bground.bgSecondary};     
        margin: 0;
    }
    .katex {
        font-size: 2.5em;
        margin: 0;
        display: flex;
      }
    `;

    // pedimos los datos del ensayo al backend.
    useEffect(() =>{
 
        // llamo el ensayo que rendire.
        const llamadaEnsayos = async() =>{
            try{
                setMenuEnsayo(false)
                const respuesta = await axios.get(`http://192.168.1.96:3000/essayQuestions/?name=${nombre}`)
                setEnsayos(respuesta.data.questions)
                setTiempo(respuesta.data.questions.length * 60 * 2)
                postEnsayo(respuesta.data.questions.length, respuesta.data.questions.length * 60 * 2)
                
                /// seteamos la cantidad de paginas que tendra, dependiendo el largo del ensayo.
                if(respuesta.data.questions.length % 4 === 0){
                    setCantidadPaginas(Math.trunc(respuesta.data.questions.length / 4))
                }else{
                    setCantidadPaginas(Math.trunc(respuesta.data.questions.length / 4) + 1)
                }
                setModulo(respuesta.data.questions.length % 4)
                
                setArrayModulo(new Array(respuesta.data.questions.length % 4).fill(''))
            }
            catch(error){
                console.log(error)
            }   
        }
        
        // llamada al ensayo general.
        const ensayoGeneral = async() =>{
            try{
                setMenuEnsayo(false)
                axios.get('http://192.168.1.96:3000/allQuestions/')
                .then((response) => {
                    const array1 = response.data[0].questions;
                    const array2 = response.data[1].questions;
                    const array3 = response.data[2].questions;
                    const array4 = response.data[3].questions;
    
                    // Combina los cuatro arrays en uno solo
                    const todasLasPreguntas = array1.concat(array2, array3, array4);
                    setTiempo(todasLasPreguntas.length *60 *2)
                    setEnsayos(todasLasPreguntas)
                    postEnsayo(todasLasPreguntas.length, todasLasPreguntas.length *60 *2)
                    setModulo(todasLasPreguntas.length % 4)
                    if(todasLasPreguntas.length % 4 === 0){
                        setCantidadPaginas(Math.trunc(todasLasPreguntas.length / 4))
                    }else{
                        setCantidadPaginas(Math.trunc(todasLasPreguntas.length / 4) + 1)
                    }

                   
                    setArrayModulo(new Array(todasLasPreguntas.length % 4).fill(''))
                    })
                .catch((error) => console.log(error))

            }catch (error){ 
                console.log(error)
            }
        }

    //hago post del ensayo que se rendira y lo guardo en el backend.
        const postEnsayo = async (numeroPreguntas, tiempo) =>{
            const nombreEnsayo = nombre.slice(7)
            try{            
                /// revisar el tiempo......
                const cantidadPreguntas = numeroPreguntas
                const id_usuario = await AsyncStorage.getItem('id_usuario');
                const token = await AsyncStorage.getItem('token')
                const ensayo = {
                    userId:id_usuario,
                    essayIDS: id_ensayo,
                    numberOfQuestions: cantidadPreguntas,
                    isCustom:0,
                    name: nombreEnsayo,
                    durationTime:tiempo,
                }

                axios.post('http://192.168.1.96:3000/newEssay/', ensayo, {headers:{
                    Authorization:`Bearer ${token}`
                }})
                .then((response) => {setIdEnsayo(response.data.newEssay.id), setIdEssay(response.data.newEssay.id)}) /// response.data.id
                .catch((error) => console.log(error))
            }catch(error){
                console.log(error)
            }
        }

        // llamada al ensayo custom.
        const customEssay = async() =>{
                const token = await AsyncStorage.getItem('token')
                setMenuEnsayo(false)
                axios.get(`http://192.168.1.96:3000/customEssay/?essayId=${id_ensayo}`, {headers:{
                    Authorization:`Bearer ${token}`
                }})
                .then((response) => {
                    setEnsayos(response.data.customEssay.questions), 
                    setTiempo(response.data.customEssay.selectedTime * 60), 
                    setIdEnsayo(response.data.customEssay.id)
                    setIdEssay(response.data.customEssay.id)
                    setModulo(response.data.customEssay.questions.length % 4)
                    if(response.data.customEssay.questions.length % 4 === 0){
                        setCantidadPaginas(Math.trunc(response.data.customEssay.questions.length / 4))
                    }else{
                        setCantidadPaginas(Math.trunc(response.data.customEssay.questions.length / 4) + 1)
                    }
                    
                   
                    setArrayModulo(new Array(response.data.customEssay.questions.length % 4).fill(''))

                    }
                )
                .catch((error) => console.log(error))
        }


        if(isCustom === 0){
            if(nombre === 'Ensayo General'){
                ensayoGeneral() // llamamos ensayo general
            }else{
                llamadaEnsayos(); // ensayo predefinido
            }  
        }else{
            customEssay() // ensayo custom.
        }
    },[nombre])


    /// hago un post del ensayo realizado y lo navego a otro componente para visualizar.
    const mostrarDatos = async() =>{
        let contador = 0
        // para saber cuantas ha seleccionado el usuario, asi evitar que envie el ensayo sin completar todas.
        selected.map((item) => {
            if(item !== undefined ){
                contador++;
            }
        })

        const tiempoTotalEnsayo = (ensayos.length * 60 * 2 ) - (tiempo)
        if(contador === ensayos.length){
           const tiempoTotal = tiempoTotalEnsayo.toString()
             try{
                const token = await AsyncStorage.getItem('token')
                const idusuario = await AsyncStorage.getItem('id_usuario')
                const respuesta = await axios.post(submit_answers, {
                    answersIDS: selected,
                    essayId:idEnsayo,
                    essayTime:tiempoTotal,
                    isCustom:isCustom
                }, {headers:{
                    Authorization:`Bearer ${token}`
                }})
                // Verificar si la respuesta fue exitosa (código 200)
                console.log(respuesta.status)
                if (respuesta.status === 200) {
                    // Navegar al otro componente
                    setMenuEnsayo(true)
                    navigation.navigate('EnsayoFeedback', { id: idEnsayo });
                } else {
                    console.log('La respuesta no fue exitosa');
                }
            }
            catch(error){
                console.log(error)
            }
        }
        else{
            alert('debes responder todas las preguntas')
        }
       
    }

    /// para actualizar el tiempo del ensayo.
    useEffect(() => {

        let timer
        setMinutos(Math.floor(tiempo / 60));
        setSegundos(tiempo % 60);

        const actualizarTiempo = () =>{
            if(tiempo > 0){
                setTiempo(tiempoAnterior => tiempoAnterior - 1)
            }else{
            }
        }

        // llamamos la funcion cada 1 segundo.
        timer = setInterval(actualizarTiempo, 1000);

        // limpiamos el temporizador, para que se ejecute normalmente.
        return () => {
            clearInterval(timer);
          };

    }, [tiempo])

    // avanzar pagination.
    const avanzarPagination = () =>{     
        if(indexPagination < cantidadPaginas-1){
            setIndexPagination(indexPagination+1)
        }
    }

    // retroceder pagination
    const retrocederPagination = () =>{     
        if(indexPagination > 0){
            setIndexPagination(indexPagination-1)
        }
    }


    // si tenemos datos del ensayo, mostramos los datos.
    if(ensayos && ensayos.length > 0){
        //constante para mostrar los datos depenediendo el index.
        let essay
        if(isCustom === 0 ){
              essay = ensayos[indexPregunta];
        }else {
             essay = ensayos[indexPregunta].selectedQuestion
        }
        return (
           <View style={[styles.contenedorPrincipal, {backgroundColor:theme.bground.bgPrimary,}]}>
                <View style={[styles.contenedorEnsayo, {backgroundColor: theme.bground.bgSecondary}]}>

                    <View style={[styles.contenedorTitulo]} >
                        <Text style={[styles.cantidadPregunta, {color:theme.colors.textSecondary}]}>Pregunta {indexPregunta + 1} de {ensayos.length}</Text>
                        <View style={styles.contenedorTime}>
                            <Image style={{width:25,height:25}} source={require('../../assets/time.png')} />
                            <Text style={[styles.timer, {color:theme.colors.textSecondary}]}>{minutos < 10 ? '0'+minutos : minutos}:{segundos < 10 ? '0'+segundos : segundos}</Text>
                        </View>                      
                    </View>
                    <View style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly', height:'70%'}}>
                        <View style={styles.preguntas}>
                            {/* <Text style={[styles.pregunta, {color:theme.colors.textSecondary} ]}>{essay.question.replace(/Â/g, '')}</Text> */}
                            <Katex 
                                expression={essay.question}
                                inlineStyle={inlineStyle} 
                            />
                        </View>           

                        <View>
                            <FlatList  
                                data={essay.answers}
                                renderItem={({item, index}) => (RenderAnswers({item, index, selected, setSelected, theme, indexPregunta}))}
                                key={essay.answers.id}
                            />
                        </View>
                    </View>
                        
                    



                    <View style={styles.contenedorBoton}>
                        {indexPregunta +1 === ensayos.length && (
                            <TouchableOpacity style={[styles.botonfinalizar, {backgroundColor:theme.bground.bgBotonNavegacion}]} onPress={() => mostrarDatos()}>
                                <Text style={{color:'#000', fontWeight:600,}}>Finalizar</Text>
                            </TouchableOpacity> 
                            )
                        }
                    </View>

                <View style={{width:'100%', alignItems:'center'}}>
                      {cantidadPaginas -1 === indexPagination ? 
                      (
                        <View style={[styles.navegacion, {backgroundColor:theme.bground.bgNavegacion,}]}>
                            
                            <TouchableOpacity  onPress={() => retrocederPagination()}>
                                <Image style={styles.icono} source={left} />
                            </TouchableOpacity>

                            {modulo === 0 ? (
                                <View style={{flex:1, flexDirection:'row', gap:30}}>
                                    {array.map((item, index) =>(
                                        <TouchableOpacity style={[styles.botonNavegacion, {borderColor:theme.bground.bgBotonNavegacion}, selected[indexPagination * 4 + index] !== undefined && {backgroundColor:theme.bground.bgBotonNavegacion}]} 
                                        onPress={() => setIndexPregunta(indexPagination * 4 + index) } 
                                        key={index}
                                        >
                                            <Text>{indexPagination * 4 + index+1}</Text>
                                        </TouchableOpacity>
                                    )) }
                                </View>
                                ) : (
                                    <View style={{flex:1, flexDirection:'row', gap:30}}>
                                        {arrayModulo.map((item,index) =>(
                                             <TouchableOpacity 
                                             style={[styles.botonNavegacion, {borderColor:theme.bground.bgBotonNavegacion}, selected[indexPagination * 4 + index] !== undefined && {backgroundColor:theme.bground.bgBotonNavegacion}]} 
                                             onPress={() => setIndexPregunta(indexPagination * 4 + index) } 
                                             key={index}
                                             >
                                                <Text>{indexPagination * 4 + index+1}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )
                                }
                            <TouchableOpacity  onPress={() => avanzarPagination()}>
                                <Image style={styles.icono} source={right} />
                            </TouchableOpacity>
                        </View>
                      ) : (
                        <View style={[styles.navegacion, {backgroundColor:theme.bground.bgNavegacion,}]}>
                            <TouchableOpacity  onPress={() => retrocederPagination()}>
                                <Image style={styles.icono} source={left} />
                            </TouchableOpacity>
                            {array.map((item, index) =>(
                                        <TouchableOpacity style={[styles.botonNavegacion, {borderColor:theme.bground.bgBotonNavegacion}, selected[indexPagination * 4 + index] !== undefined && {backgroundColor:theme.bground.bgBotonNavegacion}]} 
                                        onPress={() => setIndexPregunta(indexPagination * 4 + index) } 
                                        key={index}
                                        >
                                            <Text>{indexPagination * 4 + index+1}</Text>
                                        </TouchableOpacity>
                                    )) }
                            <TouchableOpacity  onPress={() => avanzarPagination()}>
                                <Image style={styles.icono} source={right} />
                            </TouchableOpacity>
                        </View>
                      )
                    }                      
                </View>

                </View>
            </View>
        );}
}


export default EnsayoPrueba

const styles = StyleSheet.create({

    contenedorPrincipal:{
        flex:1,
        padding:10,
    },
    contenedorEnsayo:{
        width:'100%',
        display:'flex',
        height:'100%',
        // alignItems:'center',
        justifyContent:'space-evenly',
        flex:1,
        borderRadius:10, 
        paddingLeft:20
    },
    contenedorBoton:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        width:'80%',
        alignItems:'center',
    },
    contenedorTitulo:{
        width:'100%',
        maxWidth:'80%',
        display:'flex',
        flexDirection:'row',
        borderBottomColor:'#13B2E4',
        // borderBottomWidth:'2px',
        // paddingBottom: '15px',
        alignItems:'center',
        justifyContent:'space-between'
    },
    cantidadPregunta:{
        fontSize:16,
        fontWeight:600,
    },
    pregunta:{
        display:'flex',
        fontSize:14,
        fontWeight:600,
    },
    preguntas:{
        display:'flex',
        height:'10%',
        maxWidth:'95%',
    },
    contenedorRespuestas:{
        borderRadius:10,
        width:'90%',
        height:'6%',
        minHeight:30,    
        display:'flex',
        flexDirection:'column',
        alignContent:'center',
        shadowOffset:{width: 1, height:4}, // en que lado afecta
        shadowOpacity:0.2, // la opacidad
        shadowRadius:3, // el radio de la sombra
        shadowColor:'#000000', // color del shadow
        padding:10,
    },
    respuesta:{

    },
    boton:{
        padding:10
    },
    botonfinalizar:{
        width:100,
        height:30,
        backgroundColor:'#FED604',
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
    },
    timer:{
        fontSize:17,
        fontWeight:600,
        width:60,
        textAlign:'center',
    },
    katex: {
        width:400
    },
    contenedorTime:{
        display:'flex',
        flexDirection:'row',
    },
    navegacion:{
        display:'flex',
        flexDirection:'row',
        gap:30,
        padding:10,
        borderRadius:10,
        width:'90%',
        justifyContent:'space-between',
        height:50
    },
    botonNavegacion:{
        borderWidth:2,
        padding:5,
        width:30,
        height:30,
        textAlign:'center',
        alignItems:'center',
        borderRadius:15
    },
    icono:{
        width:30,
        height:30
    }
})