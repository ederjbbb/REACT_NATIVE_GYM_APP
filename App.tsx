import { AuthContext, AuthContextProvider } from './src/contexts/AuthContext';
import {Roboto_400Regular, Roboto_700Bold, useFonts} from '@expo-google-fonts/roboto'

import { Loading } from './src/components/Loading';
import { NativeBaseProvider } from "native-base";
import React from 'react';
import { Routes } from './src/routes';
import { SignUp } from './src/screens/SignUp';
import { StatusBar } from 'react-native';
import {THEME} from './src/theme';
import { UserDTO } from './src/dtos/UserDTO';

export default function App() {
   
    const [fontsLoaded] = useFonts({
      Roboto_400Regular,
      Roboto_700Bold
    });
  return (
    
       <NativeBaseProvider theme={THEME} >
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <AuthContextProvider>
      { fontsLoaded ? <Routes/> : <Loading/>}
      </AuthContextProvider>
      
      
    </NativeBaseProvider>
    
    
   
  );
}


