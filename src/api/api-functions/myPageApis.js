import axios from "axios";
import { hInstance, nhInstance } from "../instance";



export const myPageApis = {
  
    //마이페이지 조회
    // getMyPageAX: (email) => hInstance.get(`/getMyPage?email=${email}`),
    getMyPageAX: (payload) => hInstance.get(`/mypage/user`, payload),

    //마이페이지 수정
    putMyPageAX: (payload) => hInstance.put(`/mypage`, payload),
    
    //마이페이지 이미지 수정
    // postMyImgAX: (payload) => hInstance.put(`/mypage/img`, payload),

    // 내글 불러오기
    getMyPostAX: (payload) => hInstance.get(`/mypage/mypost`, payload),

    //  댓글 단 글
    getMyCmtAX: (payload) => hInstance.get(`/mypage/mycomment`, payload),

    // 스크랩
    getMyScrapAX: (payload) => hInstance.get(`/mypage/myscrap`, payload),

    // 로그아웃
    // 회원탈퇴

  
}