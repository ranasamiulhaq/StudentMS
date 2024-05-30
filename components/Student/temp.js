import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator,View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Marks from './StudentMarks';
import FeeStatus from './StudentFeeStatus';
import Timetable from './Timetable';
import Syllabus from './Syllabus';
import Dashboard from './StudentDashborad';

const dashboardName = "Dashboard";
const syllabusName = "Syllabus";
const timetableName = "Time Table";
const marksName = "Marks";
const feeName = "Fee Status";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function StudentStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen options={{ title: 'StudentMarks' }} name="StudentMarks" component={Marks} />
                <Stack.Screen options={{ title: 'StudentFeeStatus' }} name="StudentFeeStatus" component={FeeStatus} />
                <Stack.Screen options={{ title: 'Timetable' }} name="Timetable" component={Timetable} />
                <Stack.Screen options={{ title: 'Syllabus' }} name="Syllabus" component={Syllabus} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}



function MainContainer({ route }) {
    const { uEmail } = route.params;
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const studentQuerySnapshot = await firestore()
                    .collection('Students')
                    .where('email', '==', uEmail)
                    .get();

                if (!studentQuerySnapshot.empty) {
                    const studentDoc = studentQuerySnapshot.docs[0];
                    const data = studentDoc.data();
                    setStudentData(data);
                } else {
                    console.log('No student found with this email.');
                }
            } catch (error) {
                console.error('Error fetching student data: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [uEmail]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          );
    }

    if (!studentData) {
        return (
            <View>
                <Text>No student data found.</Text>
            </View>
        );
    }

    const { registrationNumber: regno, admissionClass: classname } = studentData;

    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName={dashboardName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === dashboardName) {
                            iconName = focused
                                ? require('../../public/icons/blueClass.png')
                                : require('../../public/icons/class.png');
                        } else if (route.name === syllabusName) {
                            iconName = focused
                                ? require('../../public/icons/syllabusBlue.png')
                                : require('../../public/icons/syllabus.png');
                        } else if (route.name === marksName) {
                            iconName = focused
                                ? require('../../public/icons/marksBlue.png')
                                : require('../../public/icons/marks.png');
                        } else if (route.name === timetableName) {
                            iconName = focused
                                ? require('../../public/icons/timetableBlue.png')
                                : require('../../public/icons/timetable.png');
                        } else if (route.name === feeName) {
                            iconName = focused
                                ? require('../../public/icons/feeBlue.png')
                                : require('../../public/icons/fees.png');
                        }

                        return <Image source={iconName} style={[styles.icon, { tintColor: color, width: size, height: size }]} />;
                    },
                    tabBarInactiveTintColor: 'grey',
                    tabBarActiveTintColor: '#58B1F4',
                    tabBarLabelStyle: styles.tabBarLabelStyle,
                    tabBarStyle: styles.tabBarStyle,
                })}
            >                
                <Tab.Screen options={{headerShown: false}} name={marksName} component={Marks} initialParams={{ regno }} />
                <Tab.Screen options={{headerShown: false}} name={dashboardName} component={Dashboard} initialParams={{ uEmail }} />
                <Tab.Screen  name={syllabusName} component={Syllabus} initialParams={{ imageName: `${classname} syllabus.jpg` }} />
                <Tab.Screen options={{headerShown: false}} name={feeName} component={FeeStatus} initialParams={{ regno }} />
                <Tab.Screen  name={timetableName} component={Timetable} initialParams={{ imageName: `${classname} timetable.jpg` }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    icon: {
        resizeMode: 'contain',
    },
    tabBarLabelStyle: {
        paddingBottom: 10,
        fontSize: 12,
        fontWeight: '600',
    },
    tabBarStyle: {
        paddingVertical: 10,
        height: 70,
        backgroundColor: 'white',
        borderTopWidth: 0,
        elevation: 5,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#123456',
        alignItems: 'center',
        justifyContent: 'center',
      },
});


export default MainContainer;
