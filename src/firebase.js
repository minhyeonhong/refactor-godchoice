import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, doc, setDoc, getDoc, query, namedQuery } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FB_API_ID,
    measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// let admin = require("firebase-admin");

// let serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

// exports.auth = functions
//     .runWith({ secrets: ["GODCHOICE_SECRET_KEY"] })
//     .https.onRequest(app);

export { collection, getDocs, addDoc, doc, setDoc, getDoc, db, query, namedQuery };