/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useContext, useEffect } from 'react';

import { ToastAndroid } from 'react-native';

import { ApiContext } from './ApiProvider';

export const EstantesContext = createContext({});

export const EstanteProvider = ({ children }) => {
  const [estantes, setEstantes] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const { api } = useContext(ApiContext);
  // console.log('api1');
  // console.log(api);

  useEffect(() => {
    if (api) {
      atualizarContador();
      getShelves();
      // console.log('api2');
      // console.log(estantes);
    }
  }, [api]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const excluirTodasEstantes = async () => {
    try {
      console.log(estantes);
      
      for (const estante of estantes) {
        await deleteShelf(estante.uid)
        console.log(`Coleção de estantes com ID ${estante.uid} excluída com sucesso.`);
      }
  
    } catch (error) {
      console.error('Erro ao excluir todas as coleções de estantes:', error);
    }
  };

  const atualizarContador = async () => {
    try {
      console.log('delete')
      await excluirTodasEstantes()

      let quantidadePorGenero = await obterQuantidadePorGenero();
      // console.log(quantidadePorGenero);

      Object.keys(quantidadePorGenero).forEach(async genero => {
        try {
          // console.log(genero);
          // console.log(quantidadePorGenero[genero]);
          const quantidade = quantidadePorGenero[genero].toString();

          console.log(genero);
          await api.post('/estantes/', {
            fields: {
              genero: { stringValue: genero },
              quantidade: { stringValue: quantidade },
            },
          });

          showToast(`Dados de ${genero} postados com sucesso.`);
          getShelves();
          return true;
        } catch (error) {
          console.error(`Erro ao postar dados de ${genero}:`, error);
        }
      });
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao buscar via API.');
      console.log(response);
    }
  };

  const obterQuantidadePorGenero = async () => {
    try {
      const responseLivros = await api.get('/livros');
      let stringGeneros = [];
      responseLivros.data.documents.map(d => {
        let k = d.name.split(
          'projects/pdm-aulas-71f86/databases/(default)/documents/livros/',
        );
  
        // console.log(d.fields.genero.stringValue);
        stringGeneros.push(d.fields.genero.stringValue);
      });
      // console.log('stringGeneros');
      // console.log(stringGeneros);
  
      const quantidadePorGenero = {};
      stringGeneros.forEach(genero => {
        if (quantidadePorGenero[genero]) {
          quantidadePorGenero[genero]++;
        } else {
          quantidadePorGenero[genero] = 1;
        }
      });
  
      console.log('Quantidade por nome:', quantidadePorGenero);
      return quantidadePorGenero;
    } catch (error) {
      console.error('Erro ao obter a quantidade por genero:', error);
    }
  };

  const getShelves = async () => {
    try {
      // console.log('api3');
      // console.log(api);
      const response = await api.get('/estantes');
      // console.log('Dados buscados via API');
      // console.log(response.data);
      // console.log(response.data.documents);
      let data = [];
      response.data.documents.map(d => {
        let k = d.name.split(
          'projects/pdm-aulas-71f86/databases/(default)/documents/estantes/',
        );

        data.push({
          genero: d.fields.genero.stringValue,
          quantidade: d.fields.quantidade.stringValue,
          uid: k[1],
        });
      });
      // console.log(data)
      setEstantes(data);
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao buscar via API.');
      console.log(response);
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
      console.log(val)
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
        atualizarContador,
        saveShelf,
        updateShelf,
        deleteShelf,
      }}>
      {children}
    </EstantesContext.Provider>
  );
};
