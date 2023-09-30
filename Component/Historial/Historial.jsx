import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import Header  from '../Header/Header.jsx'
// import theme from '../../theme/theme.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SelectDropdown from 'react-native-select-dropdown'
import RenderizadoHistorial from './RenderizadoHistorial.jsx'
import { useFocusEffect } from '@react-navigation/native'
import modoDark from '../../ModoDark.js'

const Historial = ({navigation}) => {

  // mandar el theme por props. a los render.

  const [historial, setHistorial] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [arrayFiltrado, setArrayFiltrado] = useState([])
  const [filtro, setFiltro] = useState('')

  const {theme} = useContext(modoDark)
  
  /// se usa para renderizar cada vez que se focusea el componente.
  useFocusEffect(
    React.useCallback(() =>{
    const apiHistorial = async() =>{
      try{
        const id_usuario = await AsyncStorage.getItem('id_usuario')
        const token = await AsyncStorage.getItem('token')

        const respuesta = await fetch(`http://192.168.1.96:3000/history`, {
          method:'GET',
          headers:{
            authorization: `Bearer ${token}`
          }
        })
        const data = await respuesta.json()

        const historialFiltrado = data.historial.filter((datos) => datos != null) // filtramos para tener solo los que se completaron.
        setHistorial(historialFiltrado.reverse())
        setArrayFiltrado(historialFiltrado)
      }catch(error){
        console.log(error)
      }
    }

    apiHistorial()
  },[]))

  // funcion para filtrar los datos del historial.
  // (a,b) = si es 0 "quedan iguales", si es menor a 0, "a queda primero", si es mayor a 0 "b queda primero".
  const filtrado = (datosEnsayos) =>{

    if( filtro === 'Nombre ascendente'){
      const arrayNuevo = [...datosEnsayos].sort((a,b) => a.name.localeCompare(b.name))
      return arrayNuevo
    }
    else if(filtro === 'Nombre descendente'){
      const arrayNuevo = [...datosEnsayos].sort((a,b) => b.name.localeCompare(a.name))
      return arrayNuevo
    } 
    else if(filtro === 'Fecha ascendente'){
      const arrayNuevo = [...datosEnsayos].sort((a,b) =>
          {
            const fecha1 = new Date(a.date);
            const fecha2 = new Date(b.date);
            return fecha1 - fecha2
          })
      return arrayNuevo
    }
    else if(filtro === 'Fecha descendente'){
      const arrayNuevo = [...datosEnsayos].sort((a,b) =>
          {
            const fecha1 = new Date(a.date);
            const fecha2 = new Date(b.date);
            return fecha2 - fecha1
          })
      return arrayNuevo
    }
    else if(filtro === 'Puntaje ascendente'){
      const arrayNuevo = [...datosEnsayos].sort((a,b) => a.puntaje - b.puntaje)
      return arrayNuevo
    }
    else if(filtro === 'Puntaje descendente'){
      const arrayNuevo = [...datosEnsayos].sort((a,b) => b.puntaje - a.puntaje)
      return arrayNuevo
    }
    else if(filtro === 'Geometria' || filtro === 'Numeros' || filtro === 'Algebra' || filtro === 'Probabilidad') {
      const filtroMinuscula = filtro.toLocaleLowerCase()
      const arrayNuevo = [...datosEnsayos].filter((elemento) => elemento.name.toLocaleLowerCase().includes(filtroMinuscula))
      return arrayNuevo
    }
  }


  useEffect(() => {
    // funcion para mostrar los datos del historial.
    const filtrarName = () =>{
      const minusculas = busqueda.toLocaleLowerCase();

      // creamos una variable que almacene el historial.
      let datosEnsayos = [...historial]
        // en caso que haya busqueda, la variable la modificamos solamente con los datos que contengan la busqueda.
        if(busqueda !== ''){
             datosEnsayos = datosEnsayos.filter((elemento) => elemento.name.toLocaleLowerCase().includes(minusculas))
        }
        // si hay algun tipo de filtro, modificamos la variable para que muestre con el tipo de filtro.
        if(filtro !==''){
          datosEnsayos = filtrado(datosEnsayos)       
        }

        // seteamos los datos de la variable.
        setArrayFiltrado(datosEnsayos);
    }
    filtrarName()
  }, [busqueda, filtro])

    if(historial){
       return (
        <View style={[styles.contenedorHistorial, {backgroundColor: theme.bground.bgPrimary,}]}>
          <View style={[styles.contenedorDatoHistorial, {backgroundColor:theme.bground.bgSecondary,}]}>
              <View style={{marginBottom:10, borderBottomColor:theme.bground.bgBorderColor, borderBottomWidth:2, paddingBottom:30}}>
                <Text style={{ marginTop:20,textAlign:'center', fontSize:20, fontWeight:600, color:theme.colors.textSecondary}}>Historial</Text>
              </View>
              
              
              <View style={styles.filtrados}>
                <View style={styles.contenedorBuscador}>
                  <TextInput onChangeText={(value) => setBusqueda(value)} style={[styles.buscador, {backgroundColor:theme.bground.bgBlanco,}]} />
                  <Image style={styles.iconoBuscador} source={require('../../assets/lupa.png')}/>
                </View>
                
                <View>
                  <SelectDropdown 
                    data={['Nombre ascendente','Nombre descendente','Fecha ascendente','Fecha descendente','Puntaje ascendente','Puntaje descendente', 'Geometria', 'Numeros', 'Probabilidad', 'Algebra']}
                    buttonStyle={[styles.dropdown, {backgroundColor:theme.bground.bgBlanco,}]}
                    buttonTextStyle={[styles.colorDropdown, {color:theme.colors.textNegro,}]}
                    defaultButtonText='Filtros'
                    dropdownStyle={[styles.drop, {backgroundColor:theme.bground.bgBlanco,}]}
                    rowTextStyle={[styles.colorDropdown, {color:theme.colors.textNegro,}]}
                    onSelect={(item) => setFiltro(item)}
                  />
                </View>
              </View>

              <View style={[styles.contenedorInformacionHistorial, {backgroundColor:theme.bground.bgHistorial,}]}>
                  <View style={styles.datos}>
                      <Text style={[styles.datosHistorial, {color:theme.colors.textSecondary}]}>Nombre</Text>
                      <Text style={[styles.datosHistorial, {paddingLeft:10, color:theme.colors.textSecondary}]}>Puntaje</Text>
                      <Text style={[styles.datosHistorial, {color:theme.colors.textSecondary}]}>Fecha</Text>
                      <Text style={[styles.datosHistorial, {color:theme.colors.textSecondary}]}>Preguntas</Text>
                      <Image source={require('../../assets/plus.png')} />
                  </View>

                  <FlatList
                    // contentContainerStyle={{paddingBottom:150}}
                      data={arrayFiltrado}
                      renderItem={({item, index}) => RenderizadoHistorial({item,index, navigation, theme})}
                      keyExtractor={(item) => item.id}
                  />
              </View>
          </View>
        </View>
      )
    }else{
      <View><Text>No tienes ningun ensayo realizado.</Text></View>
    }
       
}

export default Historial

const styles = StyleSheet.create({
  contenedorHistorial:{
    flex:1,
    padding:10,
  },
  header: {
    backgroundColor: 'transparent', // Fondo transparente para el encabezado
  },
  contenedorDatoHistorial:{
    borderRadius:15,
    padding:10,
  },
  filtrados:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  buscador:{
    display:'flex',
    flexDirection:'row',
    backgroundColor:'red',
    width:140,
    height:30,
    margin:10,
    borderRadius:10,
    color:'black',
    padding:5,
  },
  contenedorBuscador:{
    display:'flex',
    flexDirection:'row',
    position:'relative'
  },
  iconoBuscador:{
    width:15, 
    height:15, 
    position:'absolute', 
    top:20, 
    right:15
  },
  filtrado:{
    width:100,
    height:150
  },
  datos:{
    display:'flex',
    flexDirection:'row',
    padding:10,
    justifyContent:'space-between'
  },
  contenedorInformacionHistorial:{
    borderRadius:15,
    padding:10,
    margin:10,
    height:'80%'
  },
  datosHistorial:{
    fontSize:13, 
    fontWeight:600,
  },
  dropdown:{
    width:150,
    height:30,
    borderRadius:10,
    margin:10,
  },
  colorDropdown:{
    fontSize:12,
  },
  drop:{
    borderRadius:10,
  }
})