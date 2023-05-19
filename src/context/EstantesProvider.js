/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useContext, useEffect } from 'react';

import { ToastAndroid } from 'react-native';

import { ApiContext } from './ApiProvider';
import { AuthUserContext } from './AuthUserProvider';
import { GenerosContext } from './GenerosProvider';

export const EstantesContext = createContext({});

export const EstanteProvider = ({ children }) => {
  const { generos } = useContext(GenerosContext);
  const { user, getUser } = useContext(AuthUserContext);
  const [estantes, setEstantes] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const { api } = useContext(ApiContext);
  // console.log('api1');
  // console.log(api);

  useEffect(() => {
    if (api) {
      // console.log("contador");
      // atualizarContador();
      getGenres();
      // getShelves();
      // console.log('api2');
      // console.log(estantes);
    }
  }, [api]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getGenres = async () => {
    try {
      console.log('user')
      console.log(user)
      for (const genero of generos) {
        // console.log('genero');
        // console.log(genero.nome)


        const response = await api.get('/users/' + user.uid + '/' + genero.nome);
        // console.log('Dados buscados via API');

        const documents = response.data.documents;
        if (documents) {
          console.log(documents);

          documents.map(d => {
            // console.log(d.name);
            let k = d.name.split(
              'projects/pdm-aulas-71f86/databases/(default)/documents/users/'
              + user.uid + '/'
            );
            console.log('k');
            console.log(k);
            console.log('d');
            console.log(d.fields);        
          })
        }
      }
    } catch (error) {
      console.error('Error getting subcollections:', error);
      throw error;
    }
  };

  const getShelves = async () => {
    try {
      console.log('user')
      console.log(user)
      console.log('Generos');
      console.log(generos);

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
            console.log(dados)
            // console.log(k[1]);
          });
        }
      }
      // })
      console.log(dados);
      setLivros(dados);
      return dados;
    } catch (resposta) {
      setErrorMessage(resposta);
      console.log('Erro ao buscar livros via API.');
      console.log(resposta);
    }
  };

  const saveShelf = async val => {
    // console.log(val);
    try {
      await api.post('/estantes/', {
        fields: {
          genero: { stringValue: val.genero },
          quantidade: { stringValue: val.quantidade },
        },
      });
      showToast('Dados salvos.');
      getShelves();
      return true;
    } catch (response) {
      setErrorMessage(response);
      console.error('Erro ao saveEstante via API.');
      console.error(response);
      return false;
    }
  };

  const updateShelf = async val => {
    //console.log(val);
    try {
      await api.patch('/estantes/' + val.uid, {
        fields: {
          genero: { stringValue: val.genero },
          quantidade: { stringValue: val.quantidade },
        },
      });
      showToast('Dados salvos.');
      getShelves();
      return true;
    } catch (response) {
      setErrorMessage(response);
      console.error('Erro ao updateEstante via API.');
      console.error(response);
      return false;
    }
  };

  const deleteShelf = async val => {
    try {
      console.log(val);
      await api.delete('/estantes/' + val);
      showToast('Estante excluída.');
      getShelves();
      return true;
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao deleteEstante via API.');
      console.log(response);
      return false;
    }
  };

  return (
    <EstantesContext.Provider
      value={{
        estantes,
        saveShelf,
        updateShelf,
        deleteShelf,
      }}>
      {children}
    </EstantesContext.Provider>
  );
};
