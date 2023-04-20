/* eslint-disable no-shadow */
import React, {useEffect, useContext, useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import {LivrosContext} from '../../context/LivrosProvider';
import {Image} from '../Preload/styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';

import {CommonActions} from '@react-navigation/native';
import SearchBar from '../../components/SearchBar';

const Livros = ({navigation}) => {
  const {Livros} = useContext(LivrosContext);
  const [LivrosTemp, setLivrosTemp] = useState('');

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
  const filterLivro = text => {
    console.log(text);
    let filtro = [];

    Livros.filter(livro => {
      if (livro.nome.toLowerCase().includes(text.toLowerCase())) {
        console.log(livro);
        filtro.push(livro);
      }
    });
    console.log("filtro");
    console.log(filtro);

    if (filtro.length > 0) {
      setLivrosTemp(filtro);
    } else {
      setLivrosTemp([]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar search={filterLivro} />

      <Image
        source={require('../../assets/images/logo.png')}
        accessibilityLabel="logo do app"
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Text style={styles.texto}> Coleções dos Livros </Text>
        <View style={styles.container}>
          {console.log(LivrosTemp)}
          {LivrosTemp.lenght > 0
            ? LivrosTemp.map((valor, key) => {
                return (
                  <Item
                    item={valor}
                    onPress={() => routeLivro(valor)}
                    key={key}
                  />
                );
              })
            : Livros.map((valor, key) => {
                return (
                  <Item
                    item={valor}
                    onPress={() => routeLivro(valor)}
                    key={key}
                  />
                );
              })}
        </View>
      </ScrollView>
      {/* {loading && <Loading />} */}
      <AddFloatButton onClick={() => routeLivro(null)} />
    </SafeAreaView>
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
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: COLORS.primaryDark,
  },
  logout: {
    backgroundColor: COLORS.red,
  },
});
