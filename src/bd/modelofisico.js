import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "**************************************",
  authDomain: "**************************************",
  projectId: "**************************************",
  storageBucket: "**************************************",
  messagingSenderId: "**************************************",
  appId: "**************************************",
  measurementId: "**************************************",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = firebase.firestore()

export const auth = getAuth(app)
export default database