import { configureStore } from "@reduxjs/toolkit";
import { __kakaoLogin } from "../modules/memberSlice";

import postSlice from "../modules/postSlice";

const store = configureStore({
    reducer: {
        __kakaoLogin,
        postSlice
    },
    //배포 모드일때 리덕스 데브툴 사용 안함
    devTools: process.env.REACT_APP_MOD !== 'production'
});

export default store;
