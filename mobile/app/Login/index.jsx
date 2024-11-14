import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('ERRO: Por favor, preencha todos os campos.');
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
        alert('ERRO: Usuário não cadastrado!');
      } else if (response.status === 406) {
        alert('ERRO: Preencha todos os campos!');
      } else if (response.status === 403) {
        alert('ERRO: Senha incorreta!');
      } else if (response.status === 200) {
        navigation.navigate('Inicio');
      } else if (response.status === 500) {
        alert('ERRO: Ocorreu um erro inesperado');
      } else {
        alert('ERRO: Resposta desconhecida do servidor');
      }
    } catch (error) {
      alert('ERRO: Não foi possível conectar ao servidor');
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
        placeholderTextColor="#9DA3B4"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#9DA3B4"
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
    backgroundColor: '#0D0F14', 
  },
  title: { 
    fontSize: 42, 
    textAlign: 'center', 
    marginBottom: 30, 
    color: '#F25F5C', 
    fontWeight: 'bold', 
    fontFamily: 'sans-serif-light', 
  },
  input: { 
    padding: 15, 
    borderColor: '#445B6C', 
    borderWidth: 1, 
    borderRadius: 10, 
    marginBottom: 20,
    backgroundColor: '#1F2733', 
    color: '#FFF',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#F25F5C',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 1,
  },
  link: { 
    alignItems: 'center', 
  },
  linkText: { 
    color: '#F25F5C', 
    textDecorationLine: 'underline', 
    fontSize: 16,
    marginTop: 10,
  },
});

export default Login;
