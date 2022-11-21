import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Kakao from "../components/login/Kakao";
import Naver from "../components/login/Naver";
import Google from "../components/login/Google";

import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";

import Post from "../pages/Post";
import Detail from "../pages/Detail";

import MyPage from "../pages/myPage/MyPage";
import MyPageEdit from "../pages/myPage/MyPageEdit";
import MyPagePost from "../pages/myPage/MyPagePost";
import MyPageCmt from "../pages/myPage/MyPageCmt"
import MyPageScrap from "../pages/myPage/MyPageScrap";
import FestivalPost from "../components/post/FestivalPost";
import GatherPost from "../components/post/GatherPost";
import QuestionPost from "../components/post/QuestionPost";


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 홈 페이지 */}
                <Route path="/" element={<Home />} />
                {/* 포스트 페이지 */}
                <Route path="/post" element={<Post />} />

                {/* 로그인 페이지 */}
                <Route path="/login" element={<LoginPage />} />
                {/* 카카오 로그인 --- Redirect_URI 경로로 넣기*/}
                <Route path="/member/signup/kakao" element={<Kakao />} />
                {/* 네이버 로그인 --- Redirect_URI 경로로 넣기*/}
                <Route path="/member/signup/naver" element={<Naver />} />
                {/* 구글 로그인 --- Redirect_URI 경로로 넣기*/}
                <Route path="/member/signup/google" element={<Google />} />


  
                {/* 디테일 페이지 */}
                <Route path="/:url/:postId" element={<Detail />}/>
                {/* 행사글 페이지*/}
                <Route path="/festivalpost" element={<FestivalPost />}/> 
                {/*모집글 페이지*/}
                <Route path="/gatherpost" element={<GatherPost />}/>
                {/*질문글 페이지*/}
                <Route path="/questionpost" element={<QuestionPost />}/>

                {/* 마이페이지 */}
                <Route path="/mypage" element={<MyPage />} />
                {/* 마이페이지 수정 */}
                <Route path="/mypageedit" element={<MyPageEdit />} />
                {/* 마이페이지 내가 쓴 글 */}
                <Route path="/mypagepost" element={<MyPagePost />} />
                {/* 마이페이지 댓글 단 글 */}
                <Route path="/mypagecomment" element={<MyPageCmt />} />
                {/* 마이페이지 스크랩 */}
                <Route path="/mypagescrap" element={<MyPageScrap />} />






            </Routes>
        </BrowserRouter>
    );
};

export default Router;



