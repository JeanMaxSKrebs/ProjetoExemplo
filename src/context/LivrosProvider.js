import React, {createContext, useState, useContext, useEffect} from 'react';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import {EstantesContext} from './EstantesProvider';
import {ApiContext} from './ApiProvider';

export const LivrosContext = createContext({});

export const LivrosProvider = ({children}) => {
  const [livros, setLivros] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  // const {atualizarContador} = useContext(EstantesContext);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const {api} = useContext(ApiContext);
  // console.log('api1');
  // console.log(api);

  useEffect(() => {
    if (api) {
      getLivros();
      console.log('livros');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  const getLivros = async () => {
    try {
      const response = await api.get('/users');
      // console.log('Dados buscados via API');
      // console.log(response.data);
      console.log(response.data.documents);
      let data = [];
      response.data.documents.map(d => {
        // console.log(d.name);
        let k = d.name.split(
          'projects/pdm-aulas-71f86/databases/(default)/documents/users/',
        );
        // console.log('k');
        // console.log(k);

        data.push({
          nome: d.fields.nome.stringValue,
          // descricao: d.fields.descricao.stringValue,
          // autor: d.fields.autor.stringValue,
          // volume: d.fields.volume.stringValue,
          // genero: d.fields.genero.stringValue,
          uid: k[1],
        });
        console.log(k[1]);
      });
      setLivros(data);
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao buscar via API.');
      console.log(response);
    }
  };
  const saveBook = async val => {
    console.log('val');
    console.log(val);
    try {
      await api.post('/users/', {
        fields: {
          nome: {stringValue: val.nome},
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

  const updateLivro = async val => {
    //console.log(val);
    try {
      await api.patch('/livros/' + val.uid, {
        fields: {
          nome: {stringValue: val.nome},
        },
      });
      showToast('Dados salvos.');
      getLivros();
      return true;
    } catch (response) {
      setErrorMessage(response);
      console.error('Erro ao updateLivro via API.');
      console.error(response);
      return false;
    }
  };

  const deleteBook = async val => {
    try {
      await api.delete('/livros/' + val);
      showToast('Livro excluído.');
      getLivros();
      return true;
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao deletar Livro via API.');
      console.log(response);
      return false;
    }
  };

  return (
    <LivrosContext.Provider value={{livros, saveBook, updateLivro, deleteBook}}>
      {children}
    </LivrosContext.Provider>
  );
};
