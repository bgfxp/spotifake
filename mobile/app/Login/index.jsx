import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Login = ({ onLogin, onSwitchToCadastro }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <Button title="Entrar" onPress={onLogin} color="#1DB954" />
      
      <TouchableOpacity onPress={onSwitchToCadastro} style={styles.link}>
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
    marginTop: 15, 
    alignItems: 'center' 
  },
  linkText: { 
    color: '#1DB954', 
    textDecorationLine: 'underline' 
  }
});

export default Login;
