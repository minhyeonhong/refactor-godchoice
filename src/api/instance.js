import axios from "axios";
import { getCookie } from "../cookie/cookie";


//헤더 없는 인스턴스
export const nhInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {},
});

//헤더 있는 인스턴스
export const hInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Access_Token": localStorage.getItem("token") === undefined ? "" : localStorage.getItem("token"),
    },

    withCredentials: true,
});



