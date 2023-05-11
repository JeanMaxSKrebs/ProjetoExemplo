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
  const {estantes} = useContext(EstantesContext);
  const [estantesTemp, setEstantesTemp] = useState([]);

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
    if (text !== '') {
      let filtro = [];
      // console.log(estantes);

      filtro.push(
        ...estantes.filter(est =>
          est.genero.toLowerCase().includes(text.toLowerCase()),
        ),
      );

      // console.log('filtro');
      // console.log(filtro);
      // console.log(filtro.length);
      if (filtro.length > 0) {
        setEstantesTemp(filtro);
        // console.log(filtro.length);
      } else {
        setEstantesTemp([]);
      }
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
      <SearchBar search={filterEstante} name={'Estantes'} />
      <Image
        source={require('../../assets/images/estante.png')}
        accessibilityLabel="logo do app"
      />
      <Container>
        {/* {console.log('estantes')}
        {console.log(estantes)}
        {console.log('estantesTemp')}
        {console.log(estantesTemp)} */}
        <FlatList
          data={estantesTemp.length > 0 ? estantesTemp : estantes}
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
