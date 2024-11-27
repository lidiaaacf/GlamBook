import React from "react";
import { View, Text, Image, KeyboardAvoidingView, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Login from './Login.js';
import Cadastro from './Cadastro.js';

function Home() {

    const navigation = useNavigation(); 
  
    const handleNavigateToLogin = () => {
      navigation.navigate(Login); 
    };

    const handleNavigateToCadastro = () => {
      navigation.navigate(Cadastro); 
    };
  
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../assets/favicon.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Sua beleza cabe na sua rotina!</Text>
        </View>
  
        <View style={styles.buttonsContainer}>
          <Text style={styles.text}>JÁ POSSUI UMA CONTA?</Text>
          <Pressable style={styles.button} onPress={handleNavigateToLogin}>
            <Text style={styles.textButton}>LOGIN</Text>
          </Pressable>

          <Text style={styles.text}>PRIMEIRA VEZ POR AQUI?</Text>
          <Pressable style={styles.button} onPress={handleNavigateToCadastro}>
            <Text style={styles.textButton}>CADASTRAR</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1e212d',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      alignItems: 'center',
      marginBottom: 40,
    },
    logo: {
      width: 200,
      height: 200,  
      marginBottom: 20,
    },      
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#3B5341', 
      textAlign: 'center',
    },
    buttonsContainer: {
      width: '100%',
      alignItems: 'center', 
    },
    button: {
      backgroundColor: '#3B5341',
      padding: 15,
      borderRadius: 8,
      marginBottom: 30, 
      width: '80%',
      alignItems: 'center',
    },
    textButton: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    text: {
      color: '#fff',
      marginBottom: 10,
      fontSize: 14,
    },
  });

export default Home;