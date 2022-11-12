import { configureStore } from "@reduxjs/toolkit";
import gatherPosts from "../modules/PostSlice2"

import postSlice from "../modules/postSlice";
import questionPosts from "../modules/postSlice3"
const store = configureStore({
    reducer: {
        gatherPosts, postSlice, questionPosts

    },
    //배포 모드일때 리덕스 데브툴 사용 안함
    devTools: process.env.REACT_APP_MOD !== 'production'
});

export default store;

