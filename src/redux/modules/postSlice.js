import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { postApis } from "../../api/api-functions/postApis"
import { getCookie } from "../../cookie/cookie";


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

export const __addComment = createAsyncThunk(
    "comments/__addComment",
    async (payload, thunkAPI) => {
      try {
        //console.log(payload)
        const data = await axios.post(
          `http://localhost:3001/comments`,{comment : payload},
        //  `http://localhost:3001/comments${payload.id}`,{comment : payload.comment},
        //   {
        //     headers: {
        //       "Content-Type": `application/json`,
        //       Access_Token: getCookie('Access_Token'),
        //       // RefreshToken: refreshToken, 생략 예정
        //       "Cache-Control": "no-cache",
        //     },
        //   }
        );
        return thunkAPI.fulfillWithValue(data.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const __getComment = createAsyncThunk(
    "comments/__getComment",
    async (payload, thunkAPI) => {
      try {
        const data = await axios.get("http://localhost:3001/comments");
        return thunkAPI.fulfillWithValue(data.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const __deleteComment = createAsyncThunk(
    "comments/__deleteComment",
    async (payload, thunkAPI) => {
      try {
        console.log(payload);
        const data = await axios.delete(
          `https://study.o-r.kr/api/feed/${payload}`,  
        //   {
        //     headers: {
        //       Access_Token: getCookie('Access_Token'),
        //       // RefreshToken: refreshToken, 생략 예정
        //       "Cache-Control": "no-cache",
        //     },
        //   }
        );
        return thunkAPI.fulfillWithValue(payload);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  )


export const postSlice = createSlice({
    name: "postSlice",
    initialState: {
        posts: [],
        comments : [],
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

        //__addComment
        [__addComment.pending]: (state) => {
            state.isLoading = true;
        },
        [__addComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments.push(action.payload);
        },
        [__addComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //__getComment
        [__getComment.pending]: (state) => {
            state.isLoading = true;
        },
        [__getComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments = action.payload;
        },
        [__getComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

          //__deleteComment
         [__deleteComment.pending]: (state) => {
        state.isLoading = true;
        },
        [__deleteComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments = state.comments.filter(
              (comment) => comment.commentid!== action.payload);
        },
        [__deleteComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

    }
});

export const { } = postSlice.actions;
export default postSlice.reducer;