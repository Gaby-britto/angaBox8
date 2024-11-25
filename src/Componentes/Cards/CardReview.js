import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Usando o useRoute para pegar o movieId passado por navegação
  const route = useRoute();
  const { movieId } = route.params || {};  // movieId vindo dos parâmetros de navegação

  // Função para obter detalhes do filme e do usuário
  const getMovieAndUser = async () => {
    if (!movieId) {
      console.warn('ID do filme não fornecido');
      setLoading(false);
      return;
    }

    try {
      // 1. Buscar detalhes do filme
      const movieResponse = await axios.get(`http://192.168.3.6:8080/api/movie/${movieId}`);
      const movieData = movieResponse.data;
      setMovie(movieData);

      // 2. Usar o userId para buscar o usuário
      const userResponse = await axios.get(`http://192.168.3.6:8080/api/user/${movieData.userId}`);
      setUser(userResponse.data);

      setLoading(false); // Finaliza o carregamento
    } catch (error) {
      console.error('Erro ao carregar filme ou usuário:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieAndUser();
  }, [movieId]); // Recarrega sempre que o movieId mudar

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9400D3" />
      </View>
    );
  }

  if (!movie || !user) {
    return (
      <View style={styles.container}>
        <Text>Erro ao carregar dados do filme ou usuário</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.movieTitle}>{movie.title}</Text>
      <Text style={styles.movieDescription}>{movie.description}</Text>
      <Text style={styles.userName}>Publicado por: {user.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    color: '#9400D3',
  },
});
