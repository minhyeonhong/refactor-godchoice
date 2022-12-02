import { instance } from "../instance";



export const myPageApis = {

    //마이페이지 조회
    getMyPageAX: () => instance.get(`${process.env.REACT_APP_API_URL}/mypage/user`),

    //마이페이지 수정
    putMyPageAX: (payload) => instance.put(`${process.env.REACT_APP_API_URL}/mypage`, payload),

    // 내글 불러오기
    getMyPostAX: () => instance.get(`${process.env.REACT_APP_API_URL}/mypage/mypost`),

    //  댓글 단 글
    getMyCmtAX: () => instance.get(`${process.env.REACT_APP_API_URL}/mypage/mycomment`),

    // 스크랩
    getMyScrapAX: () => instance.get(`${process.env.REACT_APP_API_URL}/mypage/myscrap`),

    // 로그아웃
    // 회원탈퇴
}