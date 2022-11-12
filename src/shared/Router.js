import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Kakao from "../components/login/Kakao";
import Naver from "../components/login/Naver";
import Google from "../components/login/Google";


import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import MyPage from "../pages/MyPage";
import Post from "../pages/Post";
import Detail from "../pages/Detail";
import QuestionPost from "../pages/QuestionPost";


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 홈 페이지 */}
                <Route path="/" element={<Home />} />
                {/* 마이 페이지 */}
                <Route path="/mypage" element={<MyPage />} />
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
                {/*작성글 페이지 */}
                <Route path="/questionpost" element={<QuestionPost />} />
                {/* 디테일 페이지 */}
                <Route path="/detail" element={<Detail />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;



