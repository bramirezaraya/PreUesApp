import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import left from '../../assets/ArrowLeft.png'
import right from '../../assets/ArrowRight.png'

const NavegacionEssay = ({cantidadPaginas, indexPagination, theme, retrocederPagination,modulo, arrayPreguntas, setIndexPregunta, arrayModulo,avanzarPagination, selected}) => {
  return (
    <View style={{width:'100%', alignItems:'center'}}>
                    {/* Si estamos en la ultima pagina estramos aqui */}
                      {cantidadPaginas -1 === indexPagination ? 
                      (
                        <View style={[styles.navegacion, {backgroundColor:theme.bground.bgNavegacion,}]}>
                            
                            <TouchableOpacity  onPress={() => retrocederPagination()}>
                                <Image style={styles.icono} source={left} />
                            </TouchableOpacity>
                            {/* si el modulo es 0, mostramos las 4 preguntas. */}
                            {modulo === 0 && (
                                <View style={{width:'65%', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                    {arrayPreguntas.map((item, index) =>(
                                        <TouchableOpacity style={[styles.botonNavegacion, {borderColor:theme.bground.bgBotonNavegacion}, selected[indexPagination * 4 + index] !== undefined && {backgroundColor:theme.bground.bgBotonNavegacion}]} 
                                        onPress={() => setIndexPregunta(indexPagination * 4 + index) } 
                                        key={index}
                                        >
                                            <Text>{indexPagination * 4 + index+1}</Text>
                                        </TouchableOpacity>
                                    )) }
                                </View>
                            )} 
                            {modulo !== 0 && (
                                // en caso que el modulo sea distinto a 0
                                // mostramos la cantidad de preguntas que son. (1 , 2 o 3)
                                <View  style={{width:'65%', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
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
                            )}
                                
                            <TouchableOpacity  onPress={() => avanzarPagination()}>
                                <Image style={styles.icono} source={right} />
                            </TouchableOpacity>
                        </View>
                      ) : (
                        // en caso que no estamos en la ultima pagina, mostramos de 4 preguntas en cada pagina hasta llegar a la ultima.
                        <View style={[styles.navegacion, {backgroundColor:theme.bground.bgNavegacion,}]}>
                            <TouchableOpacity  onPress={() => retrocederPagination()}>
                                <Image style={styles.icono} source={left} />
                            </TouchableOpacity>
                            {arrayPreguntas.map((item, index) =>(
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
  )
}

export default NavegacionEssay

const styles = StyleSheet.create({
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