import { hInstance, nhInstance } from "../instance";

export const commentApis = {
    /**댓글 조회 */
    getCommentAX: (obj) => hInstance.get(`${process.env.REACT_APP_API_URL}/comments/${obj.postId}/${obj.kind}`),
    /**댓글 등록 */
    insertCommentAX: (obj) => hInstance.post(`${process.env.REACT_APP_API_URL}/comments/${obj.postId}/${obj.kind}`, obj.comment),
    /**댓글 삭제 */
    deleteCommentAX: (obj) => hInstance.delete(`${process.env.REACT_APP_API_URL}/comments/${obj.postId}/${obj.commentId}/${obj.kind}`),

}