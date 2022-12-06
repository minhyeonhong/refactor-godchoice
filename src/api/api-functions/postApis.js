import { instance } from "../instance";

export const postApis = {
    /**전체글 검색 조회 */
    searchPostAX: (searchInfo, page = 0) => instance.get(
        `${process.env.REACT_APP_API_URL}/allposts`, { params: { ...searchInfo, tag: searchInfo.tag.join(), page } }),
    /**상세글 조회 */
    getPostAX: (post) => instance.get(`${process.env.REACT_APP_API_URL}/${post.url}/${post.postId}`),

    /**좋아요 */
    postScrapAx: (post) => instance.post(`${process.env.REACT_APP_API_URL}/likes/${post.kind}/${post.postId}`),

    // 행사글 게시글 작성    
    addEventPostAx: (post) => instance.post(`${process.env.REACT_APP_API_URL}/eventposts`, post),
    // 모집글 게시글 작성
    addGatherPostAx: (post) => instance.post(`${process.env.REACT_APP_API_URL}/gatherposts`, post),
    // 질문글 게시글 작성
    addAskPostAx: (post) => instance.post(`${process.env.REACT_APP_API_URL}/askposts`, post),


    /**행사글 상세글 수정 */
    putEventPostAx: (post) => instance.put(`${process.env.REACT_APP_API_URL}/eventposts/${post.postId}`, post.content),
    /*모집글 상세글 수정*/
    putGatherPostAx: (post) => instance.put(`${process.env.REACT_APP_API_URL}/gatherposts/${post.postId}`, post.content),
    /*질문글 상세글 수정*/
    putAskPostAx: (post) => instance.put(`${process.env.REACT_APP_API_URL}/askposts/${post.postId}`, post.content),

    /* 행사글 상세글 삭제*/
    deleteEventPostAx: (id) => instance.delete(`${process.env.REACT_APP_API_URL}/eventposts/${id}`),
    /*모집글 상세글 삭제*/
    deleteGatherPostAx: (id) => instance.delete(`${process.env.REACT_APP_API_URL}/gatherposts/${Number(id)}`),
    /* 행사글 상세글 삭제*/
    deleteAskPostAx: (id) => instance.delete(`${process.env.REACT_APP_API_URL}/askposts/${id}`),

    /**관리자글 조회 */
    getAdminPostAX: (post) => instance.get(`${process.env.REACT_APP_API_URL}/getadminpost`),
    /**관리자글 작성 */
    addAdminPostAX: (post) => instance.post(`${process.env.REACT_APP_API_URL}/adminpost`, post),
    /* 관리자글 삭제*/
    deleteAdminPostAX: (id) => instance.delete(`${process.env.REACT_APP_API_URL}/adminpost/${id}`),


}