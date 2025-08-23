import { View, Text } from 'react-native'
import { UserDetailContext } from '../../context/userDetailContext';
import React, { useContext } from 'react'

export default function Progressbar() {
    const {userDetail, setUserDetail,
        selectedTopic, setSelectedTopic,
        numPreguntas, setNumPreguntas, 
        currentPregunta, setCurrentPregunta} = useContext(UserDetailContext)

    const progress = numPreguntas > 0 ? (currentPregunta/numPreguntas) *100: 0;

  return (
    <View style ={{
        marginTop: 5,
        marginHorizontal: 30, 
    }}>

      <Text style={{
        marginBottom: 10, 
      }}> Pregunta {currentPregunta +1 } de {numPreguntas}</Text>
          <View
        style={{
          height: 10,
          width: "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: 5,
        }}
      >
        <View
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#3b82f6",
            borderRadius: 5,
          }}
        />
      </View>
    </View>
  )
}