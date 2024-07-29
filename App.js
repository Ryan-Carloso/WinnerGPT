import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, Button, SafeAreaView } from 'react-native';
import axios from 'axios';

const generateImageUrl = (teamName) => {
  // Replace spaces with URL-encoded '%20'
  const formattedTeamName = teamName.replace(/ /g, '%20');
  return `https://tlaihqorrptgeflxarvm.supabase.co/storage/v1/object/public/Teamsn/badges/${formattedTeamName}.png?t=2024-07-29T18%3A34%3A53.721Z`;
};

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://api-alpha-umber.vercel.app/data');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Error fetching data: {error.message}</Text>
          <Button title="Retry" onPress={fetchData} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {data.map((item) => {
          const teams = item.game.split(' vs ');
          const homeTeam = teams[0].trim();
          const awayTeam = teams[1].trim();
          return (
            <View key={item.id} style={styles.gameContainer}>
              <Text style={styles.title}>{item.game}</Text>
              <Text style={styles.date}>{item.date}</Text>
              <View style={styles.imagesContainer}>
                <Image style={styles.image} source={{ uri: generateImageUrl(homeTeam) }} />
                <Text style={styles.vsText}>vs</Text>
                <Image style={styles.image} source={{ uri: generateImageUrl(awayTeam) }} />
              </View>
              <Text style={styles.winner}>Potential Winner: {item.winnerteam}</Text>
              <Text style={styles.analysis}>{item.analysis}</Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  gameContainer: {
    marginBottom: 20,
    padding: 10,
    margin: 'auto',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    margin: 'auto',
  },
  date: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
    margin: 'auto'
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    margin: 'auto'
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
  },
  vsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  winner: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
    margin: 'auto'
  },
  analysis: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
});