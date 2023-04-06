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

    const saveBook = async (book) => {
      console.log(book)
      try {
        await firestore()
          .collection('livros')
          .doc(book.uid)
          .set(
            {
                nome: book.nome,
                descricao: book.descricao,
                autor: book.autor,
                volume: book.volume,
            },
            {merge: true},
          )
          return true;
      } catch (error) {
        console.error('BookProvider, saveBook: ', error);
        return false;
      }
        
      };
    
      const deleteBook = async uid => {
        await firestore()
          .collection('livros')
          .doc(uid)
          .delete()
          .then(() => {
            showToast('Livro excluído.');
          })
          .catch((error) => {
            console.error('BookProvider, deleteBook: ', error);
          });
      };

    return(
        <LivrosContext.Provider value={{Livros, saveBook, deleteBook}}>
            {children}
        </LivrosContext.Provider>
    );
};