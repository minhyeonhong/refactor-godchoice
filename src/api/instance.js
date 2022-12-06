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
// instance.request.use(function (config) {
//     // 요청이 전달되기 전에 작업 수행
//     return config;
// }, function (error) {
//     // 요청 오류가 있는 작업 수행
//     return Promise.reject(error);
// });

// 응답 인터셉터 추가하기
instance.interceptors.response.use(function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    console.log("인터셉터 response", response);
    return response;
}, async function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    switch (error.response.data.status) {
        case 400:
            console.log("인터셉터 400 error", error);
            break;
        case 403:
            // console.log("인터셉터 403 error", error);
            const refreshToken = localStorage.getItem('refreshToken');
            const token = localStorage.getItem('token');
            if (token !== null && refreshToken !== null) {
                alert("로그인 시간이 만료되었습니다.\n다시 로그인 해주세요.");
                window.location.replace("/login");

                // const res = await axios.get(`${process.env.REACT_APP_API_URL}/member/signup/issue/token`, {
                //     headers: {
                //         "Refresh_Token": refreshToken
                //     }
                // })

                // console.log("인터셉터 res", res);
                // if (res.data.status === 200) {
                //     localStorage.setItem("token", res.headers.access_token);
                //     localStorage.setItem("refreshToken", res.headers.refresh_token);
                // }
            }

            break;
        case 404:
            console.log("인터셉터 404 error", error);
            break;
        case 500:
            console.log("인터셉터 500 error", error);
            break;
        default:
            console.log("인터셉터 나머지 error", error);
            break;
    }

    return Promise.reject(error);
});
