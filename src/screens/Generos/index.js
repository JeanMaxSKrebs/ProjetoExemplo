import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, StyleSheet} from 'react-native';
import {Image} from '../Preload/styles';
import {CommonActions} from '@react-navigation/native';
import {COLORS} from '../../assets/colors';
import LogoutButton from '../../components/LogoutButton';
import {Container, FlatList} from './styles';
import Item from './Item.js';
import AddFloatButton from '../../components/AddFloatButton';
// import Loading from '../../components/Loading';
import {GenerosContext} from '../../context/GenerosProvider';
import SearchBar from '../../components/SearchBar';

const Generos = ({navigation}) => {
  const {generos} = useContext(GenerosContext);
  const [generosTemp, setGenerosTemp] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      // headerLeft: false,
      headerTitleAlign: 'center',
      // name: 'GERENCIA LIVROS',
      title: 'BIBLIOTECA // GÊNEROS', // deixei a name pq senao muda o nome da tab
      headerStyle: {backgroundColor: COLORS.primaryDark},
      headerTintColor: {color: COLORS.black},
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <LogoutButton />,
    });
  }, [navigation]);

  const filterGenero = text => {
    if (text !== '') {
      let filtro = [];
      // console.log(generos);

      filtro.push(
        ...generos.filter(est =>
          est.nome.toLowerCase().includes(text.toLowerCase()),
        ),
      );

      // console.log('filtro');
      // console.log(filtro);
      // console.log(filtro.length);
      if (filtro.length > 0) {
        setGenerosTemp(filtro);
        // console.log(filtro.length);
      } else {
        setGenerosTemp([]);
      }
    }
  };

  const routeGenero = item => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Genero',
        params: {value: item},
      }),
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeGenero(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar search={filterGenero} name={'Gêneros'} />
      <Image
        source={require('../../assets/images/estante.png')}
        accessibilityLabel="logo do app"
      />
      <Container>
        {/* {console.log('generos')}
        {console.log(generos)}
        {console.log('generosTemp')}
        {console.log(generosTemp)} */}
        <FlatList
          data={generosTemp.length > 0 ? generosTemp : generos}
          renderItem={renderItem}
          keyExtractor={item => item.uid}
        />
      </Container>
      <AddFloatButton onClick={() => routeGenero(null)} />
    </SafeAreaView>
  );
};
export default Generos;

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
