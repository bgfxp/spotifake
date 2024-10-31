import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Inicio = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao SPOTIFAKE!</Text>
      <Text style={styles.description}>Aproveite sua música favorita</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#121212', 
    paddingHorizontal: 20
  },
  title: { 
    fontSize: 42, 
    color: '#1DB954', 
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
  footer: { 
    fontSize: 16, 
    color: '#AAAAAA', 
    textAlign: 'center', 
    fontFamily: 'sans-serif-thin', 
    position: 'absolute', 
    bottom: 20
  }
});

export default Inicio;
