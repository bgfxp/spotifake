import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Cadastro = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      window.alert('ERRO: As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/registro', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: firstName,
          sobrenome: lastName,
          dataNascimento: birthDate,
          email: email,
          senha: password
        })
      });

      if (response.status === 400) {
        window.alert('ERRO: Usuário já cadastrado!');
      } else if (response.status === 406) {
        window.alert('ERRO: Preencha todos os campos!');
      } else if (response.status === 201) {
        navigation.navigate('Home');
      } else {
        window.alert('ERRO: Ocorreu um erro inesperado');
      }
    } catch (error) {
      window.alert('ERRO: Não foi possível conectar ao servidor');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>SPOTIFAKE</Text>
      <TextInput 
        placeholder="Nome" 
        value={firstName} 
        onChangeText={setFirstName} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Sobrenome" 
        value={lastName} 
        onChangeText={setLastName} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Data de Nascimento (DD/MM/AAAA)" 
        value={birthDate} 
        onChangeText={setBirthDate} 
        style={styles.input} 
        keyboardType="numeric"
        maxLength={10} 
      />
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
      <TextInput 
        placeholder="Confirmar Senha" 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
        style={styles.input} 
        secureTextEntry 
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>      
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Já tem uma conta? Faça Login</Text>
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
    fontWeight: 'bold', 
    fontFamily: 'sans-serif-condensed', 
  },
  input: { 
    padding: 15, 
    borderColor: '#1DB954', 
    borderWidth: 1, 
    borderRadius: 5, 
    marginBottom: 15,
    backgroundColor: '#FFFFFF', 
  },
  link: { 
    position: 'absolute', 
    bottom: 20, 
    right: 20 
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

export default Cadastro;
