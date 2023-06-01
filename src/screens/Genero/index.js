import React, {useState, useEffect, useContext} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {Container, TextInput} from './styles';
import MeuButton from '../../components/MeuButton';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {GenerosContext} from '../../context/GenerosProvider';

const Genero = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveGender, updateGender, deleteGender} = useContext(GenerosContext);

  useEffect(() => {
    // console.log(route.params.value);
    if (route.params.value) {
      setNome(route.params.value.nome);
      setUid(route.params.value.uid);
    }
  }, [route]);

  const salvar = async () => {
    if (nome) {
      let gender = {};
      gender.uid = uid;
      gender.nome = nome;
      setLoading(true);
      if (uid) {
        if (await updateGender(gender)) {
          ToastAndroid.show(
            'Show! Você alterou o Gênero com sucesso.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show('Ops! Erro ao alterar gênero.', ToastAndroid.LONG);
        }
      } else {
        if (await saveGender(gender)) {
          ToastAndroid.show(
            'Show! Você incluiu o Gênero com sucesso.',
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

  const excluir = async () => {
    Alert.alert('Cuidado!', 'Você tem certeza que deseja excluir o Gênero?', [
      {
        text: 'Não',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          if (await deleteGender(uid)) {
            ToastAndroid.show(
              'Show! Você excluiu o Gênero com sucesso.',
              ToastAndroid.LONG,
            );
          } else {
            ToastAndroid.show('Ops! Erro ao excluir.', ToastAndroid.LONG);
          }
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Container>
      <TextInput
        color="black"
        placeholderTextColor="gray"
        placeholder="Nome do Gênero"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <MeuButton texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};
export default Genero;
