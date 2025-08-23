import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { UserDetailContext } from '../../context/userDetailContext';
import { useEffect } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Header() {
    const {userDetail, setUserDetail} = useContext(UserDetailContext)
    useEffect(() => {
    console.log("User Detail desde Header:", userDetail);
  }, [userDetail]);

  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }}>
      <View> 
      <Text style={{
        fontFamily: 'Lobster',
        fontSize: 25,
        marginTop:30,
        marginLeft: 25,
      }}> Hello, {userDetail?.name}</Text>
      <Text style={{
        fontFamily: 'SerifRegular',
        fontSize: 17,
        marginLeft: 25,
      }}> ¡Empecemos! </Text> 
      </View> 
    </View>
  )
}