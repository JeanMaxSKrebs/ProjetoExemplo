import React, {useState, useEffect, useContext} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {Container, TextInput} from './styles';
import MyButtom from '../../components/MeuButton';
import DeleteButton from '../../components/DeleteButton';
import Loading from '../../components/Loading';
import {EstantesContext} from '../../context/EstantesProvider';

const Estante = ({route, navigation}) => {
  const [genero, setGenero] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveShelf, updateShelf, deleteShelf} = useContext(EstantesContext);

  useEffect(() => {
    // console.log(route.params.value);
    if (route.params.value) {
      setGenero(route.params.value.genero);
      setQuantidade(route.params.value.quantidade);
      setUid(route.params.value.uid);
    }
  }, [route]);

  const salvar = async () => {
    if (genero && quantidade) {
      let shelf = {};
      shelf.uid = uid;
      shelf.genero = genero;
      shelf.quantidade = quantidade;
      setLoading(true);
      if (uid) {
        if (await updateShelf(shelf)) {
          ToastAndroid.show(
            'Show! Você alterou a estante com sucesso.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show('Ops! Erro ao alterar estante.', ToastAndroid.LONG);
        }
      } else {
        if (await saveShelf(shelf)) {
          ToastAndroid.show(
            'Show! Você incluiu a estante com sucesso.',
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
    Alert.alert('Cuidado!', 'Você tem certeza que deseja excluir a Estante?', [
      {
        text: 'Não',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          if (await deleteShelf(uid)) {
            ToastAndroid.show(
              'Show! Você excluiu a Estante com sucesso.',
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
        placeholder="Gênero da Estante"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setGenero(t)}
        value={genero}
      />
      <TextInput
        placeholder="Quantidade"
        keyboardType="numeric"
        returnKeyType="go"
        onChangeText={t => setQuantidade(t)}
        value={quantidade}
      />
      <MyButtom texto="Salvar" onClick={salvar} />
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};
export default Estante;
