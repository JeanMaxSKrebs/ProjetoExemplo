import React, { createContext, useEffect, useState} from 'react';
import firestore from "@react-native-firebase/firestore";

export const LivrosContext = createContext({});

export const LivrosProvider = ({children}) => {
    const [Livros, setLivros] = useState([]);

    useEffect(() => {
        const listener = firestore()
        .collection('livros')
        .orderBy('nome')
        // .onSnapshot((snapShot) => {
            .onSnapshot(snapShot => {
            //implemente aqui
            // console.log(snapShot);

            // console.log(snapShot._docs[0]._data);

            // snapShot.forEach(doc => 
                // console.log(doc.id, ' => ', doc.data()))
            let data = [];
            snapShot.forEach(doc => {
                // console.log(doc.id, ' => ', doc.data());
                data.push({
                    uid: doc.id,
                    nome: doc.data().nome,
                    autor: doc.data().autor,
                    descricao: doc.data().descricao,
                    volume: doc.data().volume,
                });
            });
            setLivros(data);
        });

        return () => {listener()};
    }, 
    []);

    return(
        <LivrosContext.Provider value={{Livros}}>
            {children}
        </LivrosContext.Provider>
    );
};