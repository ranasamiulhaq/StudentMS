import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import firebaseConfig from './firebaseConfig.js'; // Ensure this is the correct path
import ImageViewer from 'react-native-image-zoom-viewer';

// Initialize Firebase
initializeApp(firebaseConfig);

export default function Timetable({ route }) {
  const imageName  ="TimeTable.jpg" ; // Assuming you are passing imageName via route params
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

  const images = [{ url }];

  return (
    <View style={styles.container}>
      <ImageViewer
        imageUrls={images}
        enableSwipeDown
        renderIndicator={() => null} // Optionally, you can hide the indicator
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#123456',
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
});
