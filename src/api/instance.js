import axios from "axios";
import { getCookie } from "../cookie/cookie";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Access_Token": localStorage.getItem("token") === undefined ? "" : localStorage.getItem("token"),
    },

    withCredentials: true,
});

// 요청 인터셉터 추가하기
// instance.interceptors.request.use(function (config) {
//     // 요청이 전달되기 전에 작업 수행
//     return config;
// }, function (error) {
//     // 요청 오류가 있는 작업 수행
//     return Promise.reject(error);
// });

// 응답 인터셉터 추가하기
instance.interceptors.response.use(function (response) {
    switch (response.data?.status) {
        case 404:
            alert(response.data?.msg);
            window.location.replace("/");
            break;
        case 403:
            alert("로그인 시간이 만료되었습니다.\n다시 로그인 해주세요.");
            localStorage.clear();
            window.location.replace("/login");
            break;
        default:
            return response;
    }
}, async function (error) {
    console.log("interceptors error", error);
    switch (error.response.status) {
        case 403:
            console.log("interceptors error 403", error.response);
            alert("로그인 시간이 만료되었습니다.\n다시 로그인 해주세요.");
            localStorage.clear();
            window.location.replace("/login");
            break;
        default:
            break;
    }

    return Promise.reject(error);
});
