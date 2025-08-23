import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Paleta } from '../../constants/Colors';
import HeaderScore from '../../components/preguntas/headerScore';
import ScoreComponet from '../../components/preguntas/scoreComponent';
import AntDesign from '@expo/vector-icons/AntDesign';
import { UserDetailContext } from '../../context/userDetailContext';
import { useContext } from 'react';
import { useRouter } from 'expo-router';
import { useState } from 'react';


export default function Score() {

  const router = useRouter();
  const {userDetail, setUserDetail,
          selectedTopic, setSelectedTopic,
          numPreguntas, setNumPreguntas, 
          currentPregunta, setCurrentPregunta,
          score, setScore,
          respuestas, setRespuestas} = useContext(UserDetailContext);  

  const [selectedOption, setSelectedOption] = useState(null);   
  const [showCorrect, setShowCorrect] = useState(false);

  if (!respuestas || respuestas.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No hay respuestas para mostrar</Text>
      </View>
    );
  }

  return (
    <View style={{
        flex: 1, 
        backgroundColor: Paleta.fondo, 
        justifyContent: 'center', 
    }}>
      <View style={{
        flex: 0.5,
        margin: 20,
        padding: 25, 
        backgroundColor: Paleta.bluelight,  
        borderRadius: 35, 
        shadowColor: Paleta.lightGrey,
        shadowOffset: {width: 0, height: 4}, 
        shadowOpacity: 0.2,
        shadowRadius: 5, 
      }}>
        <HeaderScore />
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <ScoreComponet />
        </View>
      </View>
    <View style={{
      flex: 0.5, 
      backgroundColor: Paleta.fondo, 
    }}>
      <View style={{display: 'flex', flexDirection: 'row', marginLeft: 35}}>
        <View style={[styles.checkbox, {backgroundColor:Paleta.green}]}/>
        <Text style={{
          fontFamily: 'SerifText',
          fontSize: 15, 
          marginLeft: 5,
        }}> Respuesta correcta </Text>
        <View style={[styles.checkbox, {backgroundColor: Paleta.red}, {marginLeft: 10}]}/>
        <Text style={{
          fontFamily: 'SerifText',
          fontSize: 15, 
          marginLeft: 5,
        }}> Respuesta incorrecta </Text>
      </View>

      <View style={{display:'flex',
        marginTop: '30',
      }}>
        <TouchableOpacity style={[styles.box, {alignSelf:'center', flexDirection:'row', alignItems: 'center'}]}>
        <Text style={{
          fontFamily: 'SerifRegular',
          fontSize: 25, 
          textAlign: 'center',
          marginRight: 5,
        }}> Pregunta </Text>
        <AntDesign name="caretdown" size={15} color="black"/>
        </TouchableOpacity>
      </View>  

      <View style={{display: 'flex', marginTop: 20,}}>
         <Text> Aquí va la pregunta 1 o seleccionada </Text> 

      </View>

    </View> 

    </View>
  )
}

const styles = StyleSheet.create({
 checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: Paleta.grey,
    borderRadius: 4,
  },
  
  box: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderColor: Paleta.grey,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: 20,
  },
  
})