import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { postApis } from "../../api/api-functions/postApis"


export const __postList = createAsyncThunk(
    "postSlice/__postList",
    async (payload, thunkAPI) => {
        try {

            const res = await postApis.postListAX();

            const curPage = payload * 10;

            return thunkAPI.fulfillWithValue(res.data.slice((curPage - 10), curPage));
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const __addPost = createAsyncThunk(
    "posts/__addPost",
    async (payload, thunkAPI) => {
        try {
            console.log(payload)
            await axios
                .post(`http://3.38.255.232/eventposts`, payload, {
                    headers: {
                        Access_Token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrX21oaDIwMjhAbmF2ZXIuY29tIiwiZXhwIjoxNjY4MTc4OTE5LCJpYXQiOjE2NjgxNzUzMTl9.t5DHMsToXqeNwbuHxQiRJzj2aq4if6comErbPql_pEo"
                        // RefreshToken: refreshToken, 생략 예정
                        //"Cache-Control": "no-cache",
                    },
                })
                .then((response) => {
                    console.log("response", response.data);
                });
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);



export const postSlice = createSlice({
    name: "postSlice",
    initialState: {
        posts: [],
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
        //__postList
        [__postList.pending]: (state, action) => {
            state.isLoading = true;
        },
        [__postList.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.posts.push(...action.payload);
        },
        [__postList.rejected]: (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
        },


        //__addPost
        [__addPost.pending]: (state) => {
            state.isLoading = true;
        },
        [__addPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.posts = action.payload;
        },
        [__addPost.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

export const { } = postSlice.actions;
export default postSlice.reducer;