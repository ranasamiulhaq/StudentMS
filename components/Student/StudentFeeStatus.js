import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Fee Status for {feeStatus.studentName}</Text>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCellHeader}>Registration Number:</Text>
                    <Text style={styles.tableCell}>{feeStatus.registrationNumber}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCellHeader}>Fee ID:</Text>
                    <Text style={styles.tableCell}>{feeStatus.feeId}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCellHeader}>Amount Due:</Text>
                    <Text style={styles.tableCell}>{feeStatus.amountDue}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCellHeader}>Amount Paid:</Text>
                    <Text style={styles.tableCell}>{feeStatus.amountPaid}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCellHeader}>Late Fees:</Text>
                    <Text style={styles.tableCell}>{feeStatus.lateFees}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCellHeader}>Payable Amount:</Text>
                    <Text style={styles.tableCell}>{feeStatus.payableAmount}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCellHeader}>Payment Date:</Text>
                    <Text style={styles.tableCell}>{feeStatus.paymentDate}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCellHeader}>Remarks:</Text>
                    <Text style={styles.tableCell}>{feeStatus.remarks}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#F5F5F5',
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 16,
        textAlign: 'center',
    },
    table: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        overflow: 'hidden',
    },
    tableRow: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    tableCellHeader: {
        flex: 1,
        fontWeight: 'bold',
        color: 'black',
    },
    tableCell: {
        flex: 2,
        color: 'black',
    },
});

export default StudentFeeStatus;
