import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import Header from "../../Componentes/Header/Header";
import Banner from "../../Componentes/Banner";
import CardMovie from "../../Componentes/Cards/CardMovie";
import Texts from "../../Componentes/Text";
import Footer from "../../Componentes/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import CardVideo from "../../Componentes/Cards/Card2";

export default function Home() {
    // Estado para armazenar os dados do usuário
    const [user, setUserState] = useState(null);
    const route = useRoute();
    const { id } = route.params || {}; // Obtém o ID das rotas ou um valor padrão vazio
   
    // Função para buscar os dados do usuário
    const listUser = async () => {
      try {
        const response = await axios.get(`http://192.168.3.6:8080/api/user/${id}`);
        setUserState(response.data.user); // Atualiza o estado com os dados do usuário
        console.log("Usuário:", response.data.user);
        console.log("Resposta da API:", response.data);
      } catch (error) {
        console.error("Erro ao buscar o usuário:", error.message);
        if (error.response) {
          console.error("Código de status da resposta:", error.response.status);
        }
      }
    };
   
    // Efeito para buscar os dados do usuário ao montar o componente
    useEffect(() => {
      if (id) {
        listUser();
      } else {
        console.warn("ID do usuário não fornecido.");
      }
    }, [id]);
   
   
    if (!user) {
      return (
        <View>
          <Text>Carregando...</Text>
        </View>
      );
    }
  return (
    <View style={styles.containerPricipal}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header user={user.nameUser} />
        <Banner />
        <Image
          style={styles.imageDecoration}
          source={require('../../Assets/Images/decoration.png')}
        />
        <Texts />

        <ScrollView
          horizontal
          style={styles.cardMovieContainer}
          showsHorizontalScrollIndicator={false}
        >
          {[...Array(4)].map((_, index) => (
            <CardMovie key={index} />
          ))}
        </ScrollView>

        <Texts />

        
        {[...Array(3)].map((_, index) => (
          <CardVideo key={index} />
        ))}
      </ScrollView>
      <Footer id={id}/>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPricipal: {
    flex: 1, 
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 60, 
  },
  cardMovieContainer: {
    flexDirection: "row",
    marginHorizontal: 5,
    paddingVertical: 5,
  },
  imageDecoration: {
    height: 30,
    marginTop: 10,
    marginLeft: 150,
    width: 100,
  },
});
