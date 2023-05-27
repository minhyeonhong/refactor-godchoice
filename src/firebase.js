import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    query,
    namedQuery
} from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes, getStorage } from "firebase/storage"

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

const storage = getStorage(app);

export const fsUploadImage = async (imgFile) => {
    const storageRef = ref(storage, `images/${localStorage.getItem("uid")}_${imgFile.name}`);
    const uploadTask = await uploadBytes(storageRef, imgFile);
    const getImageURL = await getDownloadURL(uploadTask.ref);

    return getImageURL;
}


// let admin = require("firebase-admin");

// let serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

// exports.auth = functions
//     .runWith({ secrets: ["GODCHOICE_SECRET_KEY"] })
//     .https.onRequest(app);

export {
    collection,
    getDocs,
    addDoc,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    db,
    query,
    namedQuery,
};