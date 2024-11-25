import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function CardReviewAdmin() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const listAllReviews = async () => {
    try {
      const response = await axios.get('http://192.168.3.6:8080/api/post');
      setReviews(response.data.posts || []); // Use "posts" baseado na API
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar reviews:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.3.6:8080/api/post/${id}`);
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
      console.log(`Review ${id} deletado com sucesso.`);
    } catch (error) {
      console.error("Erro ao deletar a review:", error);
    }
  };

  useEffect(() => {
    listAllReviews();
  }, []);

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9400D3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>REVIEWS</Text>
      <View style={styles.divider} />
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <View key={review.id} style={styles.reviewContainer}>
            <Text style={styles.reviewText}>{review.content}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(review.id)}
            >
              <Ionicons name="trash-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>Nenhuma review encontrada.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#9400D3',
    fontFamily: 'Montserrat_700Bold',
  },
  divider: {
    height: 1.5,
    backgroundColor: '#9400D3',
    marginVertical: 10,
  },
  reviewContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  reviewText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Montserrat_400Regular',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#9400D3',
    padding: 8,
    borderRadius: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
  },
});
