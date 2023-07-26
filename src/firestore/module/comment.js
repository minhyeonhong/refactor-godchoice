import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    query,
    collection,
    where,
} from 'firebase/firestore';
import { db } from "../firebase";
import { useQuery } from '@tanstack/react-query';

export const createComment = async (postID) => {
    const initComment = { comments: [] };

    return await setDoc(doc(db, "comment", postID), initComment);
}

export const getComment = async (postID) => {
    return await getDoc(doc(db, "comment", postID));
}

export const useComment = (postId) => {
    const getFBComment = async () => {
        const response = await getComment(postId);
        return response.data();
    }

    const result = useQuery(
        ["getFBComment"],
        getFBComment
    );

    return {
        ...result.data,
        commentsIsLoading: result.isLoading
    }
}

export const useComments = (uid) => {
    const getFBComments = async () => {
        const response = await getDocs(query(collection(db, "test"), where("comments", "array-contains-any", [{ uid: "sss", reComments: [{ reUid: "asd" }] }])));
        //const response = await getDocs(query(collection(db, "test"), where("comments", "array-contains", { reComments: [{ reUid: "asd" }] })));

        const comments = response.docs.map(doc => ({ ...doc.data(), postID: doc.id }));//.filter(comments => comments.comments.length > 0);

        console.log("comments", comments);

        return { comments };
    }

    const result = useQuery(
        ["getFBComments"],
        getFBComments
    );

    return {
        ...result.data,
        commentsIsLoading: result.isLoading
    }
}

export const updateComment = async (postID, data) => {
    return await updateDoc(doc(db, "comment", postID), data);
}

export const deleteComment = async (postID) => {
    return await deleteDoc(doc(db, "comment", postID));
}