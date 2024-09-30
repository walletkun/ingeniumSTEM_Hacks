//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/*
<<<<<<< HEAD
Same issue as the openaiTutor.js file, the process.env does not work need to find out why but for now if needed to test,  need to import it manually, returns invalid if not imported manually...
=======
 Same issue as the openaiTutor.js file, the process.env does not work need to find out why but for now if needed to test, 
 need to import it manually, returns invalid if not imported manually...
>>>>>>> 6b80c8c85dcdc7ecaba13094af6ad5ee16fdf9fc
*/

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
<<<<<<< HEAD
export { app, db, auth };
=======
export { app, db, auth };
>>>>>>> 6b80c8c85dcdc7ecaba13094af6ad5ee16fdf9fc
