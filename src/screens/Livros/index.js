/* eslint-disable no-shadow */
import React, {useEffect, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import {LivrosContext} from '../../context/LivrosProvider';
import {Image} from '../Preload/styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';

import {CommonActions} from '@react-navigation/native';

const Livros = ({navigation}) => {
  const {Livros} = useContext(LivrosContext);

  useEffect(() => {
    navigation.setOptions({
      // headerLeft: false,
      headerTitleAlign: 'center',
      // name: 'GERENCIA LIVROS',
      title: 'BIBLIOTECA // LIVROS', // deixei a name pq senao muda o nome da tab
      headerStyle: {backgroundColor: COLORS.primaryDark},
      headerTintColor: {color: COLORS.black},
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <LogoutButton />,
    });
    console.log(Livros);
  }, [Livros, navigation]);

  const routeLivro = item => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Livro',
        params: {value: item},
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        accessibilityLabel="logo do app"
      />
      <Text style={styles.texto} />
      {Livros.map((valor, key) => {
        return (
          <Item item={valor} onPress={() => routeLivro(valor)} key={key} />
        );
      })}

      <AddFloatButton onClick={() => routeLivro(null)} />
    </View>
  );
};

export default Livros;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 50,
    color: COLORS.primaryDark,
  },
  logout: {
    backgroundColor: COLORS.red,
  },
});
