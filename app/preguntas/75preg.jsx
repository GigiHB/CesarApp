import { View, Text, TouchableOpacity, } from 'react-native'
import {Paleta} from '../../constants/Colors'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import HeaderP from '../../components/preguntas/headerP'
import Progressbar from '../../components/preguntas/progressbar';
import { UserDetailContext } from '../../context/userDetailContext';
import {Preguntas} from '../../components/preguntas/preguntas';
import { useEffect } from 'react';

export default function SetentayCincoPreguntas() {

  const router = useRouter();
  const {userDetail, setUserDetail,
          selectedTopic, setSelectedTopic,
          numPreguntas, setNumPreguntas, 
          currentPregunta, setCurrentPregunta,
          score, setScore, 
          respuestas, setRespuestas} = useContext(UserDetailContext);
  const [selectedOption, setSelectedOption] = useState(null);   
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [showCorrect, setShowCorrect] = useState(false);
  


  const preguntasTopic = Preguntas.filter((p) => p.topic === selectedTopic);
  const preguntaActual = preguntasTopic[currentIndex]

  // reinicia conteo al cargar quiz nuevo
  useEffect(() => {
  setCurrentIndex(0);
  setCurrentPregunta(0);
  setScore(0);
  setSelectedOption(null);
}, [selectedTopic]);

   const handleSelectAnswer = (index) => {
    if (!showCorrect) setSelectedOption(index);
  };

  //Cambiar a la siguiente pregunta
    const goNext = ()=> {
      setShowCorrect(false)
      if (currentIndex < numPreguntas -1){
      setCurrentIndex(prev => prev + 1);
      setCurrentPregunta(prev => prev + 1);
      setSelectedOption(null); // limpia selección
     } else {
        console.log("Terminaste el test");
        router.push('/preguntas/score')
    }
  };

  const handleNext = ()=> {
    if (selectedOption === null){
      alert("Selecciona una respuesta")
      return;
    } 

    //Guardar las repsuestas
    setRespuestas((prev)=>[
      ...prev,
      {
        id:preguntaActual.id, 
        pregunta: preguntaActual.Preg,
        opciones: preguntaActual.opciones,
        correcta: preguntaActual.respuesta, 
        seleccionada: selectedOption,
      },
    ]);

      //Verificar respuesta y registra la puntuacion 
    if (selectedOption === preguntaActual.respuesta) {
      setScore((prev)=>prev + 1);
      goNext();
    } else { 
      setShowCorrect(true)
    }};

  return (
    <View style={{
      flex: 1,
      backgroundColor: Paleta.fondo,
    }}>
      <HeaderP />
      <Progressbar/>

      <View style={{
        flex: 1, 
        justifyContent: 'center', 
        paddingHorizontal: 20, 
      }}>
        <Text style={{
          fontFamily: 'SerifRegular',
          textAlign: 'center', 
          marginBottom: 20, 
          fontSize: 30, 
        }}> {preguntaActual.Preg}</Text>

        
      {preguntaActual.opciones.map((opcion, index)=>{
        let bgColor = Paleta.witheBox;
        let texColor = Paleta.black; 

        if (showCorrect){
          if (index === preguntaActual.respuesta) bgColor = Paleta.green; //correcta
          if (index === selectedOption && selectedOption !== preguntaActual.respuesta) bgColor = Paleta.red; //incorrecta
          texColor = Paleta.black; 
        } else { 
          if (selectedOption === index){
            bgColor = Paleta.blueBox; 
            texColor = Paleta.witheBox;
          }
        }
      return (
      <TouchableOpacity 
      key={index}
      style={{
        padding: 15,
        marginVertical: 5,
        backgroundColor: bgColor,
        borderWidth: 1,
        borderColor: Paleta.grey, 
        borderRadius: 8, 
      }}
      disabled={showCorrect}// se desactiva si se muestra la respuesta correcta
      onPress={()=> handleSelectAnswer(index)}
      > 
        <Text style={{color: texColor}}>
          {opcion}
        </Text>
      </TouchableOpacity>
      );
    })}

       <TouchableOpacity style={{
        marginTop: 25, 
        backgroundColor: Paleta.royalBlue, 
        padding: 15, 
        borderRadius: 8, 
       }}
       onPress={showCorrect ? goNext:handleNext}>
        <Text style={{
          textAlign: 'center',
          color: Paleta.witheBox,
          fontFamily: 'SerifRegular', 
          fontSize: 18, 
        }}>
          Siguiente
        </Text>
       </TouchableOpacity>

      </View>

    </View>
  );
}