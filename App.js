import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import ForgotPassword from './src/screens/ForgotPassword';
import { COLORS } from './src/assets/colors';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor= {COLORS.primaryDark} />
      <Stack.Navigator initialRouteName='SignIn'>
        <Stack.Screen name="SignIn" component={SignIn} options={SignInStyle}/>
        <Stack.Screen name="Home" component={Home} options={HomeStyle} />
        <Stack.Screen name="SignUp" component={SignUp}options={SignUpStyle} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={ForgotPasswordStyle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const SignInStyle = {
  // headerLeft: false,
  headerTitleAlign: 'center',
  title: 'Bem Vindo',
  headerStyle: { backgroundColor: COLORS.secundary },
  headerTitleStyle: { color: COLORS.primaryDark },
};
const SignUpStyle = {
  // headerLeft: false,
  headerTitleAlign: 'center',
  title: 'Cadastre-se',
  headerStyle: { backgroundColor: COLORS.secundary },
  headerTitleStyle: { color: COLORS.primaryDark },
  headerTintColor: COLORS.primaryDark,
};
const ForgotPasswordStyle = {
  headerTitleAlign: 'center',
  title: 'Esqueceu a Senha',
  headerStyle: { backgroundColor: COLORS.secundary },
  headerTitleStyle: { color: COLORS.primaryDark },
  headerTintColor: COLORS.primaryDark,
}
const HomeStyle = {
  headerTitleAlign: 'center',
  title: 'GERENCIA LIVROS',
  headerStyle: { backgroundColor: COLORS.secundary },
  headerTitleStyle: { color: COLORS.primaryDark },
}