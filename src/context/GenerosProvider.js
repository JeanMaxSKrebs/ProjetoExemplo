/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState, useContext, useEffect} from 'react';

import {ToastAndroid} from 'react-native';

import {ApiContext} from './ApiProvider';

export const GenerosContext = createContext({});

export const GeneroProvider = ({children}) => {
  const [generos, setGeneros] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const {api} = useContext(ApiContext);
  // console.log('api1');
  // console.log(api);

  useEffect(() => {
    if (api) {
      getGenders();
      // console.log('api2');
      // console.log(generos);
    }
  }, [api]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getGenders = async () => {
    try {
      // console.log('api3');
      // console.log(api);
      const response = await api.get('/generos');
      // console.log('Dados buscados via API');
      // console.log(response.data);
      // console.log(response.data.documents);
      let data = [];
      response.data.documents.map(d => {
        let k = d.name.split(
          'projects/pdm-aulas-71f86/databases/(default)/documents/generos/',
        );

        data.push({
          nome: d.fields.nome.stringValue,
          uid: k[1],
        });
      });
      // console.log(data)
      setGeneros(data);
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao buscar generos via API.');
      console.log(response);
    }
  };

  const saveGender = async val => {
    // console.log('val');
    // console.log(val);
    try {
      await api.post('/generos/', {
        fields: {
          nome: {stringValue: val.nome},
        },
      });
      showToast('Dados salvos.');
      getGenders();
      return true;
    } catch (response) {
      setErrorMessage(response);
      console.error('Erro ao saveGender via API.');
      console.error(response);
      return false;
    }
  };

  const updateGender = async val => {
    //console.log(val);
    try {
      await api.patch('/generos/' + val.uid, {
        fields: {
          nome: {stringValue: val.nome},
        },
      });
      showToast('Dados salvos.');
      getGenders();
      return true;
    } catch (response) {
      setErrorMessage(response);
      console.error('Erro ao updateGender via API.');
      console.error(response);
      return false;
    }
  };

  const deleteGender = async val => {
    try {
      await api.delete('/generos/' + val);
      showToast('Gênero excluída.');
      getGenders();
      return true;
    } catch (response) {
      setErrorMessage(response);
      console.log('Erro ao deletar Gênero via API.');
      console.log(response);
      return false;
    }
  };

  return (
    <GenerosContext.Provider
      value={{
        generos,
        saveGender,
        updateGender,
        deleteGender,
      }}>
      {children}
    </GenerosContext.Provider>
  );
};
