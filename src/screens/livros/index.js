import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../assets/colors";
import LogoutButton from "../../components/LogoutButton";
import {LivrosContext} from "../../context/LivrosProvider";
import { Image } from "../Preload/styles";

const Livros = ({ navigation }) => {
    const {livros} = useContext(LivrosContext);

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
        console.log(livros);
    }, [livros]);

    return (
        <View style={styles.container}>
        <Image
        source={require('../../assets/images/logo.png')}
        accessibilityLabel="logo do app"
        />
        <Text style={styles.texto}></Text>

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