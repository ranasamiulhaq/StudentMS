import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, ProgressBarAndroid, TextInput } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const UploadSyllabus = () => {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [className, setClassName] = useState('');
  const [classNameSet, setClassNameSet] = useState(false);

  const pickImage = async () => {
    let result = await launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async () => {
    if (!imageUri || !className) return;

    setUploading(true);
    setProgress(0);
    const filename = `${className}.jpg`; // Set the filename to the class name
    const uploadUri = imageUri.replace('file://', '');

    const task = storage()
      .ref(filename)
      .putFile(uploadUri);

    task.on('state_changed', snapshot => {
      const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(percent);
    });

    try {
      await task;
      setUploaded(true);
      Alert.alert('Success', 'Image uploaded to the bucket!');
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async () => {
    if (!className) return;

    const filename = `${className}.jpg`; // The filename to remove

    try {
      await storage().ref(filename).delete();
      setImageUri(null);
      setUploaded(false);
      Alert.alert('Success', 'Image removed from the bucket!');
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Failed to remove image');
    }
  };

  const handleClassNameChange = (text) => {
    setClassName(text);
    setClassNameSet(text.trim().length > 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>University Syllabus Upload</Text>
      </View>
      <Text style={styles.title}>Upload Class Syllabus</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Class Name"
        value={className}
        onChangeText={handleClassNameChange}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, !classNameSet && styles.buttonDisabled]}
          onPress={pickImage}
          disabled={!classNameSet}
        >
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.uploadButton, (!imageUri || !classNameSet) && styles.buttonDisabled]}
          onPress={uploadImage}
          disabled={!imageUri || !classNameSet}
        >
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>

      </View>
      {uploading ? (
        <View style={styles.progressContainer}>
          <Text>Uploading: {Math.round(progress)}%</Text>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={progress / 100}
            color="#6200ee"
            style={styles.progressBar}
          />
          <ActivityIndicator size="large" color="#6200ee" />
        </View>
      ) : (
        imageUri && (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    width: '100%',
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    marginBottom: 30,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 25,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  uploadButton: {
    backgroundColor: '#00c853',
  },
  removeButton: {
    backgroundColor: '#d32f2f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 20,
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  progressBar: {
    width: '80%',
    marginVertical: 10,
  },
});

export default UploadSyllabus;
