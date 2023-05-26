import React, {useState, useEffect, useContext} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {Container, TextInput, Text} from './styles';
import MeuButton from '../../components/MeuButton';
import Loading from '../../components/Loading';
import {LivrosContext} from '../../context/LivrosProvider';
import DeleteButton from '../../components/DeleteButton';
import {View, Modal, FlatList, TouchableOpacity} from 'react-native';
import {GenerosContext} from '../../context/GenerosProvider';
import {EstantesContext} from '../../context/EstantesProvider';

const Livro = ({route, navigation}) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [autor, setAutor] = useState('');
  const [volume, setVolume] = useState('');
  const [genero, setGenero] = useState('');
  const [generoAntigo, setGeneroAntigo] = useState(null);
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);
  const {saveBook, updateBook, deleteBook} = useContext(LivrosContext);
  const {getShelf, getShelves } = useContext(EstantesContext);

  const [modalVisible, setModalVisible] = useState(false);
  const generosContext = useContext(GenerosContext);
  const generos = generosContext.generos;

  // console.log(route)
  // console.log(route.params)

  // console.log(generos)

  useEffect(() => {
    // console.log(route.params.value);
    if (route.params.value === null) {
      setNome('');
      setDescricao('');
      setAutor('');
      setVolume('');
      setGenero('');
      setUid('');
    } else {
      // console.log(route.params);
      setNome(route.params.value.nome);
      setDescricao(route.params.value.descricao);
      setAutor(route.params.value.autor);
      setVolume(route.params.value.volume);
      setGenero(route.params.value.genero);
      setUid(route.params.value.uid);
      setGeneroAntigo(route.params.value.genero);
    }
    console.log(genero);
    return () => {
      // console.log('desmontou Livro');
    };
  }, [route]);

  const salvar = async () => {
    setLoading(true);
    if (await saveBook({uid, nome, descricao, autor, volume, genero})) {
      setLoading(false);
      navigation.goBack();
    } else {
      ToastAndroid.show('Atenção', 'Digite todos os campos.');
    }
  };

  const atualizar = async () => {
    setLoading(true);
    if (
      await updateBook({
        uid,
        nome,
        descricao,
        autor,
        volume,
        genero,
        generoAntigo,
      })
    ) {
      setLoading(false);
      console.log(genero);
      console.log(generoAntigo);
      getShelves();
      
      getShelf(genero)
      
      if(generoAntigo!==genero) {
        navigation.goBack();
      }
      navigation.goBack();      
    } else {
      ToastAndroid.show('Atenção', 'Digite todos os campos.');
    }
  };

  const excluir = async () => {
    Alert.alert('Atenção', 'Você tem Certeza?', [
      {
        text: 'Não',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          console.log(uid, genero);
          if (await deleteBook(uid, genero)) {
            ToastAndroid.show('Deletado', ToastAndroid.SHORT);
          } else {
            ToastAndroid.show('Digite todos os campos', ToastAndroid.SHORT);
          }
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  const selectGenero = nome => {
    setGenero(nome);
    setModalVisible(false);
  };

  // console.log(generos);
  // console.log(generos.generos[0].nome);
  // console.log(generos.generos[1].nome);

  return (
    <Container>
      <TextInput
        placeholder="Nome do Livro"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Descricão"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setDescricao(t)}
        value={descricao}
      />
      <TextInput
        placeholder="Autor"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setAutor(t)}
        value={autor}
      />
      <TextInput
        placeholder="Volume"
        keyboardType="numeric"
        returnKeyType="go"
        onChangeText={t => setVolume(t)}
        value={volume}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <TextInput
          placeholder="Selecione um gênero"
          value={genero}
          editable={false}
        />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View>
          <FlatList
            data={generos}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => selectGenero(item.nome)}>
                <Text>{item.nome}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {generoAntigo ? (
        <MeuButton texto="Atualizar" onClick={atualizar} />
      ) : (
        <MeuButton texto="Salvar" onClick={salvar} />
      )}
      {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null}
      {loading && <Loading />}
    </Container>
  );
};

export default Livro;
