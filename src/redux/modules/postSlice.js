import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { postApis } from "../../api/api-functions/postApis"
import { getCookie } from "../../cookie/cookie";


export const __getAllPostList = createAsyncThunk(
    "postSlice/__getAllPostList",
    async (payload, thunkAPI) => {
        try {
            console.log("payload", payload)
            const res = await postApis.searchPostAX(payload);

            return thunkAPI.fulfillWithValue(res.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

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
                        "Access_Token": getCookie('Access_Token')
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
        searchState: {},
        totalPages: 3,
        isLoading: false
    },
    reducers: {
        putSearchState(state, action) {
            state.searchState = { ...state.searchState, ...action.payload };
        },
        putSearchStatePage(state, action) {
            state.searchState = { ...state.searchState, page: action.payload };
        }
    },
    extraReducers: {
        //__getAllPostList
        [__getAllPostList.pending]: (state, action) => {
            state.isLoading = true;
        },
        [__getAllPostList.fulfilled]: (state, action) => {
            state.isLoading = false;
            console.log("action.payload", action.payload)
            if (action.payload.status === 200) {
                console.log("200 go");
                state.posts.push(...action.payload.data.content);
                state.totalPages = action.payload.data.totalPages;
            }
        },
        [__getAllPostList.rejected]: (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
        },
        //__postList test
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

export const { putSearchState, putSearchStatePage } = postSlice.actions;
export default postSlice.reducer;