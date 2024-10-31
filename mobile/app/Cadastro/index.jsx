import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Cadastro = ({ onSwitchToLogin, onRegister }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleBirthDateChange = (text) => {
    
    let formattedText = text.replace(/[^0-9]/g, '');

   
    if (formattedText.length > 2 && formattedText.length <= 4) {
      formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2)}`;
    } else if (formattedText.length > 4) {
      formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2, 4)}/${formattedText.slice(4, 8)}`;
    }
    
    setBirthDate(formattedText);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>SPOTIFAKE</Text>
      <TextInput 
        placeholder="Nome" 
        value={name} 
        onChangeText={setName} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Sobrenome" 
        value={surname} 
        onChangeText={setSurname} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Data de Nascimento (DD/MM/AAAA)" 
        value={birthDate} 
        onChangeText={handleBirthDateChange} 
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
      <Button title="Cadastrar" onPress={onRegister} color="#1DB954" />
      
      <TouchableOpacity onPress={onSwitchToLogin} style={styles.link}>
        <Text style={styles.linkText}>Se já tiver conta, entre</Text>
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
  }
});

export default Cadastro;
