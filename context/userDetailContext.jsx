import React, { createContext, useState } from "react";

export const UserDetailContext = createContext();

export function UserDetailProvider({ children }) {
  const [userDetail, setUserDetail] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [numPreguntas, setNumPreguntas] =useState(null);
  const [currentPregunta, setCurrentPregunta] = useState(null);
  const [score, setScore] = useState(0);
  const [respuestas, setRespuestas] = useState([]);

  return (
    <UserDetailContext.Provider value={{
      userDetail, setUserDetail,
      selectedTopic, setSelectedTopic, 
      numPreguntas, setNumPreguntas,
      currentPregunta, setCurrentPregunta,
      score, setScore,
      respuestas, setRespuestas,
    }}>
      {children}
    </UserDetailContext.Provider>
  );
}