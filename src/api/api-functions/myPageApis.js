import axios from "axios";
import { instance } from "../instance";



export const myPageApis = {

    //마이페이지 조회
    // getMyPageAX: (email) => instance.get(`/getMyPage?email=${email}`),
    getMyPageAX: (payload) => instance.get(`/mypage/user`),

    //마이페이지 수정
    putMyPageAX: (payload) => instance.put(`/mypage`, payload),

    //마이페이지 이미지 수정
    // postMyImgAX: (payload) => instance.put(`/mypage/img`, payload),

    // 내글 불러오기
    getMyPostAX: (payload) => instance.get(`/mypage/mypost`, payload),

    //  댓글 단 글
    getMyCmtAX: (payload) => instance.get(`/mypage/mycomment`, payload),

    // 스크랩
    getMyScrapAX: (payload) => instance.get(`/mypage/myscrap`, payload),

    // 로그아웃
    // 회원탈퇴


}