import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postApis } from "../../api/api-functions/postApis"

//관리자글 조회
export const __getAdminPost = createAsyncThunk(
    "posts/__getAdminPost",
    async (payload, thunkAPI) => {
        try {
            const res = await postApis.getAdminPostAX();

            return thunkAPI.fulfillWithValue(res.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

//관리자글 작성
export const __addAdminPost = createAsyncThunk(
    "posts/__addAdminPost",
    async (payload, thunkAPI) => {
        try {
            postApis.addAdminPostAX(payload)
                .then((response) => {
                    window.location.replace('/mypage');
                });
        } catch (error) {
            console.log("error", error);
        }
    });

//관리자글 삭제
export const __delAdminPost = createAsyncThunk(
    "posts/__delAdminPost",
    async (payload, thunkAPI) => {
        try {
            postApis.deleteAdminPostAX(payload)
                .then((response) => {
                    console.log("관리자글 삭제 response", response.data);
                });
        } catch (error) {
            console.log("error", error);
        }
    });

export const __getAllPostList = createAsyncThunk(
    "postSlice/__getAllPostList",
    async (payload, thunkAPI) => {
        try {
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
                    if (response.data.status === 200) window.location.replace(`/eventposts/${response.data.data.postId}`);
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
            postApis.putEventPostAx(payload)
                .then((res) => {
                    if (res.data.status === 200) {
                        window.location.reload();
                    } else {
                        console.log(res.data);
                    }
                }).catch((error) => {

                })

        } catch (error) {
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
                    window.location.replace('/');
                })

        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const postSlice = createSlice({
    name: "postSlice",
    initialState: {
        adminPosts: [],
        posts: [],
        post: {},
        scrapState: null,
        searchState: {},
        comments: [],
        isLoading: false,
        isResetSearch: true,
        istLastPage: false,
        testPostId: 0
    },
    reducers: {
        test(state, action) {
            state.testPostId = action.payload;
        },
        //검생 상태
        putSearchState(state, action) {
            state.isResetSearch = true;
            state.searchState = { ...state.searchState, ...action.payload };
        },
        //페이지 상태
        putSearchStatePage(state, action) {
            state.isResetSearch = false;
            state.searchState = { ...state.searchState, page: action.payload };
        },
        //스크랩 상태
        setScrapState(state, action) {
            state.scrapState = action.payload;
        },

    },
    extraReducers: {
        //__getAdminPost
        [__getAdminPost.pending]: (state, action) => {
            state.isLoading = true;
        },
        [__getAdminPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            if (action.payload.status === 200) {
                state.adminPosts = action.payload.data;
            }
        },
        [__getAdminPost.rejected]: (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
        },
        //__getAllPostList
        [__getAllPostList.pending]: (state, action) => {
            state.isLoading = true;
        },
        [__getAllPostList.fulfilled]: (state, action) => {
            state.isLoading = false;
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

export const { test, putSearchState, putSearchStatePage, setScrapState } = postSlice.actions;
export default postSlice.reducer;