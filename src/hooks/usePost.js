import { useQuery } from '@tanstack/react-query';
import { getPost, updatePost, deletePost } from '../firestore/module/post';
import { deletePostPart, getPostPart, updatePostPart } from '../firestore/module/postPart';
import { fsDeleteImage, fsUploadImage } from '../firestore/module/image';
import { writeTime } from '../components/common/Date';


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

export const onDeletePost = (postId) => {
    if (window.confirm("게시글을 삭제 하시겠습니까?")) {
        deletePost(postId)
            .then(() => {
                deletePostPart(postId)
                    .then(() => {
                        window.location.replace("/");
                    })
                    .catch(error => {
                        console.log("deletePostPart error ", error)
                    })
            }).catch(error => {
                console.log("deletePost error ", error);
            })

    }
}

export const onUpdate = (deleteImageName, uploadImage, postId, data) => {
    if (deleteImageName.length > 0) {
        deleteImageName.map(async (fileName) => {
            await fsDeleteImage("images/post", fileName)
        })
    }

    if (uploadImage.length > 0) {
        uploadImage.map(async (file, i) => {
            const getImageURI = await fsUploadImage("images/post", file, `${localStorage.getItem('uid')}_${file.name}_${writeTime}`);
            data.photoURIs.push(getImageURI);
            if (uploadImage.length === (i + 1)) {
                updatePost(postId, data)
                    .then(() => {
                        window.location.reload()
                    })
                    .catch(error => {
                        console.log("post update error", error);
                    })
            }
        })
    } else {
        updatePost(postId, data)
            .then(() => {
                window.location.reload()
            })
            .catch(error => {
                console.log("post update error", error);
            })
    }
}

export const usePostParts = (postId) => {
    const getFBPostPart = async () => {
        const response = await getPostPart(postId);
        return response.data();
    }

    const result = useQuery(
        ["getFBPostPart"],
        getFBPostPart
    );

    return {
        ...result.data,
        postPartIsLoading: result.isLoading
    }
}

export const updateViewUsers = (postId, viewUsers) => {
    updatePostPart(postId, { viewUsers })
        .then(() => {
        })
        .catch((error) => {
            console.log("writeComment error", error);
        })
}

export const updateScrapUsers = (postId, scrapUsers) => {
    updatePostPart(postId, { scrapUsers })
        .then(() => {
        })
        .catch((error) => {
            console.log("writeComment error", error);
        })
}