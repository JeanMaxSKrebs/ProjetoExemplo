import React, {useState, useEffect, useContext} from 'react';
import { View } from 'react-native';
import { Container, TextInput } from "./styles";
import MeuButton from '../../components/MeuButton';
import Loading from '../../components/Loading';
const Livro = ({route}) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [autor, setAutor] = useState('');
    const [volume, setVolume] = useState('');
    const [uid, setUid] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // console.log(route.params.livro);
        setNome('');
        setDescricao('');
        setAutor('');
        setVolume('');
        setUid('');
        if (route.params.livros) {
            setNome(route.params.livros.nome);
            setDescricao(route.params.livros.descricao);
            setAutor(route.params.livros.autor);
            setVolume(route.params.livros.volume);
            setUid(route.params.livros.uid);
        }
        return () => {
          console.log('desmontou livro');
        };
      }, [route]);

      const salvar = async () => {
        if (nome && descricao && autor && volume && uid) {
          let livros = {};
          livros.uid = uid;
          livros.nome = nome;
          livros.descricao = descricao;
          livros.autor = autor;
          livros.volume = volume;
          setLoading(true);
          await saveLivros(livros);
          setLoading(false);
          navigation.goBack();
        } else {
          Alert.alert('Atenção', 'Digite todos os campos.');
        }
      };

      return (
      <Container>
        <TextInput
            placeholder="Nome do Livro"
            keyboardType="default"
            returnKeyType="go"
            onChangeText={(t) => setSigla(t)}
            value={nome}
        />
        <TextInput
            placeholder="Descricão"
            keyboardType="default"
            returnKeyType="go"
            onChangeText={(t) => setNome(t)}
            value={descricao}
        />
        <TextInput
            placeholder="Autor"
            keyboardType="default"
            returnKeyType="go"
            onChangeText={(t) => setCampus(t)}
            value={autor}
        />
        <TextInput
            placeholder="Volume"
            keyboardType="numeric"
            returnKeyType="go"
            onChangeText={(t) => setModulos(t)}
            value={volume}
        />
        <MeuButton texto="Salvar" onClick={salvar} />
        {/* {uid ? <DeleteButton texto="Excluir" onClick={excluir} /> : null} */}
        {loading && <Loading />}
    </Container>
    );
}

export default Livro;