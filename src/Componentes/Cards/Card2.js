import React, { useEffect, useState } from "react";
import { StyleSheet, View, ImageBackground, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function CardVideo() {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const listMovies = async () => {
    try {
      const response = await axios.get("http://192.168.3.6:8080/api/movie");
      setMovies(response.data.movies);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    listMovies();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#9400D3" />
      ) : (
        movies.map((movie) => (
          <TouchableOpacity
            key={movie._id}
            style={styles.card}
            onPress={() => navigation.navigate('Review', { id: movie._id })}
          >
            <ImageBackground
              style={styles.imageBanner}
              source={{ uri: movie.img }}
              imageStyle={{ borderRadius: 10 }}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.subTitle}>{movie.gender}</Text>
            </View>


            <TouchableOpacity style={styles.iconButton}
              onPress={() => navigation.navigate('Review', { id: movie._id })}
            >
              <Ionicons name="create-outline" size={30} color="#9400D3" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap", // Permite que os cards se ajustem automaticamente
    justifyContent: "space-between", // Distribui os cards uniformemente
  },
  card: {
    flexDirection: "row", // Elementos alinhados horizontalmente
    flexBasis: "100%", // Cada card ocupa 100% da largura disponível
    height: 120, // Ajuste a altura do card
    marginVertical: 10, // Espaçamento vertical entre os cards
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center", // Centraliza verticalmente
    overflow: "hidden",
    padding: 10, // Espaçamento interno
  },
  imageBanner: {
    width: 100, // Define a largura da imagem
    height: "100%", // A imagem ocupa toda a altura do card
    borderRadius: 10,
    overflow: "hidden",
  },
  infoContainer: {
    marginLeft: 15, // Espaço entre a imagem e as informações
    flex: 1, // O texto ocupa o espaço restante
    justifyContent: "center", // Alinha o texto verticalmente
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    color: "gray",
  },
  iconButton: {
    marginLeft: 10, // Espaço entre o texto e o botão
    justifyContent: "center", // Centraliza verticalmente
  },
});
