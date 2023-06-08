import {
    collection,
    getDocs,
    addDoc,
    doc,
    getDoc,
    query,
    limit,
    orderBy,
    startAfter,
} from 'firebase/firestore';
import { db } from "../firebase";

const pageLimit = 3;

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