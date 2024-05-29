import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';

const ResultScreen = () => {
  const [classIds, setClassIds] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

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
    const fetchSubjects = async () => {
      try {
        if (selectedClassId) {
          const classDoc = await firestore().collection('Classes').doc(selectedClassId).get();
          const classData = classDoc.data();
          if (classData && classData.subjects) {
            setSubjects(classData.subjects);
          }
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, [selectedClassId]);

  useEffect(() => {
    const fetchStudentsAndMarks = async () => {
      if (!selectedClassId) return;

      try {
        console.log('Fetching students for class:', selectedClassId);
        const studentsSnapshot = await firestore().collection('Students')
          .where('classId', '==', selectedClassId)
          .get();

        const studentsData = studentsSnapshot.docs.map(doc => doc.data());
        console.log('Students data:', studentsData);

        // Fetch marks for the class
        const marksSnapshot = await firestore().collection('Marks')
          .where('classId', '==', selectedClassId)
          .get();

        const marksData = marksSnapshot.docs.map(doc => doc.data());
        console.log('Marks data:', marksData);

        // Map marks to students
        const studentsWithMarks = studentsData.map(student => {
          const studentMarks = marksData.filter(mark => mark.registrationNumber === String(student.registrationNumber));
          return { ...student, marks: studentMarks };
        });

        console.log('Students with marks:', studentsWithMarks);
        setStudents(studentsWithMarks);
      } catch (error) {
        console.error('Error fetching students and marks:', error);
      }
    };

    fetchStudentsAndMarks();
  }, [selectedClassId]);

  const getMarks = (marks, subject, term) => {
    const mark = marks.find(m => m.subjectName === subject && m.term === term);
    return mark ? mark.marksObtained : '';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Choose a Class:</Text>
      <DropDownPicker
        open={open}
        value={selectedClassId}
        items={classIds.map(classId => ({ label: classId, value: classId }))}
        setOpen={setOpen}
        setValue={setSelectedClassId}
        placeholder="Select a class"
        onChangeValue={(value) => {
          console.log('Selected Class:', value);
          setSelectedClassId(value); // Update the selected class ID
        }}
        style={{ width: 200, marginBottom: 20 }}
      />

      <ScrollView contentContainerStyle={styles.scrollViewContent} style={{ width: '100%' }}>
        {students && students.map(student => (
          <View key={student.registrationNumber} style={styles.studentContainer}>
            <Text style={styles.studentTitle}>Student Name: {student.name}</Text>
            <Text style={styles.studentInfo}>Student Reg No: {student.registrationNumber}</Text>
            <Text style={styles.studentInfo}>Student Father: {student.fatherDetails?.fatherName}</Text>

            <View style={styles.tableContainer}>
              <Text style={styles.tableHeading}>Marks</Text>
              <View style={styles.headerRow}>
                <Text style={[styles.headerText, styles.cell, { textAlign: 'center', width: '25%' }]}>Subject</Text>
                <Text style={[styles.headerText, styles.cell, { textAlign: 'center', width: '25%' }]}>First Term</Text>
                <Text style={[styles.headerText, styles.cell, { textAlign: 'center', width: '25%' }]}>Mid Term</Text>
                <Text style={[styles.headerText, styles.cell, { textAlign: 'center', width: '25%' }]}>Final Term</Text>
              </View>
              {subjects.map(subject => (
                <View key={subject} style={styles.headerRow}>
                  <Text style={[styles.cell, styles.headerText, { textAlign: 'center', maxWidth: '25%' }]}>{subject}</Text>
                  <Text style={[styles.cell, { textAlign: 'center', width: '25%' }]}>{getMarks(student.marks, subject, 'first')}</Text>
                  <Text style={[styles.cell, { textAlign: 'center', width: '25%' }]}>{getMarks(student.marks, subject, 'mid')}</Text>
                  <Text style={[styles.cell, { textAlign: 'center', width: '25%' }]}>{getMarks(student.marks, subject, 'final')}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: 'black',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  studentContainer: {
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  studentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  studentInfo: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  tableContainer: {
    marginTop: 10,
  },
  tableHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    padding: 10,
    flex: 1,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    borderRightWidth: 1,
    color: 'black',
    textAlign: 'center',
  },
});

export default ResultScreen;
