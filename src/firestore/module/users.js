import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
} from 'firebase/firestore';
import { db } from "../firebase";

export const getUser = async (uid) => {
    return await getDoc(doc(db, "users", uid));
}

export const joinUser = async (uid, data) => {
    return await setDoc(doc(db, "users", uid), data);
}

export const updateUser = async (uid, userInfo) => {
    return await updateDoc(doc(db, "users", uid), userInfo);
}