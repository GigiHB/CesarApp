import { View, Text, TouchableOpacity, } from 'react-native'
import {Paleta} from '../../constants/Colors'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react'
import { useRouter } from 'expo-router';
import { UserDetailContext } from '../../context/userDetailContext';
import { useContext } from 'react';

export default function HeaderP() {
  const router = useRouter();
  const {userDetail, setUserDetail, selectedTopic, setSelectedTopic} = useContext(UserDetailContext);

  return (
    <View style={{
      marginTop: 5,
      paddingBottom: 10, 
      backgroundColor: Paleta.fondo,
    }}>

    <View style={{
        display: 'flex',
        flexDirection: 'row'
    }}>
    <TouchableOpacity style={{
        marginTop: 25, 
        marginLeft: 10,
    }} onPress={()=>router.push('/(tabs)/select')}> 
        <AntDesign name="left" size={30} color="black" />
    </TouchableOpacity>  
        <Text style={{
            marginTop: 20, 
            fontFamily: 'SerifRegular',
            fontSize: 30,  
        }}> {selectedTopic} </Text> 
        <Entypo name="open-book" size={55} color="black" style={{
            marginTop: 20, 
            marginLeft: 140,
        }}
        />  
      </View>
    </View>
  )
}