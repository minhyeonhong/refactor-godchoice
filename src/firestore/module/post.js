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
} from 'firebase/firestore';
import { db } from "../firebase";
import { useQuery } from '@tanstack/react-query';
import { createComment, deleteComment } from './comment';
import { fsDeleteImage, fsUploadImage } from './image';
import { writeTime } from '../../components/common/Date';


const pageLimit = 3;

export const insertPost = async (post) => {
    return await addDoc(collection(db, "post"), post);
}

export const onInsertPost = async (files, obj) => {
    try {
        if (files.length > 0) {
            await Promise.all(
                files.map(async (file) => {
                    const getImageURI = await fsUploadImage("images/post", file, `${localStorage.getItem('uid')}_${file.name}_${writeTime}`);
                    obj.photoURIs.push(getImageURI);
                })
            );
        }

        insertPost(obj)
            .then(response => {
                const postID = response._key.path.segments[1];
                createComment(postID)
                    .then(() => {
                        window.location.replace(`/${obj.contentType}/${postID}`);
                    })
                    .catch(error => {
                        console.log("createComment error", error)
                    })
            })
            .catch(error => {
                console.log("fireStore insert error", error);
            })
    } catch (error) {
        console.log("onInsertPost error", error);
    }
}

export const getPost = async (postID) => {
    return await getDoc(doc(db, "post", postID));
}

export const useGetPost = (postId) => {
    const getFBPost = async () => {
        const response = await getPost(postId);
        return response.data();
    }

    const result = useQuery(
        ["getFBPost"],
        getFBPost,
    );

    return {
        post: result.data,
        postIsLoading: result.isLoading
    }
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

export const onUpdate = async (deleteImageName, uploadImage, postId, data) => {
    try {
        if (deleteImageName.length > 0) {
            await Promise.all(
                deleteImageName.map(async (fileName) => {
                    await fsDeleteImage("images/post", fileName)
                })
            );
        }

        if (uploadImage.length > 0) {
            await Promise.all(
                uploadImage.map(async (file) => {
                    const getImageURI = await fsUploadImage("images/post", file, `${localStorage.getItem('uid')}_${file.name}_${writeTime}`);
                    data.photoURIs.push(getImageURI);
                })
            );
        }

        updatePost(postId, data)
            .then(() => {
                window.location.reload()
            })
            .catch(error => {
                console.log("post update error", error);
            })
    } catch (error) {
        console.log("onUpdate error", error);
    }
}

export const deletePost = async (postID) => {
    return await deleteDoc(doc(db, "post", postID));
}

export const onDeletePost = async (postId, photoURIs) => {
    if (!window.confirm("게시글을 삭제 하시겠습니까?")) return;
    try {
        if (photoURIs.length > 0) {
            await Promise.all(
                photoURIs.map(async (photoURI) => {
                    const firstIdx = photoURI.indexOf(localStorage.getItem("uid"));
                    const lastIdx = photoURI.indexOf("?", firstIdx);
                    const imgName = decodeURIComponent(photoURI.substring(firstIdx, lastIdx));

                    await fsDeleteImage("images/post", imgName);
                })
            );
        }

        deletePost(postId)
            .then(() => {
                deleteComment(postId)
                    .then(() => {
                        window.location.replace("/");
                    })
                    .catch(error => {
                        console.log("deletePostPart error ", error)
                    })
            }).catch(error => {
                console.log("deletePost error ", error);
            })

    } catch (error) {
        console.log("onDeletePost error", error);
    }

}

export const insertBanner = async (banner) => {
    return await addDoc(collection(db, "banners"), banner);
}

export const getBanners = async () => {
    const response = await getDocs(query(collection(db, "banners")));
    const datas = response.docs.map(doc => ({ ...doc.data(), postID: doc.id }));

    return datas;
}