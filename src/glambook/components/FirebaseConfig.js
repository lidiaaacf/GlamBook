import { initializeAuth, getReactNativePersistence} from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp, firebase } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "**************************************",
  authDomain: "**************************************",
  databaseURL: "**************************************",
  projectId: "**************************************",
  storageBucket: "**************************************",
  messagingSenderId: "**************************************",
  appId: "**************************************",
  measurementId: "**************************************",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);

