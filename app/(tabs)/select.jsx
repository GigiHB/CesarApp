import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable} from 'react-native'
import {Paleta} from "@/constants/Colors"
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useContext, useState } from 'react'
import { useRouter } from 'expo-router';
import { UserDetailContext } from '../../context/userDetailContext'



export default function Select() {
    const router = useRouter();
    const options = [10, 20, 30, 40, 50, 75, 100]
    const {userDetail, setUserDetail, 
      selectedTopic, setSelectedTopic, 
      numPreguntas, setNumPreguntas} = useContext(UserDetailContext)
    const [selected, setSelected] = useState(null);
    const TotalPreguntas = numPreguntas; 


  return (
    <View style={{ 
        flex: 1,
        borderRadius: 8,
        borderWidth: 5,
        borderColor: Paleta.lightGrey,
        height: 250,
        backgroundColor: Paleta.fondo
    }}>
    <View style={{
        display: 'flex',
        flexDirection: 'row'
    }}>
    <TouchableOpacity style={{
        marginTop: 46, 
        marginLeft: 10,
    }} onPress={()=>router.push('/(tabs)/home')}> 
        <AntDesign name="left" size={30} color="black" />
    </TouchableOpacity>  
        <Text style={{
            marginTop: 40, 
            fontFamily: 'SerifRegular',
            fontSize: 30,  
        }}> Preguntas </Text>
        <Entypo name="open-book" size={55} color="black" style={{
            marginTop: 25, 
            marginLeft: 140,
        }}
        />  
      </View>

      <Text style={{
        marginLeft: 10,
        marginTop: 10, 
        fontFamily: 'SerifText',
        fontSize: 15,
        color: Paleta.grey,
      }}> Selecciona el número de preguntas</Text>
      
    <View style={styles.container}> 
    {options.map((num)=> (
    <TouchableOpacity 
    key={num}
    style={[styles.box, selected === num && styles.boxSelected]} 
    onPress={()=> setSelected(num)}
    activeOpacity={0.8}> 
     <View
          style={[
            styles.checkbox,
            { backgroundColor: selected === num ? Paleta.royalBlue : "#fff" },
          ]}
        />
     <Text style={styles.buttonText}> {num} preguntas </Text> 
      </TouchableOpacity>
      ))} 
    </View>

      <View style={{
        alignItems: 'center',
        marginTop: 40,
      }}>
      <TouchableOpacity style={styles.button} 
      onPress={()=>{
        if (selected) {
          setNumPreguntas(selected);
          router.push(`/preguntas/${selected}preg`);}
          else {
            alert("Selecciona el número de preguntas");
          }
        }
      }> 
        <Text style={{
          textAlign: 'center', 
          fontFamily: 'SerifRegular',
          fontSize: 18, 
        }}> Siguiente </Text>
      </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
container: { 
    display: 'flex',
    padding: 25, 
    marginTop: 20,

},
  button: {
    padding: 10,
    backgroundColor: Paleta.blueBox,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Paleta.grey,
    width: 200,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'SerifRegular',  
  },

    box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 250,
    padding: 15,
    borderWidth: 2,
    borderColor: Paleta.grey,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginTop: 20,
  },

   boxSelected: {
    borderColor: Paleta.royalBlue,
    backgroundColor: "#f0f8ff",
  },

   checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: Paleta.grey,
    borderRadius: 4,
  },
});