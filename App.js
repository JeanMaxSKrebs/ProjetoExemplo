import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './src/screens/SignIn';
import Home from './src/screens/Home';
import Preload from './src/screens/Preload';
import SignUp from './src/screens/SignUp';
import ForgotPassword from './src/screens/ForgotPassword';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Ionicons";

import { COLORS } from './src/assets/colors';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: true,
    }}>
    <Stack.Screen component={Preload} name="Preload" />
    <Stack.Screen component={SignIn} name="SignIn" options={SignInStyle} />
    <Stack.Screen component={SignUp} name="SignUp" options={SignUpStyle} />
    <Stack.Screen component={ForgotPassword} name="ForgotPassword" options={ForgotPasswordStyle} />
  </Stack.Navigator>
);



const AppStack = () => (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
      }}>
      <Tab.Screen component={Home} name="Home" options={{
        tabBarLabel: "Home",
        tabBarIcon: () => (
          <Icon name="library" color={COLORS.primaryDark}></Icon>
        ),
      }} 
      />
      <Tab.Screen component={Home} name="Teste" />
    </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <StatusBar backgroundColor={COLORS.primary} />
    <Stack.Navigator
      initialRouteName="AuthStack"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen component={AuthStack} name="AuthStack" />
      <Stack.Screen component={AppStack} name="AppStack" />
    </Stack.Navigator>
  </NavigationContainer>
);


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