import {
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    query,
} from 'firebase/firestore';
import { db } from "../firebase";

export const createPostPart = async (postID) => {
    const initPart = {
        viewUsers: [],
        scrapUsers: [],
        comments: [],
    }

    return await setDoc(doc(db, "postPart", postID), initPart);
}

export const getPostParts = async () => {
    return (await getDocs(query(collection(db, "postPart")))).docs.map(doc => ({ ...doc.data(), postID: doc.id }));
}

export const getPostPart = async (postID) => {
    return await getDoc(doc(db, "postPart", postID));
}

export const updatePostPart = async (postID, data) => {
    return await updateDoc(doc(db, "postPart", postID), data);
}

export const deletePostPart = async (postID) => {
    return await deleteDoc(doc(db, "postPart", postID));
}