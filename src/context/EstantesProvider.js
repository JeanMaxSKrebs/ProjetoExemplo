import React, {createContext, useState, useContext, useEffect} from 'react';

import {ToastAndroid} from 'react-native';

import {ApiContext} from './ApiProvider';

export const EstantesContext = createContext({});

export const EstanteProvider = ({children}) => {
  const [shelves, setShelves] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const {api} = useContext(ApiContext);

  // console.log(api);

  useEffect(() => {
    console.log('api');
    console.log(api);
    if (api) {
      getShelves();
      console.log(shelves);
    }
  }, [api]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getShelves = async () => {
    try {
      console.log('api');
      console.log(api);
      const response = await api.get('/estantes');
      console.log('Dados buscados via API');
      console.log(response.data);
      console.log(response.data.documents);
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
      data.sort((a, b) => b.nome.localeCompare(a.nome));
      setShelves(data);
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
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao saveEstante via API.');
      console.log(response);
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
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao updateEstante via API.');
      console.log(response);
    }
  };

  const deleteShelf = async val => {
    try {
      await api.delete('/estantes/' + val);
      showToast('Estante excluída.');
      getShelves();
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao deleteEstante via API.');
      console.log(response);
    }
  };

  return (
    <EstantesContext.Provider
      value={{
        shelves,
        saveShelf,
        updateShelf,
        deleteShelf,
      }}>
      {children}
    </EstantesContext.Provider>
  );
};
