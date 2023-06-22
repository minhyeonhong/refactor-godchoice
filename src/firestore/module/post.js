import {
    collection,
    getDocs,
    addDoc,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    limit,
    orderBy,
    startAfter,
    startAt,
} from 'firebase/firestore';
import { db } from "../firebase";

const pageLimit = 3;

export const insertPost = async (post) => {
    return await addDoc(collection(db, "post"), post);
}

export const getPost = async (postID) => {
    return await getDoc(doc(db, "post", postID));
}

export const getPosts = async (searchState, startAfterSnapshot) => {
    const response = await getDocs(
        startAfterSnapshot ?
            query(
                collection(db, "post"),
                orderBy("writeTime", "desc"),
                startAfter(startAfterSnapshot),
                limit(pageLimit)
            )
            :
            query(
                collection(db, "post"),
                orderBy("writeTime", "desc"),
                limit(pageLimit)
            )
    );
    const datas = response.docs.map(doc => ({ ...doc.data(), postID: doc.id }));

    const lastSnapshot = response.docs[response.docs.length - 1];

    return { datas, isLastPage: datas.length !== pageLimit, lastSnapshot };
}

export const updatePost = async (postID, post) => {
    return await updateDoc(doc(db, "post", postID), post);
}

export const deletePost = async (postID) => {
    return await deleteDoc(doc(db, "post", postID));
}

export const insertBanner = async (banner) => {
    return await addDoc(collection(db, "banners"), banner);
}

export const getBanners = async () => {
    const response = await getDocs(query(collection(db, "banners")));
    const datas = response.docs.map(doc => ({ ...doc.data(), postID: doc.id }));

    return datas;
}