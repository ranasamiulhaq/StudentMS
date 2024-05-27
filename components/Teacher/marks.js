import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';

function Marks({ route }) {
  const [subjects, setSubjects] = useState([]);
  const { classId } = route.params;
  const [open, setOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch subjects for the given class from db
    const fetchSubjects = async () => {
      try {
        console.log('Fetching subjects for class:', classId);
        const classRef = await firestore().collection('Classes').where('classId', '==', classId).get();
        
        if (!classRef.empty) {
          console.log('Class document found');
          const classData = classRef.docs[0].data();
          console.log('Class data:', classData);
          const classSubjects = classData.subjects || [];
          console.log('Class subjects:', classSubjects);
          setSubjects(classSubjects);
          setItems(classSubjects.map(subject => ({ label: subject, value: subject })));
        } else {
          console.log('No class document found for class ID:', classId);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, [classId]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Marks Portal</Text>
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Select Subject:</Text>
        <DropDownPicker
          open={open}
          value={selectedSubject}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedSubject}
          setItems={setItems}
          placeholder="Select a subject"
          onChangeValue={(value) => {
            console.log('Selected Subject:', value);
          }}
          style={styles.dropdown}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50, // Add some padding to position elements from the top
  },
  heading: {
    color: '#58B1F4',
    fontSize: 20,
    marginBottom: 20,
  },
  dropdownContainer: {
    width: '80%',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    width: '100%',
  },
});

export default Marks;
