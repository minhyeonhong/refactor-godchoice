import axios from "axios";

export const kakaoInstance = axios.create({
    baseURL: "",
});

// 요청 인터셉터 추가하기
// instance.interceptors.request.use(function (config) {
//     // 요청이 전달되기 전에 작업 수행
//     return config;
// }, function (error) {
//     // 요청 오류가 있는 작업 수행
//     return Promise.reject(error);
// });

kakaoInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        switch (error.response.status) {
            case 401: {
                alert("로그인 정보가 만료되어 로그아웃 합니다.");
                localStorage.clear();
                window.location.replace("/");
                break;
            }
        }

        return Promise.reject(error);
    }
);