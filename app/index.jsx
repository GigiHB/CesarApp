import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {Paleta} from '@/constants/Colors'
import { StyleSheet } from 'react-native'
import {useRouter} from "expo-router"

export default function Index() {
    const router = useRouter()
    
  return (
    <View style={{
        flex: 1, 
        backgroundColor: Paleta.fondo, 
        overflow: 'hidden',
        height: 250, 
        }}>
      <Image
        source={require("./../assets/images/book.png")}
        resizeMode = 'contain'
        style={{
          width: "100%",
          height: 200,
          marginTop: 40,
        }}/>  
        <View
        style={{
            padding: 25, 
            backgroundColor: Paleta.fondo,
            height: '100%', 
        }}>
         <Text style={{
            fontFamily: 'SerifRegular',
            fontSize: 30,
            textAlign: "center",
            color: Paleta.navy,
            marginTop: 40,
          }} > Guía práctica para tu examen de educación media y superior 
          </Text>
          <Text
          style={{
            fontSize: 20,
            fontFamily: 'SerifText',
            textAlign: "center",
            color: Paleta.navy,
            marginTop: 20,
          }}
        >
          ¡Comienza ahora!
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/signUp")}
        >
          <Text style={styles.buttonText}> Crea una cuenta </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={()=> router.push("/auth/signIn")}>
          <Text style={styles.buttonText}> Ya tengo una cuenta </Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    backgroundColor: Paleta.royalBlue,
    marginTop: 40,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: 'SerifText'
  },
});