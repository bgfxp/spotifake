import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const playlists = [
    { id: '1', title: 'do BG', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN4rMCUmUowk1viDkd7fobW0_kXl00eG0iEA&s' },
    { id: '2', title: 'Dj Narru', cover: 'https://i1.sndcdn.com/avatars-E3dpb5AMWNBUl3Dy-YrbDjg-t1080x1080.jpg' },
    { id: '3', title: 'Celebridade', cover: 'https://i.ytimg.com/vi/2DXQqIat098/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCwYuOXMpFXXjNdMQZKUveSqQQ1Ew' },
    { id: '4', title: 'Mc Negão Original', cover: 'https://akamai.sscdn.co/uploadfile/letras/fotos/9/f/0/8/9f08dee8da764b3e76b240b339e77ebe.jpg' }, 
    { id: '5', title: 'Mc Ig', cover: 'https://i.scdn.co/image/ab6761610000517465cdcae2cae45e4b774c51af' },
  ];

  const recentlyPlayed = [
    { id: '6', title: 'Joazinho VT', cover: 'https://lastfm.freetls.fastly.net/i/u/ar0/7005fde8509017769a439a98cd10722d.jpg' },
    { id: '7', title: 'Lets Go', cover: 'https://i.ytimg.com/vi/WLMsXf8IbBw/maxresdefault.jpg' },
    { id: '8', title: 'Fenix', cover: 'https://i1.sndcdn.com/artworks-Va6HDul2qLpi6Ldb-Rgy2LQ-t500x500.jpg' },
    { id: '9', title: 'ASTROWORLD', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfIG0Nd05ZV9o4RBlf52ezKX1-pFoWVhu_yg&s' },
    { id: '10', title: 'Musicas 2015, 2016', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH7wmp4bAvRK1nW-_u_0QVk-obtVvkbWii_w&s' },
    { id: '11', title: 'Mc Poze', cover: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRI5tWj36K8QJEtcHMYetJwKEpr_S2f8GFVWL_7_hVbqozEnH7drEHxJjuCngjp5KUPu-_FUluErq8CCKc6QbmW8Q' },
  ];

  const songs = [
    { id: '1', title: 'Mensagem', artist: 'MC Kevin' },
    { id: '2', title: 'Pandemia', artist: 'Mc Kevin, Pereira DJ' },
    { id: '3', title: 'Arco-iris', artist: 'MC Kevin, Pereira DJ' },
    { id: '4', title: 'Velho Ditado', artist: 'MC Kevin' },
    { id: '5', title: 'Comendo Bem', artist: 'MC Kevin, Mc Don Juan, Pereira DJ' },
  ];

  const renderPlaylistItem = ({ item }) => (
    <View style={styles.playlistItem}>
      <Image source={{ uri: item.cover }} style={styles.playlistImage} />
      <Text style={styles.playlistTitle}>{item.title}</Text>
    </View>
  );

  const renderSongItem = ({ item }) => (
    <View style={styles.songItem}>
      <Text style={styles.songTitle}>{item.title}</Text>
      <Text style={styles.songArtist}>{item.artist}</Text>
    </View>
  );

  const openModal = (title) => {
    if (title === 'Fenix') {
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Ionicons name="settings-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.greeting}>Spotifake</Text>
        <View></View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.quickPlayContainer}>
          {playlists.slice(0, 6).map((item) => (
            <View key={item.id} style={styles.quickPlayItem}>
              <Image source={{ uri: item.cover }} style={styles.quickPlayImage} />
              <Text style={styles.quickPlayTitle}>{item.title}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Recentes</Text>
        <FlatList
          data={recentlyPlayed}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openModal(item.title)}>
              {renderPlaylistItem({ item })}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        <Text style={styles.sectionTitle}>Playlists </Text>
        <FlatList
          data={playlists}
          renderItem={renderPlaylistItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Músicas do Álbum "Fenix"</Text>
            <FlatList
              data={songs}
              renderItem={renderSongItem}
              keyExtractor={(item) => item.id}
            />
            <Button title="Fechar" onPress={closeModal} />
          </View>
        </View>
      </Modal>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Library')}>
          <Ionicons name="library-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#121212',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  quickPlayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  quickPlayItem: {
    width: '48%',
    backgroundColor: '#282828',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  quickPlayImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  quickPlayTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
  playlistItem: {
    marginRight: 16,
    alignItems: 'center',
  },
  playlistImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  songItem: {
    marginBottom: 15,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
  },
  songArtist: {
    color: '#aaa',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#121212',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 15,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#121212',
  },
});
