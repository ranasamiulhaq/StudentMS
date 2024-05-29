import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';

const ResultScreen = () => {
  const [classIds, setClassIds] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchClassIds = async () => {
      try {
        const classesSnapshot = await firestore().collection('Classes').get();
        const classIdsArray = classesSnapshot.docs.map(doc => doc.data().classId);
        console.log("Class IDs:", classIdsArray);
        setClassIds(classIdsArray);
      } catch (error) {
        console.error('Error fetching class IDs:', error);
      }
    };
    fetchClassIds();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedClassId) return;

      try {
        console.log('Fetching students for class:', selectedClassId);
        const studentsSnapshot = await firestore().collection('Students')
          .where('classId', '==', selectedClassId)
          .get();

        const studentsData = studentsSnapshot.docs.map(doc => doc.data());
        console.log('Students data:', studentsData);
        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [selectedClassId]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Choose a Class:</Text>
      <DropDownPicker
        open={open}
        value={selectedClassId}
        items={classIds.map(classId => ({label: classId, value: classId}))}
        setOpen={setOpen}
        setValue={setSelectedClassId}
        placeholder="Select a class"
        onChangeValue={(value) => {
          console.log('Selected Class:', value);
          setSelectedClassId(value); // Update the selected class ID
        }}
        style={{ width: 200, marginBottom: 20 }}
      />

      <View>
        <Text>Students in {selectedClassId}:</Text>
        {students.map(student => (
          <Text key={student.registrationNumber}>{student.name}</Text>
        ))}
      </View>
    </View>
  );
};

export default ResultScreen;
