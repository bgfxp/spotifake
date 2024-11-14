import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Cadastro from './Cadastro';
import Inicio from './Inicio';
import OpcaoPerfil from './Perfil';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Cadastro" screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="Cadastro" 
          component={Cadastro} 
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
        />
        <Stack.Screen 
          name="Inicio" 
          component={Inicio} 
        />
         <Stack.Screen 
          name="Perfil" x  
          component={OpcaoPerfil}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
