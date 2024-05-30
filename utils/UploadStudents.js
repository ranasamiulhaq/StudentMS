import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const classes = ['Nursery', 'Prep', 'class 1', 'class 2', 'class 3', 'class 4', 'class 5', 'class 6', 'class 7', 'class 8'];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const getRandomGender = () => (Math.random() < 0.5 ? 'male' : 'female');

const getRandomName = (gender) => {
  const maleNames = ['Usman', 'Ahmed', 'Ali', 'Hassan', 'Bilal'];
  const femaleNames = ['Ayesha', 'Fatima', 'Hira', 'Sara', 'Maha'];
  const names = gender === 'male' ? maleNames : femaleNames;
  return names[getRandomInt(0, names.length)];
};

const generateUniqueEmail = (usedEmails, name) => {
  let email;
  do {
    email = `${name.replace(' ', '').toLowerCase()}${getRandomInt(1000, 9999)}@gmail.com`;
  } while (usedEmails.has(email));
  usedEmails.add(email);
  return email;
};

const generateUniqueRegistrationNumber = (usedRegistrationNumbers) => {
  let registrationNumber;
  do {
    registrationNumber = getRandomInt(1, 10000);
  } while (usedRegistrationNumbers.has(registrationNumber));
  usedRegistrationNumbers.add(registrationNumber);
  return registrationNumber;
};

const generateStudentData = (admissionClass, usedEmails, usedRegistrationNumbers) => {
  const gender = getRandomGender();
  const name = `${getRandomName(gender)} ${uuidv4().slice(0, 5)}`;
  const email = generateUniqueEmail(usedEmails, name);
  const registrationNumber = generateUniqueRegistrationNumber(usedRegistrationNumbers);

  return {
    admissionClass,
    classId: admissionClass.replace(' ', '').toLowerCase(),
    dateOfAdmission: firestore.Timestamp.fromDate(new Date()),
    dateOfBirth: firestore.Timestamp.fromDate(new Date(2005, getRandomInt(0, 11), getRandomInt(1, 28))),
    email,
    fatherDetails: {
      caste: 'Malik',
      fatherName: `${uuidv4().slice(0, 5)} Saab`,
      occupation: 'NBP',
      residence: 'Jannah gardrm'
    },
    gender,
    name,
    password: '12345678',
    registrationNumber,
    remarks: 'Created'
  };
};

const UploadStudents = () => {
  useEffect(() => {
    const uploadStudents = async () => {
      const usedEmails = new Set();
      const usedRegistrationNumbers = new Set();

      for (const admissionClass of classes) {
        for (let i = 0; i < 20; i++) {
          const studentData = generateStudentData(admissionClass, usedEmails, usedRegistrationNumbers);
          await firestore().collection('Students').add(studentData);
        }
      }
      console.log('All students uploaded successfully');
    };

    uploadStudents().catch(console.error);
  }, []);

  return null;
};

export default UploadStudents;
