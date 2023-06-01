import React, { useEffect, useContext, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import MeuButton from '../../components/MeuButton';
import { LivrosContext } from '../../context/LivrosProvider';
import { Image } from '../Preload/styles';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import { Container, FlatList } from './styles';

import { CommonActions } from '@react-navigation/native';
import SearchBar from '../../components/SearchBar';

import { EstantesContext } from '../../context/EstantesProvider';

const Livros = ({ navigation }) => {
  const { livros, getLivros} = useContext(LivrosContext);
  const [livrosTemp, setLivrosTemp] = useState([]);
  const { atualizarContador } = useContext(EstantesContext);

  useEffect(() => {
    navigation.setOptions({
      // headerLeft: false,
      headerTitleAlign: 'center',
      // name: 'GERENCIA LIVROS',
      title: 'BIBLIOTECA // LIVROS', // deixei a name pq senao muda o nome da tab
      headerStyle: { backgroundColor: COLORS.primaryDark },
      headerTintColor: { color: COLORS.black },
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <LogoutButton />,
    });
    getLivros();
  }, [navigation]);


  const routeLivro = item => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Livro',
        params: { value: item },
      }),
    );
  };
  const filterLivro = text => {
    // console.log(text);
    let filtro = [];
    livros.filter(livro => {
      if (livro.nome.toLowerCase().includes(text.toLowerCase())) {
        filtro.push(livro);
      }
    });
    // console.log('filtro');
    // console.log(filtro);
    // console.log(filtro.length);
    if (filtro.length > 0) {
      setLivrosTemp(filtro);
      // console.log(filtro.length);
    } else {
      setLivrosTemp([]);
    }
  };

  const renderItem = ({ item }) => (
    <Item item={item} onPress={() => routeLivro(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar search={filterLivro} name={'Livros'} />

      <Image
        source={require('../../assets/images/logo.png')}
        accessibilityLabel="logo do app"
      />
      {/* <ScrollView> */}
      <Text style={styles.texto}> Coleções dos Livros </Text>
      {/* {console.log('container')} */}

      <Container>

        {/* {console.log('livros')}
        {console.log(livros.length)}
        {console.log('livrosTemp')}
        {console.log(livrosTemp.length)} */}
        <FlatList
          data={livrosTemp.length > 0 ? livrosTemp : livros}
          renderItem={renderItem}
          keyExtractor={item => item.uid}
          />
      </Container>
      {/* </ScrollView > */}
      <AddFloatButton onClick={() => routeLivro(null)} />
    </SafeAreaView >
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
