import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const OpcaoPerfil = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar sua galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const logout = () => {
    Alert.alert('Deslogado', 'Você foi deslogado com sucesso!');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image 
        source={imageUri ? { uri: imageUri } : require('../../assets/images/icone.png')} 
        style={styles.image} 
      />
      <TouchableOpacity 
        style={styles.editPhotoButton} 
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>Editar Foto</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('EditarPerfil')}
      >
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Configuracoes')}
      >
        <Text style={styles.buttonText}>Configurações</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={logout}
      >
        <Text style={styles.buttonText}>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#0D0F14', 
    padding: 20 
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  editPhotoButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#F25F5C',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginVertical: 10,
    alignItems: 'center',
    width: '80%',
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
  },
});

export default OpcaoPerfil;
