import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage"

export const fsUploadImage = async (imgURL, imgFile, imgFileName) => {
    const storageRef = ref(storage, `${imgURL}/${imgFileName}`);
    const uploadTask = await uploadBytes(storageRef, imgFile);
    const getImageURL = await getDownloadURL(uploadTask.ref);

    return getImageURL;
}

export const fsDeleteImage = async (imgURL, imgName) => {
    const storageRef = ref(storage, `${imgURL}/${imgName}`);

    return await deleteObject(storageRef);
}