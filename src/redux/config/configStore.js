import { configureStore } from "@reduxjs/toolkit";
import posts from "../modules/PostSlice"
import gatherPosts from "../modules/PostSlice2"

const store = configureStore({
    reducer: {
        posts, gatherPosts
    },
    //배포 모드일때 리덕스 데브툴 사용 안함
    devTools: process.env.REACT_APP_MOD !== 'production'
});

export default store;

