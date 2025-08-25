import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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

  const [dropDownOpen, setDropDownOpen] = useState(false);        
  const [selectedQuestionIndex, setselectedQuestionIndex] = useState (0);   

  if (!respuestas || respuestas.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No hay respuestas para mostrar</Text>
      </View>
    );
  }

  const handleSelectedQuestion = (index) => {
    //Cerrar el menu al elegir 
    setselectedQuestionIndex(index);
    setDropDownOpen(false); 
  }; 

  const renderAnswer = (respuesta) => {
    return (
      <View style={{
        marginVertical: 5,
        marginHorizontal: 5, 
      }}>
        {respuesta.opciones.map((opt, i)=>{
          const isCorrect = i === respuesta.correcta;
          const isSelected = i === respuesta.seleccionada;

          let backgroundColor = Paleta.fondo; 

          if (isCorrect) backgroundColor = Paleta.green;  
          if (isSelected && !isCorrect) backgroundColor = Paleta.red;
          
          return ( 
            <View key={i} style={{
              padding: 10, 
              borderRadius: 8,
              marginVertical: 2, 
              backgroundColor,
              width: 200,
              marginLeft: 20, 
            }}>
              <Text>{opt}</Text>
            </View>
          );
        })}
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
        flex: 0.4,
        margin: 20,
        padding: 25, 
        backgroundColor: Paleta.bluelight,  
        borderRadius: 35, 
        shadowColor: Paleta.lightGrey,
        shadowOffset: {width: 0, height: 4}, 
        shadowOpacity: 0.2,
        shadowRadius: 5, 
      }}>
        <HeaderScore/>
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <ScoreComponet />
        </View>
      </View>

       {/* Vista sin fondo azul (segunda mitad de pagina)*/}
    <View style={{
      flex: 0.6, 
      backgroundColor: Paleta.fondo, 
    }}>

       {/*Casillas de color para respuesta correcta o incorrecta */}
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

        {/*Dropdown de preguntas */}
      <View style={{display:'flex',
        marginTop: '30',
        alignItems: 'center',
      }}> 
        <TouchableOpacity 
        style={[styles.box, {alignSelf:'center', flexDirection:'row', alignItems: 'center', marginTop:15,}]}
        onPress={()=> setDropDownOpen(!dropDownOpen)}>
        <Text style={styles.boxText}> {selectedQuestionIndex !== null 
        ? `Pregunta ${selectedQuestionIndex +1}`: "Selecciona una pregunta"} </Text>
        <AntDesign name={dropDownOpen ? "caretup": "caretdown"} size={15} color="black"/>
        </TouchableOpacity>

       {/*Menu de preguntas */}
      {dropDownOpen && (
        <View style={{
          marginTop: 5,
          borderWidth: 1,
          borderColor: Paleta.grey, 
          borderRadius: 10,
          backgroundColor: Paleta.fondo, 
          width: 200,
        }}>
        <ScrollView style={{ maxHeight: 350 }}>
        {respuestas.map((_, index) => (
          <TouchableOpacity
          key={index}
          style={{padding: 10, 
          borderBottomWidth: index !== respuestas.length -1 ? 1 : 0, 
          borderBlockColor: Paleta.grey }}
          onPress={()=> handleSelectedQuestion(index)}>
            <Text style={{textAlign:'center'}}> Pregunta {index +1 } </Text>
          </TouchableOpacity>
        ))}
        </ScrollView>  
        </View>
      )}  
    </View> 

     {/*Mostrar la pregunta seleccionada*/}
     {selectedQuestionIndex !== null && (
      <View style={{
        margin: 20,
        padding: 25, 
        backgroundColor: Paleta.fondo,  
        borderRadius: 35, 
        shadowColor: Paleta.grey,
        shadowOffset: {width: 0, height: 4}, 
        shadowOpacity: 0.2,
        shadowRadius: 5,}}>
      <Text style={{
        fontFamily: 'SerifRegular', 
        fontSize: 20, 
        marginBottom: 5,
        alignSelf: 'center', 
      }}> {respuestas[selectedQuestionIndex].pregunta}
      </Text>
      {renderAnswer(respuestas[selectedQuestionIndex])}
      </View>
     )} 

    <View style={{flex: 1, alignContent:'center', justifyContent: 'center',}}>
      <TouchableOpacity style={{
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: 'center',
        width: 180,
        padding:5,
        borderWidth: 1,
        borderColor: Paleta.grey,
        borderRadius: 8,
        backgroundColor: Paleta.bluelight,
      }}>
        <Text style={{
          fontFamily: 'SerifRegular',
          fontSize: 18, 
          color: Paleta.black
        }} 
        onPress={()=>router.push('/(tabs)/home')}
        > Página de inicio </Text>
      </TouchableOpacity>
    </View>

    </View> 
    
  </View>
  );
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
  },

  boxText: {
    fontFamily: 'SerifRegular',
    fontSize: 25, 
    textAlign: 'center',
    marginRight: 5,
  },
  
})