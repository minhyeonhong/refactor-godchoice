import { myPageApis } from "../../api/api-functions/myPageApis";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookie } from "../../cookie/cookie";
import { Navigate } from "react-router-dom";



// user 정보 가져오기
export const __getMyInfo = createAsyncThunk(
    "myPage/__getMyInfo",
    async (payload, thunkAPI) => {
        try {
            const response = await myPageApis.getMyPageAX(payload)
            console.log("getMyPageAX response ===> ", response)
            return thunkAPI.fulfillWithValue(response.data.data)
        } catch (error) {
            console.log(error)
            alert(error.response.msg)
            return thunkAPI.rejectWithValue(error)

        }

    }
);

// 내 정보 수정

export const __putMyInfo = createAsyncThunk(
    "myPage/__putMyInfo",
    async (payload, thunkAPI) => {
        try {
            //   const response = await myPageApis.putMyPageAX(payload)
            console.log("__putMyInfo payload", payload);
            myPageApis.putMyPageAX(payload)
                .then((res) => {
                    if (res.data.status === 200) {
                        window.location.replace("/mypage");
                    }
                }).catch((error) => {
                    console.log("__putMyInfo error", error);
                    window.location.replace("/mypage");
                })

            //   const response = await myPageApis.putMyPageAX(payload,
            //     {
            //         "Content-Type":"multipart/form-data",
            //     }
            //     );
            //     console.log("putMyPageAX response ===> ",response)

            //     if (response.data.msg ==="수정이 완료되었습니다" 
            //     ){alert(response.data.msg)}
            //     window.location.replace("/mypage")
            // return thunkAPI.fulfillWithValue(response.data.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)



// 닉네임 변경   
// export const __putMyInfo = createAsyncThunk(
//     'mypage/__putMyInfo',
//     async (payload, thunkAPI) => {
//       console.log(payload);
//       try {
//         const response = await myPageApis.putMyPageAX(payload, {
//           nickName: payload.nickName,
//         });
//         // localStorage.setItem('nickName', response.data.nickName);
//         setCookie('nickName', response.data.nickName);
//         return thunkAPI.fulfillWithValue(response.data);
//       } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data);
//       }
//     },
//   );

// 프로필 사진 변경
// export const __putMyInfoImg = createAsyncThunk(
//     "putMyInfoImg", async (formData, thunkAPI) => {
//     try {
//       const response = await myPageApis.putMyImgAX( formData, 
//         {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       thunkAPI.dispatch(__getMyInfo());
//     } catch (error) {
//       return;
//     }
//   });


// 내 글
export const __getMyPost = createAsyncThunk(
    "myPage/__getMyPost", async (payload, thunkAPI) => {
        try {
            const response = await myPageApis.getMyPostAX(payload)
            console.log("getMyPostAX response ===> ", response)
            return thunkAPI.fulfillWithValue(response.data.data)
        } catch (error) {
            console.log(error)
            alert(error.response.msg)
            return thunkAPI.rejectWithValue(error)
        }

    }
);

// 내가 댓글 단 글
export const __getMyCmt = createAsyncThunk(
    "myPage/__getMyCmt", async (payload, thunkAPI) => {
        try {
            const response = await myPageApis.getMyCmtAX(payload)
            console.log("getMyCmtAX response ===> ", response)
            return thunkAPI.fulfillWithValue(response.data.data)
        } catch (error) {
            console.log(error)
            alert(error.response.msg)
            return thunkAPI.rejectWithValue(error)
        }

    }
);


// 스크랩
export const __getMyScrap = createAsyncThunk(
    "myPage/__getMyScrap", async (payload, thunkAPI) => {
        try {
            const response = await myPageApis.getMyScrapAX(payload)
            console.log("getMyScrapAX response ===> ", response)
            return thunkAPI.fulfillWithValue(response.data.data)
        } catch (error) {
            console.log(error)
            alert(error.response.msg)
            return thunkAPI.rejectWithValue(error)
        }

    }
);

const initialState = {
    // myPage: [],
    userInfo: [],
    isLoading: false,
    myPostList: {},
    myCommentList: {},
    myScrapList: {},
    saveCategoryTab: 'event'
};

const myPageSlice = createSlice({
    name: "myPage",
    initialState,
    reducers: {
        saveCategory: (state, action) => {
            state.saveCategoryTab = action.payload;  // 선택한 카테고리 save
        }

    },
    extraReducers: {
        [__getMyInfo.pending]: (state) => {
            state.isLoading = true;  // 네트워크 요청이 시작되면 로딩상태 true로 변경
        },
        [__getMyInfo.fulfilled]: (state, action) => {
            state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경
            // state.userInfo.push(action.payload);
            state.userInfo = action.payload;
        },
        [__getMyInfo.rejected]: (state, action) => {
            state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경
            state.error = action.payload; // catch 된 error 객체를 state.error에 넣어줌
        },

        [__putMyInfo.fulfilled]: (state, action) => {
            state.userInfo = action.payload;
        },
        [__putMyInfo.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log("action 나와라!!! ===> ", action);
        },


        // [_putMyInfoImg.pending]: (state) => {
        //     state.isLoading = true; 
        // },
        // [__putMyInfoImg.fulfilled]: (state, action) => {
        //     state.isLoading = false;
        //     // state.userInfo.nickname = action.payload.nickname;
        // },
        // [__putMyInfoImg.rejected]: (state, action) => {
        //     state.isLoading = false; 
        //     state.error = action.payload; 
        // },


        [__getMyPost.pending]: (state) => {
            state.isLoading = true;
        },
        [__getMyPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            console.log("action.payload ===>", action.payload);
            state.myPostList = action.payload;

        },
        [__getMyPost.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },


        [__getMyCmt.pending]: (state) => {
            state.isLoading = true;
        },
        [__getMyCmt.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.myCommentList = action.payload;
        },
        [__getMyCmt.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },


        [__getMyScrap.pending]: (state) => {
            state.isLoading = true;
        },
        [__getMyScrap.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.myScrapList = action.payload;
        },
        [__getMyScrap.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }

    },
});

export const { saveCategory } = myPageSlice.actions;
export default myPageSlice.reducer;



