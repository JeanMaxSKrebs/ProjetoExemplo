import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../assets/colors";
import MeuButton from "../components/MeuButton";


const Home = (props) => {
    console.log(props);
    const [contador, setContador] = useState(0);

    useEffect(() => {
        console.log("montou o componente")
    }, []);
    useEffect(() => {
        console.log("Fez Update")
    });
    useEffect(() => {
        console.log('Fez Update do contador')
    }, [contador]);

    const add = () => {
        setContador(contador + 1);
        // alert('clicou');
    }
    const remove = () => {
        setContador(contador - 1);
        // alert('clicou');
    }
    const reset = () => {
        setContador(0);
    }

    return (
        <View>
            <Text style={styles.texto}>Contador = {contador}</Text>
            <Text style={styles.texto}>pontos</Text>
            <MeuButton texto='Add' onClick={add} />
            <MeuButton texto='Remove' onClick={remove} />
            <MeuButton texto='Reset' onClick={reset} />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    texto: {
        fontSize: 50,
        color: COLORS.primaryDark,
    }
});