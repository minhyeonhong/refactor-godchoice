import { instance } from "../instance";

export const commentApis = {
    /**댓글 조회 */
    getCommentAX: (obj) => instance.get(`${process.env.REACT_APP_API_URL}/comments/${obj.postId}/${obj.kind}`),
    /**댓글 등록 */
    insertCommentAX: (obj) => instance.post(`${process.env.REACT_APP_API_URL}/comments/${obj.postId}/${obj.kind}`, obj.comment),
    /**댓글 삭제 */
    deleteCommentAX: (obj) => instance.delete(`${process.env.REACT_APP_API_URL}/comments/${obj.postId}/${obj.commentId}/${obj.kind}`),

}