import { View, Text, Image, TextInput, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import {Paleta} from '../../constants/Colors'
import { useState } from 'react'
import { useContext } from 'react';
import { UserDetailContext} from '../../context/userDetailContext'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore';
import { useRouter} from 'expo-router'
import {auth, db} from '../../config/firebaseConfig'

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {userDetail, setUserDetail} = useContext(UserDetailContext)

  const onSignIn = async() =>{
     if (!email.trim() || !password.trim()) {
    ToastAndroid.show("Ingresa email y contraseña", ToastAndroid.BOTTOM);
    return;
  }
    setLoading(true);
    try{ 
      const resp = await signInWithEmailAndPassword (auth, email, password);
      const user = resp.user
      console.log("usuario logeado", user)
      await getUser();
      router.replace('/(tabs)/home')
    } catch(e) {
      console.log(e)
      ToastAndroid.show('Usuario o contraseña incorrectos', ToastAndroid.BOTTOM)
    } finally{
      setLoading(false);
    }
  };

  const getUser = async()=>{
    const result = await getDoc(doc(db,'user', email));
    console.log(result.data());
    setUserDetail(result.data())
  }

  return (
    <View style={{
      display: 'flex',
      alignItems: 'center',
      padding: 100, 
      flex: 1,
      backgroundColor: Paleta.fondo
    }}>
      <Image source={require('../../assets/images/logo2.png')} resizeMode='contain'
       style={{
        width: 350, 
      }}/>
      <Text style={{
        fontFamily: 'SerifRegular',
        fontSize: 30,
        marginTop: 20,
      }}>¡Bienvenido! </Text>

      <TextInput placeholder='e-mail' value={email} onChangeText={(value)=>setEmail(value)} style={styles.textInput}></TextInput>
      <TextInput placeholder='password' value={password} onChangeText={(value)=>setPassword(value)} secureTextEntry={true} style={styles.textInput}></TextInput>

      <TouchableOpacity onPress={onSignIn}
      disabled={loading}
      style={{
        padding: 10,
        width: '70%', 
        backgroundColor: Paleta.royalBlue,
        marginTop: 20,
        borderRadius: 10,
      }}>
        {!loading? <Text style={{
          fontFamily: 'SerifRegular',
          fontSize: 20, 
          textAlign: 'center',
          color: Paleta.fondo
        }}>
          Entrar
        </Text>:
        <ActivityIndicator size={'large'}/>
        }
      </TouchableOpacity>

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 5, 
        marginTop: 20, 
      }}>
        <Text style={{
          fontFamily: 'SerifText'
        }}>
          ¿No tienes una cuenta?
        </Text>
        <Pressable onPress={()=>router.push('/auth/signUp')}>
          <Text style={{
            fontFamily: 'SerifText',
            color: Paleta.navy
          }}> Registrate aquí</Text>
        </Pressable>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1, 
    width: '100%', 
    fontFamily: 'SerifText',
    fontSize: 18, 
    padding: 15, 
    marginTop: 20,
    borderRadius: 8
  }
})
