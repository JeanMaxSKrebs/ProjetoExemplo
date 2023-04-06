import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../assets/colors";
import LogoutButton from "../../components/LogoutButton";
import {LivrosContext} from "../../context/LivrosProvider";
import {Livro} from "../Livro";
import { Image } from "../Preload/styles";
import Item from "./Item";
import AddFloatButton from "../../components/AddFloatButton"

import {CommonActions} from '@react-navigation/native';

const Livros = ({ navigation }) => {
    const {Livros} = useContext(LivrosContext);

    useEffect(() => {
        navigation.setOptions({
            // headerLeft: false,
            headerTitleAlign: 'center',
            // name: 'GERENCIA LIVROS',
            title: 'BIBLIOTECA // LIVROS',// deixei a name pq senao muda o nome da tab
            headerStyle: { backgroundColor: COLORS.primaryDark },
            headerTintColor: {color: COLORS.black},
            headerRight: () => <LogoutButton />,
        });
        console.log(Livros);
    }, [Livros]);



    const routeLivro = (item) => {
        //console.log(item);
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Livro',
            params: {value: item},
          }),
        );
      };
    
      const routeAddLivro = () => {
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Livro',
            params: {value: null},
          }),
        );
      };

    // const routeLivro = (value) => {
    //     console.log('routeLivro');

    //     console.log(value);;
    // };

//   const routeAddLivro = () => {
//     console.log('routeADDLivros');

//     navigation.dispatch(
//       CommonActions.navigate({
//         name: 'Livro',
//         params: {Livros: null}, ///null??????
//       }),
//     );
//   };

    return (
        
        <View style={styles.container}>
            <Image
            source={require('../../assets/images/logo.png')}
            accessibilityLabel="logo do app"
            />
            <Text style={styles.texto}></Text>
            {Livros.map((valor, key) => {
                return <Item item={valor} onPress={() => routeLivro(valor)} key={key} />
            })}

            <AddFloatButton onClick={() => routeAddLivro(null)} />
        </View>
    );
};

export default Livros;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontSize: 50,
        color: COLORS.primaryDark,
    },
    logout: {
        backgroundColor: COLORS.red
    }
});