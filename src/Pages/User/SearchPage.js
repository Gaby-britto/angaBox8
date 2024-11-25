import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../Componentes/Header/Header";
import Search from "../../Componentes/Search";
import CardMovie from "../../Componentes/Cards/CardMovie";
import Footer from "../../Componentes/Footer/Footer";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

export default function SearchPage() {
  const [user, setUser] = useState(null);
  const route = useRoute();
  const { id } = route.params || {};

  const fetchUser = async () => {
    try {
      console.log("ID:", id);

      const response = await axios.get(`http://192.168.3.6:8080/api/user/${id}`);
      setUser(response.data.user);
      console.log("Usuário:", response.data.user);
      console.log("Resposta da API:", response.data);
    } catch (error) {
      console.error("Erro ao buscar o usuário:", error.message);
      if (error.response) {
        console.error("Código de status da resposta:", error.response.status);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchUser();
    } else {
      console.warn("ID do usuário não fornecido.");
      console.log("ID:", id);
    }
  }, [id]);

  /* if (!user) {
    return (
      <View>
        <Text>Teste</Text>
      </View>
    );
  } */

  return (
    <View style={styles.container}>
      <Text>Teste</Text>
      <Header user='teste'/>
      <Search/>
      <ScrollView>
        <CardMovie />
        <CardMovie />
        <CardMovie />
        <CardMovie />
        <CardMovie />
      </ScrollView>
      <Footer id={id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 60,
  },
});

