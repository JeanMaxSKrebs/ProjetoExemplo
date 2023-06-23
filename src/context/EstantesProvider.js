/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState, useContext, useEffect} from 'react';

import {ToastAndroid} from 'react-native';

import {ApiContext} from './ApiProvider';
import {AuthUserContext} from './AuthUserProvider';
import {GenerosContext} from './GenerosProvider';

export const EstantesContext = createContext({});

export const EstanteProvider = ({children}) => {
  const {generos} = useContext(GenerosContext);
  const {user, getUser} = useContext(AuthUserContext);
  const [estante, setEstante] = useState([]);
  const [estantes, setEstantes] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const {api} = useContext(ApiContext);
  // console.log('api1');
  // console.log(api);

  useEffect(() => {
    if (api) {
      // console.log("contador");
      getShelves();
      // console.log('api2');
      // console.log(estantes);
    }
  }, [api]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getShelves = async () => {
    try {
      // console.log('user');
      // console.log(user);
      let data = [];
      for (const genero of generos) {
        // console.log('genero');
        // console.log(genero.nome)
        if (user) {
          const response = await api.get(
            '/users/' + user.uid + '/' + genero.nome,
          );

          // console.log('Dados buscados via API');

          const documents = response.data.documents;
          if (documents) {
            // console.log(genero.nome);
            // console.log(documents);
            let quantidadeGenero = 0;
            // console.log(quantidadeGenero);
            documents.map(d => {
              let latitude = d.fields.latitude.stringValue;
              let longitude = d.fields.longitude.stringValue;
              quantidadeGenero++;
            });
            data.push({
              genero: genero.nome,
              quantidade: quantidadeGenero,
              latitude: latitude,
              longitude: longitude,
            });
          }
        }
      }
      // console.log('data');
      // console.log(data);
      setEstantes(data);
    } catch (error) {
      console.error('Error getting subcollections:', error);
      throw error;
    }
  };

  const getShelf = async genero => {
    try {
      // console.log('user');
      // console.log(user);
      // console.log('Genero selecionado');
      // console.log(genero);
      let dados = [];

      const resposta = await api.get('/users/' + user.uid + '/' + genero + '/');
      console.log('Dados buscados via API');
      // console.log(resposta.data.documents);

      const documents = resposta.data.documents;
      if (documents) {
        documents.map(d => {
          // console.log(d.name);
          let k = d.name.split(
            'projects/pdm-aulas-71f86/databases/(default)/documents/users/' +
              user.uid +
              '/' +
              genero +
              '/',
          );

          dados.push({
            nome: d.fields.nome.stringValue,
            descricao: d.fields.descricao.stringValue,
            autor: d.fields.autor.stringValue,
            volume: d.fields.volume.integerValue,
            genero: genero.nome,
            uid: k[1],
          });
          // console.log(dados);
          // console.log(k[1]);
        });
      }
      // console.log('dados');
      // console.log(dados);
      setEstante(dados);
    } catch (resposta) {
      setErrorMessage(resposta);
      console.log('Erro ao buscar estante via API.');
      console.log(resposta);
    }
  };

  const updateShelf = async val => {
    console.log('val');
    console.log(val);
    try {
      await api.patch('/users/' + user.uid + '/' + val.genero, {
        fields: {
          latitude: {stringValue: val.latitude},
          longitude: {stringValue: val.longitude},
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
      // console.log(val);
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
        estante,
        estantes,
        getShelf,
        getShelves,
        updateShelf,
        deleteShelf,
      }}>
      {children}
    </EstantesContext.Provider>
  );
};
