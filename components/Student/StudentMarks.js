import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const StudentMarks = ({ route }) => {
    const { regno } = route.params;
    const registrationNumber = regno.toString();
    const [marksData, setMarksData] = useState({ first: [], mid: [], final: [] });
    const [firstTermVisible, setFirstTermVisible] = useState(false);
    const [secondTermVisible, setSecondTermVisible] = useState(false);
    const [thirdTermVisible, setThirdTermVisible] = useState(false);

    useEffect(() => {
        const fetchMarksData = async (term) => {
            try {
                const marksQuerySnapshot = await firestore()
                    .collection('Marks')
                    .where('registrationNumber', '==', registrationNumber)
                    .where('term', '==', term)
                    .get();

                const marksArray = marksQuerySnapshot.docs.map(doc => doc.data());
                setMarksData(prevState => ({ ...prevState, [term]: marksArray }));
            } catch (error) {
                console.error(`Error fetching ${term} term marks data: `, error);
            }
        };

        fetchMarksData('first');
        fetchMarksData('mid');
        fetchMarksData('final');
    }, [registrationNumber]);

    const toggleFirstTerm = () => setFirstTermVisible(!firstTermVisible);
    const toggleSecondTerm = () => setSecondTermVisible(!secondTermVisible);
    const toggleThirdTerm = () => setThirdTermVisible(!thirdTermVisible);

    const renderMarks = (term) => {
        return marksData[term].length > 0 ? (
            marksData[term].map((mark, index) => (
                <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{mark.subjectName}</Text>
                    <Text style={styles.tableCell}>{mark.marksObtained}</Text>
                </View>
            ))
        ) : (
            <Text style={styles.noDataText}>No marks data available for this term.</Text>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={toggleFirstTerm} style={styles.termHeader}>
                <Text style={styles.termHeaderText}>First Term</Text>
            </TouchableOpacity>
            {firstTermVisible && (
                <View style={styles.termContent}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Subject</Text>
                        <Text style={styles.tableHeaderText}>Marks Obtained</Text>
                    </View>
                    {renderMarks('first')}
                </View>
            )}

            <TouchableOpacity onPress={toggleSecondTerm} style={styles.termHeader}>
                <Text style={styles.termHeaderText}>Second Term</Text>
            </TouchableOpacity>
            {secondTermVisible && (
                <View style={styles.termContent}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Subject</Text>
                        <Text style={styles.tableHeaderText}>Marks Obtained</Text>
                    </View>
                    {renderMarks('mid')}
                </View>
            )}

            <TouchableOpacity onPress={toggleThirdTerm} style={styles.termHeader}>
                <Text style={styles.termHeaderText}>Third Term</Text>
            </TouchableOpacity>
            {thirdTermVisible && (
                <View style={styles.termContent}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Subject</Text>
                        <Text style={styles.tableHeaderText}>Marks Obtained</Text>
                    </View>
                    {renderMarks('final')}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#E8F4FF',
    },
    termHeader: {
        padding: 15,
        backgroundColor: '#58B1F4',
        borderRadius: 10,
        marginTop: 10,
    },
    termHeaderText: {
        color: '#fff',
        fontSize: 18,
    },
    termContent: {
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginTop: 5,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#E8E8E8',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    tableHeaderText: {
        flex: 1,
        fontWeight: 'bold',
        color: '#000',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    tableCell: {
        flex: 1,
        color: '#000',
    },
    noDataText: {
        color: 'red',
        fontSize: 14,
    },
});

export default StudentMarks;






// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// const Marks = ({ registrationNumber }) => {

//   const [marksData, setMarksData] = useState({ first: [], mid: [], final: [] });

//   useEffect(() => {
//     const fetchMarksData = async (term) => {
//       try {
//         const marksQuerySnapshot = await firestore()
//           .collection('Marks')
//           .where('registrationNumber', '==', registrationNumber)
//           .where('term', '==', term)
//           .get();

//         const marksArray = marksQuerySnapshot.docs.map(doc => doc.data());
//         setMarksData(prevState => ({ ...prevState, [term]: marksArray }));
//       } catch (error) {
//         console.error(`Error fetching ${term} term marks data: `, error);
//       }
//     };

//     fetchMarksData('first');
//     fetchMarksData('mid');
//     fetchMarksData('final');
//   }, [registrationNumber]);



//   const [firstTermVisible, setFirstTermVisible] = useState(false);
//   const [secondTermVisible, setSecondTermVisible] = useState(false);
//   const [thirdTermVisible, setThirdTermVisible] = useState(false);

//   const toggleFirstTerm = () => setFirstTermVisible(!firstTermVisible);
//   const toggleSecondTerm = () => setSecondTermVisible(!secondTermVisible);
//   const toggleThirdTerm = () => setThirdTermVisible(!thirdTermVisible);

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={toggleFirstTerm} style={styles.termHeader}>
//         <Text style={styles.termHeaderText}>First Term</Text>
//       </TouchableOpacity>
//       {firstTermVisible && (
//         <View style={styles.termContent}>
//           <Text>Math: 85</Text>
//           <Text>English: 90</Text>
//           <Text>Science: 88</Text>
//         </View>
//       )}

//       <TouchableOpacity onPress={toggleSecondTerm} style={styles.termHeader}>
//         <Text style={styles.termHeaderText}>Second Term</Text>
//       </TouchableOpacity>
//       {secondTermVisible && (
//         <View style={styles.termContent}>
//           <Text>Math: 88</Text>
//           <Text>English: 92</Text>
//           <Text>Science: 89</Text>
//         </View>
//       )}

//       <TouchableOpacity onPress={toggleThirdTerm} style={styles.termHeader}>
//         <Text style={styles.termHeaderText}>Third Term</Text>
//       </TouchableOpacity>
//       {thirdTermVisible && (
//         <View style={styles.termContent}>
//           <Text>Math: 90</Text>
//           <Text>English: 93</Text>
//           <Text>Science: 91</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#E8F4FF',
//   },
//   termHeader: {
//     padding: 15,
//     backgroundColor: '#58B1F4',
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   termHeaderText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   termContent: {
//     padding: 15,
//     backgroundColor: 'black',
//     borderRadius: 10,
//     marginTop: 5,
//   },
// });

// export default Marks;



