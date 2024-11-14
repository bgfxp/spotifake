import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Inicio = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao SPOTIFAKE!</Text>
      <Text style={styles.description}>Aproveite sua música favorita</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Perfil')}
      >
        <Text style={styles.buttonText}>Ir para o Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#121212', 
    paddingHorizontal: 20,
  },
  title: { 
    fontSize: 42, 
    color: '#F25F5C', 
    fontWeight: '900', 
    fontFamily: 'sans-serif-medium', 
    textAlign: 'center', 
    marginBottom: 20,
  },
  description: { 
    fontSize: 20, 
    color: '#FFFFFF', 
    textAlign: 'center', 
    marginBottom: 30,
    fontFamily: 'sans-serif-light', 
  },
  button: {
    backgroundColor: '#F25F5C',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Inicio;
