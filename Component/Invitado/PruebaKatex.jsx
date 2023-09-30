// import { StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import Katex from 'react-native-katex';
// import { InlineMath, BlockMath } from 'react-katex';
// import MathView from 'react-native-math-view';
// import MathText from 'react-native-math';
// import theme from '../../theme/theme';
// import { TouchableOpacity } from 'react-native-gesture-handler';

// // const ecuacionRegex = /\[(.*?)\]/g; // para que modifique o vea solo lo de dentro del []

// /// estilo del katex
// const inlineStyle =`
//     html, body {
//         display: flex;
//         background-color: #fff;     
//         // height: 100%;
//         margin: 0;
//         padding: 0;
//         flex-wrap:wrap;
//         max-width: 600px;
//     }
//   .katex {
//     max-width: 600px;
//     display:flex;
//     flex-wrap:wrap;
//     font-size: 1.7em;
//     background-color:${theme.bground.bgPrimary};
//      /* Agrega margen entre los elementos KaTeX */
//      /* Agrega relleno entre los elementos KaTeX */
//     height:300px !important;
//     // width:500px !important;
//   }
// `;
// const inlineStyleRespuesta =`
//   .katex {
//     font-size: 2em;
//     display: inline;
//     background-color:${theme.bground.bgheaderBottom};
//     margin: 0.2em; /* Agrega margen entre los elementos KaTeX */
//     padding: 0.2em; /* Agrega relleno entre los elementos KaTeX */
//     height:50 !important;
//   }
// `;
// const inlineStyleRespuestaMarcada =`
//   .katex {
//     font-size: 1em;
//     display: inline;
//     background-color:${theme.bground.bgBoton};
//     color:'#fff';
//     margin: 0.2em; /* Agrega margen entre los elementos KaTeX */
//     padding: 0.2em; /* Agrega relleno entre los elementos KaTeX */
//     height:30 !important;
//   }
// `;
// const PruebaKatex = ({item,index}) => {
  
// //   const dato = "¿Cual\\  es\\ el\\ valor\\ de\\ \\sqrt{8}(\\sqrt{18}-\\sqrt{8})"
//   // const dato = "Si\\ log_2{(-2x + 3p)} = 3\\ y\\ log_3{x +2p} = 1\\ ¿Cual\\ es\\ el\\ valor\\ de\\ x-2p\\ ?"
//   const dato = "(4x por 1) cm y (x por 2) cm, [\\frac{63}{8}]cm.\\newline"
//   const texto = "Se necesita determinar el perímetro del rectángulo ABCD, cuyo largo y ancho miden "
//   //   const dato = "Se necesita determinar el perímetro del rectángulo ABCD, cuyo largo y ancho miden (4x por 1) cm y (x por 2) cm, respectivamente. Se sabe que ABCD es semejante a un rectángulo cuyo largo y ancho miden 10 cm y 8cm, respectivamente.[\\newline]Para determinar el perímetro del rectángulo ABCD se realiza el siguiente procedimiento, cometiéndose un error: [\\newline] Paso 1: como los rectángulos son semejantes se plantea la expresión: [\\frac{4x + 1}{8} = \\frac{x + 2}{10}\\newline] Paso 2: se resuelve la expresión anterior, obteniéndose [x = \\fraac{3}{16} \\newline]Paso 3: se reemplaza este valor de x en  cm, obteniéndose que el largo y el ancho del rectángulo son [\\frac{7}{4}]cm y [\\frac{35}{16}]cm, respectivamente.[\\newline]Paso 4: se calcula el perímetro del rectángulo obteniéndose [\\frac{63}{8}]cm.[\\newline]¿En cuál de los pasos se cometió el error?"
// //   const [marcada, setMarcada] = useState(false)


//   return (
//     <View style={styles.contenedor}>
//         <View style={styles.contenedor2}>
//             <Text>{texto}</Text>
//           <Katex 
//               expression={dato}
//               style={styles.katex}
//               inlineStyle={inlineStyle}
//           />
//         </View>
//           <Text>Hola</Text>
//           <Text>Hola</Text>
//           <Text>Hola</Text>
//     </View>
//   )   
// }

// export default PruebaKatex

// const styles = StyleSheet.create({
//   contenedor:{
//     // flex:1,
//     padding:5,
//     height:'100%',
//     display:'flex',
//     flexDirection:'column',
//   },
 
//   contenedor2:{
//     display:'flex',
//     width:'100%',
//     height:'20%',
//   },
//    katex: {
//     // flex:0,
//     margin:0,
//     width:600,
//     padding:0,
//   },
//   contenedorrespuesta:{
//     height:100,
//     width:350
//   },
//   boton:{
//     height:30,
//     width:'auto',
//   },
// })
