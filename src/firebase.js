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
    namedQuery,
    limit,
    orderBy,
    startAfter,
    startAt,
} from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes, deleteObject, getStorage } from "firebase/storage"

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

const pageLimit = 3;

export const fsUploadImage = async (imgURL, imgFile, imgFileName) => {
    const storageRef = ref(storage, `${imgURL}/${imgFileName}`);
    const uploadTask = await uploadBytes(storageRef, imgFile);
    const getImageURL = await getDownloadURL(uploadTask.ref);

    return getImageURL;
}

export const fsDeleteImage = async (imgURL, imgName) => {
    const storageRef = ref(storage, `${imgURL}/${imgName}`);

    deleteObject(storageRef)
        .then(() => {
        })
        .catch(error => {
            console.log(`이미지 삭제 실패 ${error}`);
        });
}

export const insertPost = async (post) => {
    return await addDoc(collection(db, "post"), post);
}

export const getPost = async (postID) => {
    return await getDoc(doc(db, "post", postID));
}

export const getPosts = async (searchState, startAfterSnapshot = {}) => {
    const response = await getDocs(query(collection(db, "post"), orderBy("writeTime", "desc"), startAfter(startAfterSnapshot), limit(pageLimit)));
    const datas = response.docs.map(doc => ({ ...doc.data(), postID: doc.id }));

    const lastSnapshot = response.docs[response.docs.length - 1];

    return { datas, isLastPage: datas.length !== pageLimit, lastSnapshot };
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