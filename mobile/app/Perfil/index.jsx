import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, TextInput, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const Perfil = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [nome, setNome] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [nomeInput, setNomeInput] = useState('');
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const savedImageUri = await AsyncStorage.getItem('profileImage');
      const savedNome = await AsyncStorage.getItem('profileName');

      if (savedImageUri) setImageUri(savedImageUri);
      if (savedNome) setNome(savedNome);
    };

    loadData();
  }, []);

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

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      await AsyncStorage.setItem('profileImage', uri);
    }
  };

  const saveNome = async () => {
    setNome(nomeInput);
    setIsEditing(false);
    await AsyncStorage.setItem('profileName', nomeInput);
  };

  const logout = () => {
    Alert.alert('Deslogado', 'Você foi deslogado com sucesso!');
    navigation.navigate('Login');
  };

  const goBackToInicio = () => {
    navigation.navigate('Inicio');
  };

  const openPasswordModal = () => {
    setIsPasswordModalVisible(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalVisible(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Erro', 'As novas senhas não coincidem');
      return;
    }
    Alert.alert('Sucesso', 'Senha alterada com sucesso');
    closePasswordModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={imageUri ? { uri: imageUri } : require('../../assets/images/icone.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        {isEditing ? (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.input}
              value={nomeInput}
              onChangeText={setNomeInput}
              placeholder="Digite seu nome"
              placeholderTextColor="#B3B3B3"
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveNome}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.nameContainer}>
            <Text style={styles.nome}>{nome || 'Seu Nome Aqui'}</Text>
            <TouchableOpacity onPress={() => {
              setNomeInput(nome);
              setIsEditing(true);
            }} style={styles.editNameButton}>
              <Text style={styles.editNameButtonText}>Alterar Nome</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={goBackToInicio}>
        <Text style={styles.buttonText}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openPasswordModal}>
        <Text style={styles.buttonText}>Alterar Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Deslogar</Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Inicio')} style={styles.navIcon}>
          <Ionicons name="home-outline" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isPasswordModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closePasswordModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Alterar Senha</Text>

            <TextInput
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Nova Senha"
              placeholderTextColor="#B3B3B3"
              secureTextEntry
            />

            <TextInput
              style={styles.input}
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              placeholder="Confirmar Nova Senha"
              placeholderTextColor="#B3B3B3"
              secureTextEntry
            />

            <TouchableOpacity style={[styles.saveButton, styles.closeButton]} onPress={closePasswordModal}>
              <Text style={styles.saveButtonText}>Alterar Senha</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#F25F5C',
    resizeMode: 'cover',
  },
  nome: {
    fontSize: 26,
    color: '#FFF',
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  nameContainer: {
    alignItems: 'center',
  },
  editNameButton: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editNameButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 250,
    backgroundColor: '#333',
    color: '#FFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#F25F5C',
  },
  passwordInput: {
    borderColor: '#F00',
  },
  saveButton: {
    backgroundColor: '#F25F5C',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#333',
    width: '80%',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#F25F5C',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#121212',
  },
  navIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#121212',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: '700',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#F25F5C',  // Novo tom de vermelho
    marginTop: 10,
  },
});

export default Perfil;
