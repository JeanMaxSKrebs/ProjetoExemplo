import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, ScrollView, View, StyleSheet} from 'react-native';
import {Image} from '../Preload/styles';
import {COLORS} from '../../assets/colors';
import {CommonActions} from '@react-navigation/native';
import {Container, TextInput, Text, FlatList} from './styles';
import LogoutButton from '../../components/LogoutButton';
import AddFloatButton from '../../components/AddFloatButton';

import Item from './Item.js';

import SearchBar from '../../components/SearchBar';

import {LivrosContext} from '../../context/LivrosProvider';
import {EstantesContext} from '../../context/EstantesProvider';

const Estante = ({route, navigation}) => {
  const [genero, setGenero] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [latitude, setLatitude] = useState('0');
  const [longitude, setLongitude] = useState('0');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveShelf, updateShelf, deleteShelf} = useContext(EstantesContext);
  const {estante} = useContext(EstantesContext);
  const {livros} = useContext(LivrosContext);
  const [estanteTemp, setEstanteTemp] = useState([]);

  useEffect(() => {
    console.log('params');
    console.log(route.params.value);
    if (route.params.value === null) {
      setGenero('');
      setQuantidade('');
      setLatitude('');
      setLongitude('');
    } else {
      console.log('route.params.value.genero');
      setGenero(route.params.value.genero);
      setQuantidade(route.params.value.quantidade);
      setLatitude(route.params.value.latitude);
      setLongitude(route.params.value.longitude);
    }

    return () => {
      // console.log('desmontou Estante');
    };
  }, [route]);

  useEffect(() => {
    console.log('genero mapa');
    console.log(genero);

    navigation.setOptions({
      // headerLeft: false,
      headerTitleAlign: 'center',
      // name: 'GERENCIA LIVROS',
      // title: 'BIBLIOTECA // ESTANTE' + genero.toUpperCase(), // deixei a name pq senao muda o nome da tab
      // title: genero ? `'BIBLIOTECA // ESTANTE ' {{genero.toUpperCase()}}`
      // : 'BIBLIOTECA // ESTANTE // MAPA',
      title: `BIBLIOTECA // ESTANTE ${genero}`,
      //TODO
      // ? `BIBLIOTECA // ESTANTE ${genero.toUpperCase()}`
      // : 'BIBLIOTECA // ESTANTE // MAPA',
      headerStyle: {backgroundColor: COLORS.primaryDark},
      headerTintColor: {color: COLORS.black},
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => <LogoutButton />,
    });
  }, [navigation, genero]);

  const filterEstante = text => {
    let filtro = [];
    livros.filter(livro => {
      if (livro.nome.toLowerCase().includes(text.toLowerCase())) {
        filtro.push(livro);
      }
    });
    console.log('filtro');
    console.log(filtro);
    // console.log(filtro.length);
    if (filtro.length > 0) {
      setEstanteTemp(filtro);
      // console.log(filtro.length);
    } else {
      setEstanteTemp([]);
    }
  };

  const routeLivro = item => {
    item.estante = true;
    console.log('item');
    console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Livro',
        params: {value: item},
      }),
    );
  };
  const routeEstante = item => {
    // item.estante = true;
    console.log('itemasd');
    console.log(item);
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Localizacao',
        params: {value: item},
      }),
    );
  };

  const renderItem = ({item}) => (
    (item.genero = genero),
    console.log(item),
    (<Item item={item} onPress={() => routeLivro(item)} />)
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar search={filterEstante} name={'na estante: ' + genero} />
      <Image
        source={require('../../assets/images/estante.png')}
        accessibilityLabel="logo do app"
      />
      {/* <MeuButton
            texto="Visualizar no Mapa"
            onClick={() => navigation.navigate('EstantesMap')}
          /> */}
      <Container>
        {console.log('estante')}
        {console.log(estante)}
        {/* {console.log('estanteTemp')}
          {console.log(estanteTemp)} */}
        <FlatList
          // data={estanteTemp.length > 0 ? estanteTemp : estante}
          data={estanteTemp.length > 0 ? estanteTemp : estante}
          renderItem={renderItem}
          keyExtractor={item => item.uid}
        />
      </Container>
      <AddFloatButton
        tipo="map"
        onClick={() => routeEstante({genero, quantidade})}
      />
    </SafeAreaView>
  );
};

export default Estante;

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
