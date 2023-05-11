import React, {createContext, useState, useContext, useEffect} from 'react';

import {ToastAndroid} from 'react-native';

import {ApiContext} from './ApiProvider';

export const EstantesContext = createContext({});

export const EstanteProvider = ({children}) => {
  const [estantes, setEstantes] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const {api} = useContext(ApiContext);
  // console.log('api1');
  // console.log(api);

  useEffect(() => {
    if (api) {
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
          genero: {stringValue: val.genero},
          quantidade: {stringValue: val.quantidade},
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
          genero: {stringValue: val.genero},
          quantidade: {stringValue: val.quantidade},
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
