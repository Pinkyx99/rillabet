
'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "rillaloot",
  appId: "1:842296209366:web:ce7b1cb768720e8df0fe77",
  storageBucket: "rillaloot.firebasestorage.app",
  apiKey: "AIzaSyCbAGXjG5IWhNsg_8OfdwHVKvmqF3Qocoo",
  authDomain: "rillaloot.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "842296209366"
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
