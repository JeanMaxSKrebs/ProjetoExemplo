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
import {EstantesContext} from '../../context/EstantesProvider';
import SearchBar from '../../components/SearchBar';

const Estantes = ({navigation}) => {
  const {shelves} = useContext(EstantesContext);
  const [shelvesTemp, setShelvesTemp] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      // headerLeft: false,
      headerTitleAlign: 'center',
      // name: 'GERENCIA LIVROS',
      title: 'BIBLIOTECA // ESTANTES', // deixei a name pq senao muda o nome da tab
      headerStyle: {backgroundColor: COLORS.primaryDark},
      headerTintColor: {color: COLORS.black},
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <LogoutButton />,
    });
  }, [navigation]);

  const filterEstante = text => {
    // console.log(text);
    let filtro = [];
    shelves.filter(estante => {
      if (estante.genero.toLowerCase().includes(text.toLowerCase())) {
        filtro.push(estante);
      }
    });
    // console.log('filtro');
    // console.log(filtro);
    // console.log(filtro.length);
    if (filtro.length > 0) {
      setShelvesTemp(filtro);
      // console.log(filtro.length);
    } else {
      setShelvesTemp([]);
    }
  };

  const routeEstante = item => {
    //console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Estante',
        params: {value: item},
      }),
    );
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeEstante(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar setSearch={filterEstante} name={'Estantes'} />
      <Image
        source={require('../../assets/images/estante.png')}
        accessibilityLabel="logo do app"
      />
      <Container>
        {console.log(shelves)}
        {console.log(shelvesTemp)}
        <FlatList
          data={shelvesTemp.length > 0 ? shelvesTemp : shelves}
          renderItem={renderItem}
          keyExtractor={item => item.uid}
        />
      </Container>
      <AddFloatButton onClick={() => routeEstante(null)} />
    </SafeAreaView>
  );
};
export default Estantes;

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
