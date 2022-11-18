import { configureStore } from "@reduxjs/toolkit";
import gatherPosts from "../modules/PostSlice2"

import postSlice from "../modules/postSlice";
import memberSlice from "../modules/memberSlice"
import questionPosts from "../modules/postSlice3"
import myPage from "../modules/myPageSlice"



const store = configureStore({
    reducer: {
        postSlice,
        memberSlice,
        gatherPosts,
        questionPosts,
        myPage,        
    },
    //배포 모드일때 리덕스 데브툴 사용 안함
    devTools: process.env.REACT_APP_MOD !== 'production'
});

export default store;

