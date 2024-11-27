import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Pressable, Alert } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../components/FirebaseConfig.js';

function Cadastro() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  const validarCampos = () => {
    if (!nome || !email || !senha || !telefone || !cep) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return false;
    }
    if (senha.length < 8) {
      Alert.alert("Erro", "A senha deve ter pelo menos 8 caracteres.");
      return false;
    }

    return true;
  };

  const handleCadastro = async () => {
    if (!validarCampos()) return;

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await updateProfile(user, { displayName: nome });

      await addDoc(collection(db, "usuarios"), {
        uid: user.uid,
        nome,
        email,
        cep,
        telefone,
      });

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.navigate('Login');
    } catch (error) {
      console.error("Erro no cadastro:", error);
      Alert.alert("Erro", "Ocorreu um erro ao realizar o cadastro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Fazer cadastro</Text>
    
        <TextInput
          style={styles.inputField}
          placeholder="Nome Completo"
          onChangeText={setNome}
          value={nome}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.inputField}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.inputField}
          placeholder="Senha"
          onChangeText={setSenha}
          value={senha}
          secureTextEntry={true}
        />
    
        <TextInput
          style={styles.inputField}
          placeholder="CEP"
          onChangeText={setCep}
          value={cep}
          keyboardType="number-pad"
          maxLength={8}
        />
    
        <TextInput
          style={styles.inputField}
          placeholder="Telefone"
          onChangeText={setTelefone}
          value={telefone}
          keyboardType="phone-pad"
        />

        <Pressable 
          style={[styles.submitButton, isLoading && styles.disabledButton]} 
          onPress={handleCadastro}
          disabled={isLoading}
        >
          <Text style={styles.textButton}>
            {isLoading ? "Cadastrando..." : "Fazer cadastro"}
          </Text>
        </Pressable>

        <Pressable style={styles.loginButton} onPress={handleNavigateToLogin}>
          <Text style={styles.textLoginButton}>Já tem uma conta? Faça login</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e212d',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B5341',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputField: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#3B5341',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#a0a0a0',
  },
  textButton: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 15,
  },
  textLoginButton: {
    color: '#3B5341',
    textAlign: 'center',
  },
});

export default Cadastro;