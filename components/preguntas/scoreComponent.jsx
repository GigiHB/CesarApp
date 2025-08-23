import { View, Text, Animated, Easing, } from 'react-native';
import { UserDetailContext } from '../../context/userDetailContext';
import Svg, {Circle} from "react-native-svg";
import React, {use, useContext, useEffect, useRef} from 'react'
import { Paleta } from '../../constants/Colors';

export default function ScoreComponet() {
    const {score, numPreguntas} = useContext(UserDetailContext); 
    const percentage = numPreguntas > 0 ? (score/numPreguntas)*100 : 0; 

    //circulo
    const radius = 60;
    const strokeWidth = 10; 
    const circunferencia = 2*Math.PI*radius; 

    //animacion
    const animatedValue = useRef(new Animated.Value(0)).current; 
    const strokeDashoffset = animatedValue.interpolate({
        inputRange: [0,100],
        outputRange: [circunferencia, 0]
    });

    useEffect(()=>{
        Animated.timing(animatedValue, {
            toValue: percentage,
            duration: 1000, 
            easing: Easing.out(Easing.ease), 
            useNativeDriver: true, 
        }).start();
    }, [percentage]);

  return (
    <View style={{
        alignItems: 'center', 
        justifyContent: 'center', 
    }}>
      <Svg width={160} height={160}>
        <Circle 
            stroke={Paleta.witheBox}
            fill="none"
            cx = {80}
            cy = {80}
            r = {radius}
            strokeWidth = {strokeWidth}
        />
        <AnimatedCircle
        stroke = {Paleta.blueBox}
        fill = "none"
        cx = {80}
        cy = {80}
        r = {radius}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circunferencia}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        />
        </Svg>
        <View style={{
            position: 'absolute',
            alignItems: 'center', 
            alignContent: 'center'
        }}> 
        <Text style={{
            fontFamily: 'SerifRegular',
            fontSize: 28, 
            fontWeight: 'bold', 
            textAlign: 'center',
        }}> 
            {`${Math.round(percentage)}%`}</Text>     
        </View>
                <View style={{ alignContent:'center', alignItems: 'center', marginTop: 10}}>
        <Text style={{
            fontSize: 16,
            fontFamily: 'SerifText',
        }}>
        Respondiste correctamente {score} de {numPreguntas} preguntas
        </Text>
        </View>
    </View >
  )
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);