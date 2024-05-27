import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import firebaseConfig from './firebaseConfig.js'; // Ensure this is the correct path

// Initialize Firebase
initializeApp(firebaseConfig);

export default function Timetable({ route }) {
  const { imageName } = route.params; // Assuming you are passing imageName via route params
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const storage = getStorage();
        const reference = ref(storage, imageName); // Use the dynamic imageName
        const imageUrl = await getDownloadURL(reference);
        setUrl(imageUrl);
      } catch (err) {
        console.error("Error fetching image URL:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (url === null) {
      fetchImageUrl();
    }
  }, [imageName, url]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error fetching image.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {url ? (
        <Image
          style={styles.image}
          source={{ uri: url }}
          resizeMode='contain'
        />
      ) : (
        <Text>No image found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#123456',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#123456',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#123456',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
