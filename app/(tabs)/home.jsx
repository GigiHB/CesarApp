import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {Paleta} from "@/constants/Colors"
import {useRouter} from 'expo-router'
import Header from '../../components/home/header'
import { UserDetailContext } from '../../context/userDetailContext'
import React, { useContext } from 'react'

export default function Home() {
  const router = useRouter();
  const {userDetail, setUserDetail, 
    selectedTopic, setSelectedTopic,} = useContext(UserDetailContext);
  const topics = ["Español", "Matemáticas", "Historia", "Física", "Geografía",]
  return (

    <View style={{
        flex: 1,
        height: 250,
        overflow: "hidden",
        backgroundColor: Paleta.fondo,
      }}>
        <Header />
        <Image 
        resizeMode='contain'
        source={require('../../assets/images/selecciona.png')}
        style={{
          marginTop: 20,
          height: 300,
          width: '100%',
        }}/>
        <View style={{
        height: '100%', 
        borderRadius: 10, 
        padding: 25
        }} >
         {topics.map((topic)=>(
        <TouchableOpacity 
        key={topic}
        style = {styles.button}
        onPress={()=> {
          setSelectedTopic(topic); 
          router.push('/(tabs)/select')
        }}> 
          <Text style={styles.buttonText}> {topic} </Text>
        </TouchableOpacity>
           ))}
        </View>
    </View>

  )
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Paleta.bluelight,
    marginTop: 30,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: 'SerifText'
  },
});