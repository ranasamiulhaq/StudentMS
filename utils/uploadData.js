import firestore from '@react-native-firebase/firestore';

const uploadData = async () => {
  try {
    // Admin collection
    await firestore().collection('Admin').doc('admin1').set({
      email: 'admin@example.com',
      password: 'hashedPassword',
    });

    // Teachers collection
    await firestore().collection('Teachers').doc('T123').set({
      teacherId: 'T123',
      email: 'teacher1@example.com',
      password: 'hashedPassword',
      assignedClass: 'class1',
    });

    // Create the main student document
    await firestore().collection('Students').doc('S123').set({
      studentId: 'S123',
      registrationNumber: 101,
      dateOfAdmission: '2023-05-20T10:00:00Z',
      name: 'John Doe',
      dateOfBirth: '2010-01-01T00:00:00Z',
      gender: 'Male',
      residence: '123 Street Name',
      admissionClass: 'class1',
      email: 'student1@example.com',
      password: 'hashedPassword',
      remarks: '',
    });

    // Create the nested collection 'familyDetails' with the necessary fields
    await firestore().collection('Students').doc('S123').collection('familyDetails').doc('fatherInfo').set({
      fatherName: 'Richard Doe',
      caste: 'General',
      occupation: 'Engineer',
    });

    // Fee status collection
    await firestore().collection('FeeStatus').doc('F123').set({
      feeId: 'F123',
      registrationNumber: 101,
      studentName: 'John Doe',
      amountDue: 5000,
      amountPaid: 3000,
      payableAmount: 2000,
      paymentDate: '2023-06-15T10:00:00Z',
      lateFees: false,
      remarks: '',
    });

    // Classes collection
    await firestore().collection('Classes').doc('class1').set({
      classId: 'class1',
      className: 'Nursery',
      subjects: ['English', 'Urdu', 'Math', 'Nazra-e-Quran'],
      timetable: 'https://example.com/timetable/nursery.png',
      syllabus: 'https://example.com/syllabus/nursery.png',
    });

    // Subjects collection
    await firestore().collection('Subjects').doc('subject1').set({
      subjectId: 'subject1',
      classId: 'class1',
      subjectName: 'English',
      firstTermMarks: 50,
      midTermMarks: 50,
      finalTermMarks: 100,
    });

    // Marks collection
    await firestore().collection('Marks').doc('M123').set({
      markId: 'M123',
      studentId: 'S123',
      subjectId: 'subject1',
      term: 'First Term',
      marksObtained: 45,
    });

    // Reports collection
    // Age report
    await firestore().collection('AgeReports').doc('report1').set({
      reportId: 'report1',
      reportType: 'Student Age Record',
      data: {
        totalBoys: 30,
        totalGirls: 25,
        students: [
          {
            registrationNumber: 101,
            name: 'John Doe',
            fatherName: 'Richard Doe',
            dateOfBirth: '2010-01-01T00:00:00Z',
            age: '14 years 4 months',
          },
        ],
      },
      generatedAt: '2024-05-20T10:00:00Z',
    });

    // Result sheet
    await firestore().collection('ResultReports').doc('report1').set({
      reportId: 'report2',
      reportType: 'Result Sheet',
      data: {
        classResults: [
          {
            className: 'Grade 10',
            students: [
              {
                registrationNumber: 101,
                name: 'John Doe',
                marks: {
                  Math: {
                    'First Term': 85,
                    'Mid Term': 88,
                    'Final Term': 90,
                  },
                  Science: {
                    'First Term': 78,
                    'Mid Term': 82,
                    'Final Term': 85,
                  },
                },
              },
            ],
          },
        ],
      },
      generatedAt: '2024-05-20T10:00:00Z',
    });

    console.log('Data uploaded successfully!');
  } catch (error) {
    console.error('Error uploading data: ', error);
  }
};

// Call the uploadData function
uploadData();
