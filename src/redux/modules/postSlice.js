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

export const __getPost = createAsyncThunk(
    "postSlice/__getPost",
    async (payload, thunkAPI) => {
        try {
            const res = await postApis.getPostAX(payload);

            return thunkAPI.fulfillWithValue(res.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

// 스크랩
export const __postScrap = createAsyncThunk(
    "postSlice/__postScrap",
    async (payload, thunkAPI) => {
        try {
            const res = await postApis.postScrapAx(payload);

            return thunkAPI.fulfillWithValue(res.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);



export const __addPost = createAsyncThunk(
    "posts/__addPost",
    async (payload, thunkAPI) => {
        try {
            await postApis.addEventPostAx(payload)
                .then((response) => {
                    console.log("response", response.data);
                });
        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error);
        }
    });

export const __putPost = createAsyncThunk(
    "posts/__putPost",
    async (payload, thunkAPI) => {
        try {
            postApis.putPostAx(payload)
                .then((res) => {
                    console.log("res", res);
                    if (res.data.status === 200) {
                        window.location.reload();
                    } else {
                        console.log(res.data);
                        alert(res.data.msg);
                    }
                }).catch((error) => {

                })

        } catch (error) {
            console.log("error", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const __deletePost = createAsyncThunk(
    "posts/__deletePost",
    async (payload, thunkAPI) => {
        // console.log(payload)
        try {
            postApis.deleteEventPostAx(payload)
                .then((res) => {
                    console.log("res", res);
                    window.location.replace('/');
                })

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
        post: {},
        scrapState: null,
        searchState: {},
        comments: [],
        isLoading: false,
        isResetSearch: true,
        istLastPage: false
    },
    reducers: {
        putSearchState(state, action) {
            state.isResetSearch = true;
            state.searchState = { ...state.searchState, ...action.payload };
        },
        putSearchStatePage(state, action) {
            state.isResetSearch = false;
            state.searchState = { ...state.searchState, page: action.payload };
        },
        setScrapState(state, action) {
            state.scrapState = action.payload;
        },

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
                if (state.isResetSearch) {
                    state.posts = action.payload.data.content;
                } else {
                    state.posts.push(...action.payload.data.content);
                    if (action.payload.data.content.length !== 10) {
                        state.istLastPage = true;
                    }
                }
            }
        },
        [__getAllPostList.rejected]: (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
        },
        //__getPost
        [__getPost.pending]: (state, action) => {
            state.isLoading = true;
        },
        [__getPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            if (action.payload.status === 200) {
                state.post = action.payload.data;
            }
        },
        [__getPost.rejected]: (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
        },


        // __postScrap
        [__postScrap.fulfilled]: (state, action) => {
            state.isLoading = false;
            if (action.payload.status === 200) {
                state.scrapState = !state.scrapState;
            }
        },
        [__postScrap.rejected]: (state, action) => {
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

export const { putSearchState, putSearchStatePage, setScrapState } = postSlice.actions;
export default postSlice.reducer;