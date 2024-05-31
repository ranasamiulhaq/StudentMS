import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TextInput, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';

function Marks({ route }) {
  const [subjects, setSubjects] = useState([]);
  const { classId, term } = route.params;

  const [open, setOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [items, setItems] = useState([]);
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [editableMarks, setEditableMarks] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalMarks, setTotalMarks] = useState(0);

  useEffect(() => {
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
          if(term === 'first' || term === 'mid') {
            setTotalMarks(25);
          }
          else if(term === 'final') {
            setTotalMarks(50);
          }
        } else {
          console.log('No class document found for class ID:', classId);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, [classId]);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        console.log('Fetching students for class:', classId);
        const studentsRef = await firestore().collection('Students')
          .where('classId', '==', classId)
          .get();
  
        const studentsData = studentsRef.docs.map(doc => doc.data());
        console.log('Students data:', studentsData);
  
        // Sort studentsData based on registrationNumber without using localeCompare
        studentsData.sort((a, b) => {
          if (a.registrationNumber < b.registrationNumber) return -1;
          if (a.registrationNumber > b.registrationNumber) return 1;
          return 0;
        });
  
        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchStudents();
  }, [classId]);
  
  useEffect(() => {
    const fetchMarks = async () => {
      if (!selectedSubject) return;
      setLoading(true);
      try {
        console.log('Fetching marks for subject:', selectedSubject, 'term:', term, 'class:', classId);
        const marksRef = await firestore().collection('Marks')
          .where('subjectName', '==', selectedSubject)
          .where('term', '==', term)
          .where('classId', '==', classId)
          .get();

        const marksData = marksRef.docs.reduce((acc, doc) => {
          const data = doc.data();
          acc[data.registrationNumber] = data.marksObtained;
          return acc;
        }, {});

        console.log('Marks data fetched:', marksData);
        setMarks(marksData);
        setEditableMarks(marksData); 
      } catch (error) {
        console.error('Error fetching marks:', error);
      } finally{
        setLoading(false);
      }
    };

    fetchMarks();
  }, [selectedSubject, term]);

  const handleMarkChange = (registrationNumber, value) => {
    let maxMarks = 0;
    if (term === 'first' || term === 'mid') {
      maxMarks = 25;
    } else if (term === 'final') {
      maxMarks = 50;
    }
  
    if (parseInt(value, 10) <= maxMarks || value === '') {
      setEditableMarks({
        ...editableMarks,
        [registrationNumber]: value,
      });
    } else {
      Alert.alert(
        'Maximum Marks Exceeded',
        `Maximum marks allowed for ${term} term is ${maxMarks}.`,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    }
  };

  const updateMarks = async () => {
    setLoading(true); 
    try {
      const batch = firestore().batch();

      for (const [registrationNumber, marksObtained] of Object.entries(editableMarks)) {
        const markRef = firestore().collection('Marks').doc(`${classId}_${selectedSubject}_${term}_${registrationNumber}`);

        // Check if the document exists
        const docSnapshot = await markRef.get();
        if (!docSnapshot.exists) {
          console.log(`Creating new document for ${registrationNumber}`);
        }

        batch.set(markRef, {
          classId,
          subjectName: selectedSubject,
          term,
          registrationNumber,
          marksObtained: marksObtained || "", 
        }, { merge: true });
      }

      await batch.commit();
      console.log('Marks updated successfully');
      Alert.alert('Success', 'Marks have been updated successfully.');
    } catch (error) {
      console.error('Error updating marks:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.heading}>Select Subject:</Text>
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

      <View style={styles.tableContainer}>
        <Text style={styles.tableHeading}>Total Marks: {totalMarks}</Text>
        <Text style={styles.tableHeading}>Students in Class</Text>
        <View style={styles.headerRow}>
          <Text style={[styles.headerText, styles.cell, styles.shrink]}>Reg No</Text>
          <Text style={[styles.headerText, styles.cell]}>Name</Text>
          <Text style={[styles.headerText, styles.cell]}>Marks Obtained</Text>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <FlatList
          data={students}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={[styles.cellText, styles.cell, styles.shrink]}>{item.registrationNumber}</Text>
              <Text style={[styles.cellText, styles.cell]}>{item.name}</Text>
              <TextInput
                style={[styles.cellText, styles.cell]}
                value={String(editableMarks[item.registrationNumber] || '')}
                onChangeText={(text) => handleMarkChange(item.registrationNumber, text)}
                keyboardType="numeric"
                editable={!!selectedSubject} 
              />
            </View>
          )}
        />
      </View>
      <TouchableOpacity style={styles.updateButton} onPress={updateMarks} disabled={loading || !selectedSubject}>
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.updateButtonText}>Upload Marks</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    marginTop: 20,
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
  tableContainer: {
    width: '80%',
    marginTop: 20,
  },
  tableHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    flex: 1,
  },
  cellText: {
    color: 'black',
    padding: 10,
    flex: 1,
  },
  updateButton:{
    alignItems: 'center',
    backgroundColor: '#58B1F4',
    padding: 10,
    width: '40%',
    borderRadius: 5,
    marginTop: 20,    
  },
  updateButtonText:{
    color: 'white',
  },
  cell: {
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    textAlign: 'center',
  },
  shrink: {
    flex: 0.5, 
  },
});

export default Marks;
