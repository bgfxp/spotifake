import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Cadastro = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('ERRO: As senhas não coincidem');
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
        alert('ERRO: Usuário já cadastrado!');
      } else if (response.status === 406) {
        alert('ERRO: Preencha todos os campos!');
      } else if (response.status === 201) {
        navigation.navigate('Inicio');
      } else {
        alert('ERRO: Ocorreu um erro inesperado');
      }
    } catch (error) {
      alert('ERRO: Não foi possível conectar ao servidor');
    }
  };

  
  const handleBirthDateChange = (value) => {
    
    let formattedValue = value.replace(/\D/g, '');
    
    
    if (formattedValue.length >= 3) {
      formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
    }
    if (formattedValue.length >= 6) {
      formattedValue = `${formattedValue.slice(0, 5)}/${formattedValue.slice(5, 9)}`;
    }
    setBirthDate(formattedValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SPOTIFAKE</Text>
      <TextInput 
        placeholder="Nome" 
        value={firstName} 
        onChangeText={setFirstName} 
        style={styles.input} 
        placeholderTextColor="#9DA3B4"
      />
      <TextInput 
        placeholder="Sobrenome" 
        value={lastName} 
        onChangeText={setLastName} 
        style={styles.input} 
        placeholderTextColor="#9DA3B4"
      />
      <TextInput 
        placeholder="Data de Nascimento (DD/MM/AAAA)" 
        value={birthDate} 
        onChangeText={handleBirthDateChange} 
        style={styles.input} 
        keyboardType="numeric"
        maxLength={10} 
        placeholderTextColor="#9DA3B4"
      />
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
      <TextInput 
        placeholder="Confirmar Senha" 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
        style={styles.input} 
        secureTextEntry 
        placeholderTextColor="#9DA3B4"
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
  linkText: { 
    color: '#F25F5C', 
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#F25F5C',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: 1,
  },
});

export default Cadastro;
