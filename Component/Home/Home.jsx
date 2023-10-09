import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
// import theme from "../../theme/theme";
import { useContext } from "react";
import ModoDark from "../../ModoDark";

// navigation.navigate = para navegar entre los componentes se envia como props.

const Home = ({ navigation }) => {

  const {theme} = useContext(ModoDark)

  return (
    <View style={[styles.container, {backgroundColor: theme.bground.bgPrimary,}]}>
      <View>
        <Image
          source={require("../../assets/educator.png")}
          style={styles.imagen}
        />
      </View>
      <View>
        <Image source={require("../../assets/Logo.png")} style={styles.logo} />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.bground.bgInputsPrimary },
          ]}
          onPress={() => {
            navigation.navigate("Log");
          }}
        >
          <Text style={[styles.text, 
          { color: theme.colors.textPrimary }
          ]}>
            Iniciar Sesión
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: 
              theme.bground.bgSecondary 
             
            },
          ]}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={[styles.text, { 
            color: theme.colors.textSecondary 
          }
            ]}>
            Registrarse
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('SesionInvitado')}>
          <Text style={[styles.text, { 
            color: 
            theme.colors.textbottom,  
    
            }]}>
            Seguir como invitado!
          </Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default Home;

// estilos del componente
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "99%",
  },

  imagen: {
    width: 349,
    height: 215,
    borderRadius: 10,
  },
  logo: {
    width: 250,
    height: 130,
  },
  buttons: {
    flexDirection: "column",
    width: "80%",
    alignItems:'center'
  },
  button: {
    width: 309,
    height: 45,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
  },
});


// prettier ctrl + alt + f