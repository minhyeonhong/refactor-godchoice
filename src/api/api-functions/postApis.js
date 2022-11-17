import { hInstance, nhInstance } from "../instance";

export const postApis = {
    //전체글 검색 조회
    searchPostAX: (searchInfo) => nhInstance.get(
        `${process.env.REACT_APP_API_URL}/allposts`, { params: { ...searchInfo, tag: searchInfo.tag.join() } }),
    getPostAX: (post) => hInstance.get(`${process.env.REACT_APP_API_URL}/${post.url}/${post.postId}`),
    postListAX: (page) => nhInstance.get(`${process.env.REACT_APP_API_LOCAL_URL}/posts`)

}