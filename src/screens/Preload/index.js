/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Container, Image } from './styles';
import { CommonActions } from '@react-navigation/native';
import { AuthUserContext } from '../../context/AuthUserProvider';
import {COLORS} from '../../assets/colors';

const Preload = ({ navigation }) => {
  const { retrieveUserSession, signIn } = useContext(AuthUserContext);

  const entrar = async () => {
    const userSession = await retrieveUserSession();

    if (
      userSession &&
      (await signIn(userSession.email, userSession.senha)) === 'ok'
    ) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'AppStack' }],
        }),
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        }),
      );
    }
  };


  useEffect(() => {
    navigation.setOptions({
      // headerLeft: false,
      headerTitleAlign: 'center',
      title: 'Carregando',
      headerStyle: { backgroundColor: COLORS.primaryDark },
      headerTintColor: { color: COLORS.black },
    });
    entrar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    entrar();
  }, []);

  return (
    <Container>
      <Image
        source={require('../../assets/images/logo.png')}
        accessibilityLabel="logo do app"
      />
    </Container>
  );
};

export default Preload;
