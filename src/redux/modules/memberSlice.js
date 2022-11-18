import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import React from "react";
import axios from "axios";
import { setCookie } from "../../cookie/cookie";

// 카카오로그인
export const __kakaoLogin = createAsyncThunk(
  "memberSlice/__kakaoLogin",
  async (payload, thunkAPI) => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}/member/signup/kakao?code=${payload}`)
        .then((res) => {
          console.log("넘어온 값", res); // 토큰이 넘어올 것임
          const Access_Token = res.headers.access_token;
          console.log(Access_Token)
          localStorage.setItem("token", Access_Token);
          localStorage.setItem("email", res.data.email);              
          localStorage.setItem("nickName", res.data.nickName);
          localStorage.setItem("userImg", res.data.userImg);
              
          // setCookie("nickName", res.data.nickName);
          // setCookie("userImg", res.data.userImg);
          // setCookie("nickName", res.data.email);

          console.log("토큰나와라 ===> ", localStorage.getItem("token"))

          window.location.replace("/mypage")
        }).catch((error) => {
          console.log("소셜로그인 에러", error);
          //window.alert("로그인에 실패하였습니다.");
          //   window.location.replace("/login");
        })

    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

// export const __kakaoLogin = (code) => {
//   return function (dispatch, getState) {
//       axios.get(`${process.env.REACT_APP_API_URL}/member/signup/kakao?code=${code}`)
//     //   axios.get(`http://3.38.255.232:8080/member/signup/kakao/${code}`)
//           .then((res) => {
//               console.log("넘어온 값", res); // 토큰이 넘어올 것임
//               const Access_Token = res.headers.access_token;
//               setCookie("token", Access_Token)
//               // localStorage.setItem("token", Access_Token);              
//               // localStorage.setItem("nickName", res.data.data.accountName);
//               // localStorage.setItem("profileImage", res.data.data.profileImage);
//               // localStorage.setItem("ageRange", res.data.data.ageRange);
//               // localStorage.setItem("email", res.data.data.email);
//               // localStorage.setItem("gender", res.data.data.gender);
//               // // 토큰 받았고 로그인됐으니 메인으로 화면 전환시켜줌
//               window.location.replace("/")
//           })
//           .catch((error) => {
//               console.log("소셜로그인 에러", error);
//               window.alert("로그인에 실패하였습니다.");
//               // 로그인 실패하면 로그인 화면으로 돌려보냄
//             //   window.location.replace("/login");
//           })
//   }
// };

// 네이버로그인
// export const __naverLogin = (code) => {
//   return function (dispatch, getState) {
//       axios.get(`http://3.38.255.232/member/signup/naver?code=${code}`)
//           .then((res) => {
//               console.log("넘어온 값", res); // 토큰이 넘어올 것임
//               const Access_Token = res.headers.access_token;
//               setCookie("token", Access_Token)
//               // localStorage.setItem("token", Access_Token);              
//               // localStorage.setItem("nickName", res.data.data.accountName);
//               // localStorage.setItem("profileImage", res.data.data.profileImage);
//               // localStorage.setItem("ageRange", res.data.data.ageRange);
//               // localStorage.setItem("email", res.data.data.email);
//               // localStorage.setItem("gender", res.data.data.gender);
//               // // 토큰 받았고 로그인됐으니 메인으로 화면 전환시켜줌
//               window.location.replace("/")
//           })
//           .catch((error) => {
//               console.log("소셜로그인 에러", error);
//               window.alert("로그인에 실패하였습니다.");
//               // 로그인 실패하면 로그인 화면으로 돌려보냄
//               window.location.replace("/login");
//           })
//   }
// };



// const kakaoLogin = (code) => {

//   const cookies = new Cookies();


//   return function (dispatch, getState, { history }) {
//     axios({
//       method: "GET",
//       url: `http://localhost3000/member/signup/kakao?code=${code}`,
//     })
//       .then((res) => {
//         console.log(res); // 토큰이 넘어올 것임

//         const Access_Token = res.headers.accessToken;  // 토큰 확인!!!

//         setCookie("token", Access_Token);    //쿠키에 토큰 저장   

//         history.replace("/") // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(홈으로)

//         }).catch((err) => {
//         console.log("소셜로그인 에러", err);
//         window.alert("로그인에 실패하였습니다.");
//         history.replace("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
//         }
//     )}
// };

// export default kakaoLogin;

// //로그아웃 Thunk
// export const __logout = createAsyncThunk(
//     "members/__logout",
//     async (payload, thunkAPI) => {
//         try {
//             loginApis.logoutAX()
//                 .then((res) => {
//                     if (res.data.status === 200) {
//                         delCookie("Access_Token")
//                         delCookie("nickname")
//                         alert("로그아웃 되었습니다")
//                         window.location.replace("/")
//                     }
//                 })
//                 .catch((error) => {
//                     if (error.response.data.status === 400) {
//                         delCookie("Access_Token")
//                         delCookie("nickname")
//                         alert("로그아웃 되었습니다")
//                         window.location.replace("/")
//                     }

//                 })

//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// )


export const memberSlice = createSlice({
  name: "memberSlice",
  initialState: {
    isLoading: false
    //loginModal: false
  },
  reducers: {
    //모달 토글
    // modalTogle(state, action) {
    //     state.loginModal = !state.loginModal;
    // },
  },
  extraReducers: {


  }
});

export const { } = memberSlice.actions;
export default memberSlice.reducer;