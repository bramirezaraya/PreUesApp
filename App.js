import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navegacion from './Navegacion';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler'
export default function App() {

  return (
    <NavigationContainer> 
      <Navegacion/>
    </NavigationContainer>
     
  );
}

const styles = StyleSheet.create({

});
