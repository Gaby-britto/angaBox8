import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import MyButton from "../../Componentes/Button";
import Footer from "../../Componentes/Footer/Footer";
import CardReview from "../../Componentes/Cards/CardReview";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

export default function Review() {
  const route = useRoute();
  const { id } = route.params || {};
  const [movie, setMovie] = useState(null);
  const [content, setContent] = useState("");
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  const handleSubmitReview = async () => {
    const url = "http://192.168.3.6:8080/api/post";

    try {
      console.log({
        content
      });

      const response = await axios.post(url, {
        content: content, 
        
      });
      Alert.alert("Sucesso", "Review postada com sucesso!");
      console.log("Resposta do servidor:", response.data);
    } catch (error) {
      console.log("Erro na requisição:", error.message);
      if (error.response) {
        console.log("Erro detalhes:", error.response.data);
        Alert.alert(
          "Erro",
          "Falha ao registrar. Verifique os dados e tente novamente."
        );
      } else {
        Alert.alert("Erro", "Não foi possível conectar ao servidor.");
      }
    }
  };


  const listMovies = async () => {
    try {
      const response = await axios.get(
        `http://192.168.3.6:8080/api/movie/${id}`
      );
      setMovie(response.data.movieFound);
      console.log("resposta da API", response.data);
    } catch (error) {
      console.error("Erro ao buscar o filme:", error);
    }
  };

  useEffect(() => {
    listMovies();
  }, [id]);

  useEffect(() => {
    if (movie) {
      console.log("obj", movie);
      console.log("objeto", movie.title);
    }
  }, [movie]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9400D3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {movie && (
          <>
            <Image
              style={styles.imageHeader}
              source={require("../../Assets/Images/header.png")}
            />
            <Image style={styles.image} source={{ uri: movie.img }} />
            <Text style={styles.title}>
              {movie?.title || "Titulo indisponível"}
            </Text>
            <Text style={styles.question}>
              {movie?.description || "Descrição indisponível"}
            </Text>
          </>
        )}
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Write your review here..."
          value={content}
          onChangeText={setContent}
          multiline
        />
        <View style={styles.containerButton}>
          <MyButton title="Submit Review"  onPress={async () => {
          await handleSubmitReview();
        }} />
        </View>
        <CardReview />
      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  imageHeader: {
    position: "absolute",
    width: "100%",
    height: 200,
  },
  image: {
    width: 200,
    marginLeft: 10,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: "cover",
    marginTop: 100,
  },
  title: {
    marginLeft: 10,
    fontSize: 32,
    color: "black",
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
  },
  question: {
    textAlign: "justify",
    padding: 15,
    color: "gray",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    fontFamily: "Montserrat_400Regular",
  },
  input: {
    marginLeft: 10,
    marginTop: 20,
    height: 50,
    width: 390,
    borderColor: "#9400D3",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 5,
    fontFamily: "Montserrat_400Regular",
  },
  containerButton: {
    alignItems: "center",
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
    color: "#9400D3",
    fontFamily: "Montserrat_700Bold",
  },
  divider: {
    marginLeft: 10,
    flex: 1,
    height: 1.5,
    width: 385,
    backgroundColor: "#9400D3",
    marginVertical: 10,
  },
  reviewText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
    fontFamily: "Montserrat_400Regular",
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});
