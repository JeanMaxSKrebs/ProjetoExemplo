import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './src/screens/SignIn/index';
import Home from './src/screens/Home';
import Preload from './src/screens/Preload/index';
import SignUp from './src/screens/SignUp/index';
import ForgotPassword from './src/screens/ForgotPassword';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { COLORS } from './src/assets/colors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen component={Preload} name="Preload" />
    <Stack.Screen component={SignIn} name="SignIn" options={SignIn} />
    <Stack.Screen component={SignUp} name="SignUp" options={SignUp} />
    <Stack.Screen component={ForgotPassword} name="ForgotPassword" options={ForgotPasswordStyle} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Tab.Navigator
      initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen component={Home} name="Home" options={Home}/>
    {/* <Tab.Screen component={Livros} name="Livros" /> */}
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
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

const PreloadStyle = {
  headerTitleAlign: 'center',
  title: 'GERENCIA LIVROS',
  headerStyle: { backgroundColor: COLORS.secundary },
  headerTitleStyle: { color: COLORS.primaryDark },
}
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