import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, ScrollView, View, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import {Container, TextInput} from './styles';
import {Alert, ToastAndroid} from 'react-native';

import {EstantesContext} from '../../context/EstantesProvider';

import MeuButton from '../../components/MeuButton';

const Localizacao = ({route, navigation}) => {
  const [genero, setGenero] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [latitude, setLatitude] = useState('0');
  const [longitude, setLongitude] = useState('0');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveShelf, updateShelf, deleteShelf} = useContext(EstantesContext);
  const {estante} = useContext(EstantesContext);
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
      setGenero(route.params.value.genero);
      setQuantidade(route.params.value.quantidade);
      setLatitude(route.params.value.latitude);
      setLongitude(route.params.value.longitude);
    }
    return () => {
      // console.log('desmontou Estante');
    };
  }, [route]);

  const salvar = async () => {
    if (genero && quantidade) {
      let estante = {};
      estante.uid = uid;
      estante.genero = genero;
      estante.quantidade = quantidade;
      estante.latitude = latitude;
      estante.longitude = longitude;
      setLoading(true);
      if (uid) {
        if (await updateShelf(estante)) {
          ToastAndroid.show(
            'Show! Você alterou com sucesso.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show('Ops! Erro ao alterar.', ToastAndroid.LONG);
        }
      } else {
        if (await saveShelf(estante)) {
          ToastAndroid.show(
            'Show! Você inluiu com sucesso.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show('Ops! Erro ao alterar.', ToastAndroid.LONG);
        }
      }
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
  };

  function onGoBack(lat, long) {
    setLatitude(lat.toString());
    setLongitude(long.toString());
  }

  return (
    <Container>
      <TextInput
        placeholderTextColor="gray"
        editable={false}
        placeholder={genero}
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setGenero(t)}
      />
      <TextInput
        placeholderTextColor="gray"
        editable={false}
        placeholder={quantidade.toString()}
        keyboardType="numeric"
        returnKeyType="go"
        onChangeText={t => setQuantidade(t)}
      />
      <TextInput
        placeholderTextColor="gray"
        editable={false}
        placeholder="Latitude"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setLatitude(t)}
        value={latitude}
      />
      <TextInput
        placeholderTextColor="gray"
        editable={false}
        placeholder="Longitude"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setLongitude(t)}
        value={longitude}
      />

      <MeuButton
        texto="Obter Coordenadas no Mapa"
        onClick={() => navigation.navigate('EstantesMap', {onGoBack})}
      />
      <MeuButton texto="Salvar" onClick={salvar} />
    </Container>
  );
};

export default Localizacao;
