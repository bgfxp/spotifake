import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Login from './Login';
import Cadastro from './Cadastro';
import Inicio from './Inicio';

const App = () => {
  const [currentPage, setCurrentPage] = useState('cadastro');

  return (
    <View style={styles.container}>
      {currentPage === 'cadastro' && (
        <Cadastro 
          onSwitchToLogin={() => setCurrentPage('login')} 
          onRegister={() => setCurrentPage('inicio')} 
        />
      )}
      {currentPage === 'login' && (
        <Login 
          onLogin={() => setCurrentPage('inicio')} 
          onSwitchToCadastro={() => setCurrentPage('cadastro')} // Redireciona para cadastro
        />
      )}
      {currentPage === 'inicio' && <Inicio />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export default App;
