import { View, Text, TouchableOpacity, } from 'react-native'
import {Paleta} from '../../constants/Colors'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react'
import { useRouter } from 'expo-router';
import { UserDetailContext } from '../../context/userDetailContext';
import { useContext } from 'react';
import { useEffect } from 'react';

export default function HeaderScore() {
  const router = useRouter();
  const {userDetail, setUserDetail} = useContext(UserDetailContext)
      useEffect(() => {
      console.log("User Detail desde Header:", userDetail);
    }, [userDetail]);

  return (
    <View style={{
      marginTop: 5,
      paddingBottom: 10, 
    }}>
    <View style={{
        display: 'flex',
    }}> 
        <Entypo name="open-book" size={55} color="black" style={{
            marginTop: 20, 
            marginLeft: 140,
        }}
        />  
        <Text style={{
            fontFamily: 'SerifText',
            textAlign: 'center', 
            fontSize: 30,
            marginTop: 20
        }}> ¡Buen trabajo {userDetail?.name}!
        </Text>
        <Text style={{
            marginTop: 10, 
            fontFamily: 'SerifRegular',
            fontSize: 35,
            textAlign: 'center'
        }}> Resultado: </Text> 
      </View>
    </View>
  )
}