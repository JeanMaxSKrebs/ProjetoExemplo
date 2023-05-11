import React, {createContext, useEffect, useState} from 'react';
import {create} from 'apisauce';
import auth from '@react-native-firebase/auth';

export const ApiContext = createContext({});

export const ApiProvider = ({children}) => {
  const [api, setApi] = useState(null);
  // console.log('api');
  // console.log(api);
  const getApi = () => {
    if (auth().currentUser) {
      auth()
        .currentUser.getIdToken(true)
        .then(idToken => {
          if (idToken) {
            const apiLocal = create({
              baseURL:
                'https://firestore.googleapis.com/v1/projects/pdm-aulas-71f86/databases/(default)/documents/',
              headers: {Authorization: 'Bearer ' + idToken},
            });

            //utiliza o middleware para lançar um exceção (usa try-catch no consumidor)
            apiLocal.addResponseTransform(response => {
              if (!response.ok) {
                throw response;
              }
            });
            //coloca no state
            // console.log('apiLocal');
            // console.log(apiLocal);
            setApi(apiLocal);
          }
        })
        .catch(e => {
          console.error('ApiProvider, useEffect: ' + e);
        });
    }
  };

  useEffect(() => {
    // cria um listener para o estado da sessão
    const unsubscriber = auth().onAuthStateChanged(authUser => {
      if (authUser) {
        getApi();
      }
    });
    return unsubscriber; //unsubscribe o listener ao desmontar
  }, []);

  return (
    <ApiContext.Provider
      value={{
        api,
      }}>
      {children}
    </ApiContext.Provider>
  );
};
