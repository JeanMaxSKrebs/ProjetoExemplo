import React, { createContext, useState, useContext, useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import {EstantesContext} from './EstantesProvider';
import { ApiContext } from './ApiProvider';
import { AuthUserContext } from './AuthUserProvider';
import { GenerosContext } from './GenerosProvider';

export const LivrosContext = createContext({});

export const LivrosProvider = ({ children }) => {
  const { generos } = useContext(GenerosContext);
  const { user, getUser } = useContext(AuthUserContext);
  const [livros, setLivros] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  // const {atualizarContador} = useContext(EstantesContext);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const { api } = useContext(ApiContext);
  // console.log('api1');
  // console.log(api);

  useEffect(() => {
    if (api) {
      // console.log('user')
      // console.log(user)
      getLivros();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  const getLivros = async () => {
    try {
      // console.log('user')
      // console.log(user)
      // console.log('Generos');
      // console.log(generos);

      let dados = [];
      // generos.forEach(async genero => {
      for (const genero of generos) {
        // console.log('genero');
        // console.log(genero.nome);

        const resposta = await api.get('/users/' + user.uid + '/' + genero.nome + '/');
        // console.log('Dados buscados via API');
        // console.log(resposta.data.documents);

        const documents = resposta.data.documents;
        if (documents) {
          documents.map(d => {
            // console.log(d.name);
            let k = d.name.split(
              'projects/pdm-aulas-71f86/databases/(default)/documents/users/'
              + user.uid + '/' + genero.nome + '/',
            );
            // console.log('k');
            // console.log(k);
            // console.log('d');
            // console.log(d.fields);

            dados.push({
              nome: d.fields.nome.stringValue,
              descricao: d.fields.descricao.stringValue,
              autor: d.fields.autor.stringValue,
              volume: d.fields.volume.integerValue,
              genero: genero.nome,
              uid: k[1],
            });
            // console.log(dados)
            // console.log(k[1]);
          });
        }
      }
      // })
      // console.log(dados);
      setLivros(dados);
      return dados;
    } catch (resposta) {
      setErrorMessage(resposta);
      console.log('Erro ao buscar livros via API.');
      console.log(resposta);
    }
  };

  const saveBook = async (val) => {
    console.log('val');
    console.log(val);
    try {
      await api.post('/users/' + user.uid + '/' + val.genero + '/' + val.uid, {
        fields: {
          nome: { stringValue: val.nome },
          descricao: { stringValue: val.descricao },
          autor: { stringValue: val.autor },
          volume: { integerValue: val.volume },
        },
      });
      showToast('Dados salvos.');
      getLivros();
      return true;
    } catch (response) {
      setErrorMessage(response);
      console.error('Erro ao saveBook via API.');
      console.error(response);
      return false;
    }
  };

  const deleteBook = async (uid, genero) => {
    console.log('uid');
    console.log(uid);
    try {
      await api.delete('/users/' + user.uid + '/' + genero + '/' + uid);
      showToast('Livro excluído.');
      getLivros();
      return true;
    } catch (response) {
      setErrorMessage(response);
      console.error('Erro ao deleteBook via API.');
      console.error(response);
      return false;
    }
  };

  return (
    <LivrosContext.Provider value={{ livros, getLivros, saveBook, deleteBook }}>
      {children}
    </LivrosContext.Provider>
  );
};
