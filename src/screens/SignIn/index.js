/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {TextInput} from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import MeuButton from '../../components/MeuButton';
import {COLORS} from '../../assets/colors';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Loading from '../../components/Loading';
import {AuthUserContext} from '../../context/AuthUserProvider';

const SignIn = ({navigation}) => {
  // console.log(app);
  // console.log(auth);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const {signIn} = useContext(AuthUserContext);

  const recuperarSenha = () => {
    // alert('abrir modal recuperar senha');
    navigation.navigate('ForgotPassword');
  };

  async function storeUserSession(email, senha) {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          email,
          senha,
        }),
      );
    } catch (error) {
      console.error('SignIn, storeUserSession: ' + error);
    }
  }

  const cadastrar = () => {
    // alert('vai para signup');
    navigation.navigate('SignUp');
  };

  const entrar = async () => {
    let msgError = '';
    if (email && senha) {
      setLoading(true);
      msgError = await signIn(email, senha);
      if (msgError === 'ok') {
        setLoading(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AppStack'}],
          }),
        );
      } else {
        setLoading(false);
        Alert.alert('Ops!', msgError);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.divSuperior}>
          <Image
            style={styles.image}
            source={require('../../assets/images/logo.png')}
            accessibilityLabel={'logo do app'}
          />
          <TextInput
            placeholderTextColor="gray"
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={t => setEmail(t)}
          />
          <TextInput
            placeholderTextColor="gray"
            style={styles.input}
            secureTextEntry={true}
            placeholder="Senha"
            keyboardType="default"
            returnKeyType="send"
            onChangeText={t => setSenha(t)}
          />
          <Text style={styles.textEsqueceuSenha} onPress={recuperarSenha}>
            Esqueceu sua senha?
          </Text>
          <MeuButton texto={'ENTRAR'} onClick={entrar} />
        </View>
        <View style={styles.divInferior}>
          <View style={styles.ouHr}>
            <View style={styles.hr} />
            <Text style={styles.ou}>OU</Text>
            <View style={styles.hr} />
          </View>
          <View style={styles.cadastrarSe}>
            <Text style={styles.texto}>Não tem uma conta?</Text>
            <Text style={styles.cadastrarSeTexto} onPress={cadastrar}>
              Cadastre-se
            </Text>
          </View>
        </View>
      </ScrollView>
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  texto: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  divSuperior: {
    flex: 5,
    alignItems: 'center',
    backgroundColor: COLORS.secundary,
  },
  divInferior: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: COLORS.secundary,
  },
  image: {
    height: 150,
    width: 150,
    margin: 5,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: 'black',
    borderBottomWidth: 2,
    fontSize: 16,
    paddingLeft: 2,
    paddingBottom: 1,
    color: 'black',
  },
  textEsqueceuSenha: {
    color: COLORS.accentSeccundary,
    fontSize: 15,
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 20,
    marginBottom: 10,
  },
  ouHr: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ou: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 16,
    color: COLORS.gray,
  },
  hr: {
    width: '30%',
    height: 1,
    borderBottomWidth: 2,
  },
  cadastrarSe: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cadastrarSeTexto: {
    fontSize: 18,
    color: COLORS.accentSeccundary,
    marginLeft: 5,
  },
});
