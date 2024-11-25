import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../Componentes/Header/Header";
import Banner from "../../Componentes/Banner";
import CardMovie from "../../Componentes/Cards/CardMovie";
import Texts from "../../Componentes/Text";
import CardVideo from "../../Componentes/Cards/Card2";
import FooterAdmin from "../../Componentes/Footer/FooterAdmin";
import CardMovieAdmin from "../../Componentes/Cards/CardMovieadmin";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import CardVideoAdmin from "../../Componentes/Cards/Card2Admin";

export default function HomeAdmin() {
  // Estado para armazenar os dados do usuário
  const [user, setUserState] = useState(null);
  const route = useRoute();
  const { id } = route.params || {}; // Obtém o ID das rotas ou um valor padrão vazio
 console.log("id do adm",id);
 
  // Função para buscar os dados do usuário
  const listUser = async () => {
    try {
      const response = await axios.get(`http://192.168.3.6:8080/api/adm/${id}`);
      setUserState(response.data.adm); // Atualiza o estado com os dados do usuário
      console.log("Usuário:", response.data.adm);
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
        <Header user={user.nameUser}/>
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
            <CardMovieAdmin key={index} />
          ))}
        </ScrollView>

        <Texts />

        {[...Array(3)].map((_, index) => (
          <CardVideoAdmin key={index} />
        ))}
      </ScrollView>
      <FooterAdmin />
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
