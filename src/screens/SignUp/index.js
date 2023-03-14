import React, { useState } from 'react';
import { Alert } from 'react-native';
import MeuButton from '../../components/MeuButton';
import { Body, TextInput } from './styles';
import auth from "@react-native-firebase/auth";
import { CommonActions } from '@react-navigation/native';

const SignUp = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');

    const cadastrar = () => {
        if (nome !== '' && email !== '' && senha !== '' && confirmaSenha !== '') {
            if (senha === confirmaSenha) {
                auth()
                    .createUserWithEmailAndPassword(email, senha)
                    .then(() => {
                        let userFirebase = auth().currentUser;
                        userFirebase.sendEmailVerification()
                            .then(() => {
                                Alert; alert('Informação', 'Foi Enviado um email para'
                                    + email
                                    + 'para verificação');
                                navigation.dispatch(
                                    CommonActions.reset({
                                        index: 0,
                                        routes: [{ name: 'Home' }],
                                    }),
                                );
                            })
                            .catch((e) => {
                                console.log('SignUp: cadastrar(01):' + e);
                            });
                    })
                    .catch((e) => {
                        console.log('SignUp: cadastrar(02):' + e);
                        switch (e.code) {
                            case 'auth/email-already-in-use':
                                Alert.alert('Erro', 'Email já esta em uso.');
                                break;
                            case 'auth/operation-not-allowed':
                                aAlert.alert('Erro', 'Problemas ao fazer o cadastro.');
                                break;
                            case 'auth/invalid-email':
                                Alert.alert('Erro', 'Email Inválido.');
                                break;
                            case 'auth/weak-password':
                                Alert.alert('Erro', 'Senha Fraca. Digite uma senha Forte.');
                                break;
                        }
                    })
            } else {
                Alert.alert('Erro', 'As Senhas Diferem');
            }
        } else {
            Alert.alert('Erro', 'Por Favor, preencha todos os campos');
        }
    };
    return (
        <Body >
            <TextInput
                placeholder="Nome Completo"
                keyboardType="default"
                returnKeyType="next"
                onChangeText={(t) => setNome(t)}
                onEndEditing={() => this.emailTextInput.focus()}
            />
            <TextInput
                ref={(ref) => {
                    this.emailTextInput = ref;
                }}
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={(t) => setEmail(t)}
                onEndEditing={() => this.senhaTextInput.focus()}
            />
            <TextInput
                ref={(ref) => {
                    this.senhaTextInput = ref;
                }}
                placeholder="Senha"
                keyboardType="default"
                returnKeyType="next"
                secureTextEntry={true}
                onChangeText={(t) => setSenha(t)}
                onEndEditing={() => this.confirmaSenhaTextInput.focus()}
            />
            <TextInput
                ref={(ref) => {
                    this.confirmaSenhaTextInput = ref;
                }}
                placeholder="Confirmar Senha"
                keyboardType="default"
                returnKeyType="send"
                secureTextEntry={true}
                onChangeText={(t) => setConfirmaSenha(t)}
                onEndEditing={() => cadastrar()}
            />
            <MeuButton texto={"Cadastrar"} onClick={cadastrar} />
        </Body>
    );
};

export default SignUp;