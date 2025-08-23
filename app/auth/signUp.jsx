import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { auth, db } from '../../config/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {useRouter} from 'expo-router'
import { useState } from 'react';
import { doc, setDoc } from '@firebase/firestore';
import {UserDetailContext} from '../../context/userDetailContext'
import {useContext } from 'react';
import {Paleta} from '../../constants/Colors'

export default function SignUp() {
  const router = useRouter('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {userDetail, setUserDetail} = useContext(UserDetailContext)

  const CrearCuentaNueva = ()=>{
    createUserWithEmailAndPassword(auth, email, password).then(async(resp)=>{
      const user = resp.user;
      console.log(user);
      await SaveUser(user);
    })
    .catch(e=>{
      console.log(e.message)
    })
  }
  //Guarda el usuario
  const SaveUser = async (user)=>{
    const data = {
      name: fullName,
      email: email,
      member: false,
      uid: user?.uid 
    }

    //Para que navegue a la pagina 
    await setDoc(doc(db, 'user', email,), data)
    setUserDetail(data)
    router.push('/(tabs)/home')
  }

  return (
    <View style={{
        display:'flex',
        alignItems: 'center',
        paddingTop: 100,
        flex: 1,
        padding: 25,
    }}>
    <Image source={require('./../../assets/images/logo1.png')}
    resizeMode='contain'
    style={{
      marginTop: 40,
      width: 300, 
    }}/>
    <Text style={{
      fontFamily: 'SerifRegular',
      fontSize: 30, 
      marginTop: 20,
    }}>
      Crea un cuenta: 
    </Text>

    <TextInput placeholder = 'Nombre completo' onChangeText = {(value)=>setFullName(value)} style={styles.textInput}></TextInput>
    <TextInput placeholder = 'e-mail' onChangeText = {(value)=>setEmail(value)} style={styles.textInput}></TextInput>
    <TextInput placeholder = 'Contraseña' onChangeText = {(value)=>setPassword(value)} secureTextEntry={true} style={styles.textInput}></TextInput>

    <TouchableOpacity 
    onPress={CrearCuentaNueva}
    style={{
      padding: 15,
      backgroundColor: Paleta.royalBlue, 
      width: '70%', 
      borderRadius: 10,  
      marginTop: 20 
    }}> 
      <Text 
        style= {{
          fontFamily: 'SerifRegular',
          fontSize: 20, 
          color: Paleta.fondo, 
          textAlign: 'center',
       }}
    >Crear</Text>
    </TouchableOpacity>

       <View style = {{
        display: 'flex',
        flexDirection : 'row',
        gap: 5, 
        marginTop: 20, 
       }} 
       >
        <Text style={{
          fontFamily: 'SerifText', 
        }}> ¿Ya tienes una cuenta?</Text>
        <Pressable 
        onPress={()=> router.push('/auth/signIn')}>
          <Text style={{
            color: Paleta.black, 
            fontFamily: 'SerifText'
          }}> Inicia sesión aquí </Text> 
        </Pressable>
       </View>

    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1, 
    width: '100%',
    padding: 15,
    fontSize: 18,
    marginTop:20, 
    borderRadius: 8,
  }
})