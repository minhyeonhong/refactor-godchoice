import { configureStore } from "@reduxjs/toolkit";

import postSlice from "../modules/postSlice";
import memberSlice from "../modules/memberSlice"

const store = configureStore({
    reducer: {
        postSlice,
        memberSlice
    },
    //배포 모드일때 리덕스 데브툴 사용 안함
    devTools: process.env.REACT_APP_MOD !== 'production'
});

export default store;
