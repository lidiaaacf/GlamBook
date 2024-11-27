import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Perfil from './Perfil';

function Login() {
  const auth = getAuth();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuário logado com sucesso:", userCredential.user);
      navigation.navigate('Perfil');
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      let mensagemErro = "Ocorreu um erro ao fazer login. Tente novamente.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        mensagemErro = "E-mail ou senha incorretos.";
      }
      Alert.alert("Erro de Login", mensagemErro);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/favicon.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />

      <Pressable 
        style={[styles.pressable, isLoading && styles.pressableDisabled]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.textPressable}>
          {isLoading ? "Carregando..." : "Entrar"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e212d',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B5341',
    marginBottom: 20,
    marginTop: 0
  },
  input: {
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#fff',
    color: '#00C2FF',
    marginBottom: 10,
  },
  pressable: {
    width: 300,
    height: 40,
    padding: 10,
    backgroundColor: '#3B5341',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressableDisabled: {
    backgroundColor: '#7D8F81',
  },
  textPressable: {
    color: '#fff',
    textAlign: "center"
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 0,
  },
});

export default Login;