// config/firebaseConfig.js
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

// Replace the placeholders with your actual Firebase project details
const firebaseConfig = {
    "project_info": {
      "project_number": "229298467394",
      "project_id": "studentms-ee4be",
      "storage_bucket": "studentms-ee4be.appspot.com"
    },
    "client": [
      {
        "client_info": {
          "mobilesdk_app_id": "1:229298467394:android:4c9387e06251f3903df3db",
          "android_client_info": {
            "package_name": "com.studentms"
          }
        },
        "oauth_client": [],
        "api_key": [
          {
            "current_key": "AIzaSyBrsDWLImMHSnGnmt8w0abXwnmjvvK9HcA"
          }
        ],
        "services": {
          "appinvite_service": {
            "other_platform_oauth_client": []
          }
        }
      }
    ],
    "configuration_version": "1"
  }

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
