import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc,
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

export const getPostPart = async (postID) => {
    return await getDoc(doc(db, "postPart", postID));
}

export const updatePostPart = async (postID, data) => {
    return await updateDoc(doc(db, "postPart", postID), data);
}

export const deletePostPart = async (postID) => {
    return await deleteDoc(doc(db, "postPart", postID));
}