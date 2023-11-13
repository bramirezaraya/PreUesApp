import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const RenderAvatar = ({setAvatarElegido, item, avatarElegido, index, theme }) => {
  return (
      <View style={{display:'flex', margin:10, marginRight:30, justifyContent:'center'}}>
            <View style={{gap:10, display:'flex', flexDirection:'column', width:'100%'}}>
                <Image source={item.img} style={{width:64, height:64}}/>
                {item.name === avatarElegido ?  
                (<Image style={{width:30, height:30}} source={require('../../assets/check.png')}/>) 
                :(<TouchableOpacity onPress={() => {setAvatarElegido(item.name)}}>
                    <Image style={{width:30, height:30}} source={require('../../assets/add.png')} />
                    </TouchableOpacity> ) 
                }
            </View>       
        </View>
  )
}

export default RenderAvatar

const styles = StyleSheet.create({})