// import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView} from 'react-native'
// import React from 'react'
// import theme from '../../theme/theme'
// import axios from 'axios'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// import tokenContext from '../../TokenContext'

// const Menu = () => {

  
//   // para compartir datos entre componentes
//   const {setTokenAuthentication} = React.useContext(tokenContext);

//   const [perfil, setPerfil] = React.useState(false);
//   const url = 'http://192.168.1.96:8000/api/logout/'
//   const logOut = async() =>{
//     try{
//       const response = await axios.post(url);
//       await AsyncStorage.removeItem('token')
//       await AsyncStorage.removeItem('id_usuario')

//       setTokenAuthentication(false)
//       console.log(response.data)
//     } catch(error){
//         console.log(error)
//     }
//   }

//   return (
//     <SafeAreaView style = {[styles.container,{height: !perfil ? 55 : '100%',}, {width: !perfil ? "100%" : "70%"}]}  >

//       <View style={styles.header} > 
//           <TouchableOpacity style={styles.perfil} onPress={()=> setPerfil(!perfil)}>
//               <Image style={styles.perfilImg}  source={require('../../assets/Usuario.png')} />
//           </TouchableOpacity>
//         <View style={styles.logoCenter}>
//                 <Text>
//                       <Text style={styles.textTitulo}>Pre</Text>
//                       <Text style={styles.textTitulo02}>UesApp</Text>  
//                 </Text> 
//         </View>
       
//       </View>

//       {perfil && (        
//           <View style={styles.menuContainer}>
//               <TouchableOpacity style={styles.perfil} onPress={()=> {setPerfil(!perfil)}}>
//                 <Image style={styles.perfilImg}  source={require('../../assets/Usuario.png')} />
//               </TouchableOpacity>

//               <View style ={styles.menuOpciones} >
//                   <View >
//                     <TouchableOpacity style={styles.menuInterno} >
//                           <Image style={styles.iconos}  source={require('../../assets/moon.png')} />
//                           <Text  style={styles.text}>Modo oscuro</Text>
//                     </TouchableOpacity>
//                   </View>
//                   <View>
//                     <TouchableOpacity style={styles.menuInterno} onPress={logOut} >
//                         <Image  style={styles.iconos}  source={require('../../assets/log-out.png')}/>
//                         <Text style={styles.text}>Cerrar Sesión</Text>                
//                     </TouchableOpacity>
//                   </View>
//               </View>
//               <View>
//               </View>
//           </View>
//       )}
//     </SafeAreaView>
//   )
// }

// export default Menu

// const styles = StyleSheet.create({

//   container: {
//     flexDirection: "column",
//     justifyContent: "space-between",
//     backgroundColor: theme.bground.bgheaderBottom,
//     width:'100%',
//     position:'absolute',
//     zIndex:2,
//     borderBottomLeftRadius:15,
//     borderBottomEndRadius:15,
//   },
//   header:{
//     width:'100%',
//     flexDirection:'row',
//   },

//   logoCenter:{
//     display:'flex',
//     top:20,
//     alignItems:'center',
//     marginLeft:'30%',
//   },
//   perfil:{
//     top:20,
//     left:15,
//   },
//   perfilImg:{
//     width:30,
//     height:30,
//   },
//   menuContainer:{
//       position:'absolute',
//       top:0,
//       left:0,
//       bottom:0,
//       height:'100%',
//       width:'100%',
//       backgroundColor:'#fff',
//       flexDirection:'column',
//       justifyContent:'space-between',
//       zIndex:2,
//   },

//   menuOpciones:{
//       flexDirection:'column',
//       justifyContent:'space-between',
//       position:'relative',
//   },

//   menuInterno:{
//       flexDirection:'row',
//       justifyContent:'space-between',
//       width:'80%',
//       position:'relative',
//       marginTop:30,
//       shadowColor: '#171717',
//       shadowOffset: {width: -2, height: 4},
//       shadowOpacity: 0.2,
//       shadowRadius: 3,
//       backgroundColor:'red',
//       marginLeft:30,
//       borderRadius:10,
//       height:40,
//       textAlign:'center',
//       alignItems:'center',
//       backgroundColor:'#B5ECFE',
//   },
//   text:{
//     fontSize:16,
//     fontWeight:600,
//     color: theme.colors.textSecondary,
//     paddingRight:10
//   },
//   textTitulo:{
//     fontSize:20,
//     fontWeight:600,
//     color: theme.colors.textSecondary,
//     paddingRight:40,

//   },
//   textTitulo02:{
//     fontSize:20,
//     fontWeight:600,
//     color: theme.colors.textbottom,
//   },
  

//   iconos:{
//       width:30,
//       height:30,
//       left:15,
//   },

//   logo:{
//     width:117,
//     height:100,
//   }

// })