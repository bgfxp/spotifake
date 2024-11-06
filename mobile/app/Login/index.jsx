import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      window.alert('ERRO: Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/Login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email,
          senha: password 
        }),
      });

      if (response.status === 404) {
        window.alert('ERRO: Usuário não cadastrado!');
        return
      } else if (response.status === 406) {
        window.alert('ERRO: Preencha todos os campos!');
        return
      } else if (response.status === 403) {
        window.alert('ERRO: Senha incorreta!');
        return
      } else if (response.status === 200) {
        navigation.navigate('Inicio');
      } else if (response.status === 500) {
        window.alert('ERRO: Ocorreu um erro inesperado');
        return
      } else {
        window.alert('ERRO: Resposta desconhecida do servidor');
        return
      }
    } catch (error) {
      window.alert('ERRO: Não foi possível conectar ao servidor');
      return
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SPOTIFAKE</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.link}>
        <Text style={styles.linkText}>Se não tiver conta, cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#121212' 
  },
  title: { 
    fontSize: 48, 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#1DB954', 
    fontWeight: 'bold' 
  },
  input: { 
    padding: 15, 
    borderColor: '#1DB954', 
    borderWidth: 1, 
    borderRadius: 5, 
    marginBottom: 15, 
    backgroundColor: '#FFFFFF' 
  },
  link: { 
    marginTop: 15, 
    alignItems: 'center' 
  },
  linkText: { 
    color: '#1DB954', 
    textDecorationLine: 'underline' 
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'green',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});


export default Login;
