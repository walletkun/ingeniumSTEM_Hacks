// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:NEXT_FIREBASE_APIKEY,
  authDomain: NEXT_FIREBASE_AUTH_DOMAIN,
  projectId: NEXT_FIREBASE_PROJECT_ID,
  storageBucket: NEXT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: NEXT_FIREBASE_MESSAGING_SENDER_ID,
  appId: NEXT_FIREBASE_APP_ID ,
  measurementId:NEXT_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app, analytics}