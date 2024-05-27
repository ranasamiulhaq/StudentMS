import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

function StudentFeeStatus({ route }) {
    const { regno } = route.params;    
    
    const [feeStatus, setFeeStatus] = useState(null);

    useEffect(() => {
        const fetchFeeStatus = async () => {
            try {
                const feeStatusQuerySnapshot = await firestore()
                    .collection('FeeStatus')
                    .where('registrationNumber', '==', regno)
                    .get();

                if (!feeStatusQuerySnapshot.empty) {
                    const feeStatusDoc = feeStatusQuerySnapshot.docs[0];
                    setFeeStatus(feeStatusDoc.data());
                } else {
                    console.log('No fee status found for this registration number.');
                }
            } catch (error) {
                console.error('Error fetching fee status: ', error);
            }
        };

        fetchFeeStatus();
    }, [regno]);

    if (!feeStatus) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fee Status for {feeStatus.studentName}</Text>
            <Text style={styles.details}>Registration Number: {feeStatus.registrationNumber}</Text>
            <Text style={styles.details}>Fee ID: {feeStatus.feeId}</Text>
            <Text style={styles.details}>Amount Due: {feeStatus.amountDue}</Text>
            <Text style={styles.details}>Amount Paid: {feeStatus.amountPaid}</Text>
            <Text style={styles.details}>Late Fees: {feeStatus.lateFees}</Text>
            <Text style={styles.details}>Payable Amount: {feeStatus.payableAmount}</Text>
            <Text style={styles.details}>Payment Date: {feeStatus.paymentDate}</Text>
            {/* <Text>Payment Date: {feeStatus.paymentDate?.toDate().toString()}</Text> */}
            <Text style={styles.details}>Remarks: {feeStatus.remarks}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        color:'black',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'black',
        marginBottom: 16,
    },
    details:{
        color:'black',
    }
});

export default StudentFeeStatus;
