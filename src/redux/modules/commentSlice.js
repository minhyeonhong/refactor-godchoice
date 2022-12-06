import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { commentApis } from "../../api/api-functions/commentApis"


/**댓글 등록 썬크 */
export const __insertComment = createAsyncThunk(
    "commentSlice/__insertComment",
    async (payload, thunkAPI) => {
        try {
            const insertRes = await commentApis.insertCommentAX(payload)

            return thunkAPI.fulfillWithValue(insertRes.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

/**댓글 삭제 썬크 */
export const __deleteComment = createAsyncThunk(
    "commentSlice/__deleteComment",
    async (payload, thunkAPI) => {
        try {
            const res = await commentApis.deleteCommentAX(payload)

            return thunkAPI.fulfillWithValue(res.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

/**댓글 조회 썬크 */
export const __getComment = createAsyncThunk(
    "commentSlice/__getComment",
    async (payload, thunkAPI) => {
        try {
            const res = await commentApis.getCommentAX(payload)
            return thunkAPI.fulfillWithValue(res.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const commentSlice = createSlice({
    name: "commentSlice",
    initialState: {
        commentList: []
    },
    reducers: {
        setCommentList(state, action) {
            state.commentList = action.payload;
        }
    },
    extraReducers: {
        //__insertComment
        [__insertComment.pending]: (state, action) => {
            state.isLoading = true;
        },
        [__insertComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            if (action.payload.status === 200) {
                state.commentList = action.payload.data;
            } else {
                console.log(action.payload.msg);
            }
        },
        [__insertComment.rejected]: (state, action) => {
            state.isLoading = false;
            console.log("error", action.payload);
        },
        //__deleteComment
        [__deleteComment.pending]: (state, action) => {
            state.isLoading = true;
        },
        [__deleteComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            if (action.payload.status === 200) {
                state.commentList = action.payload.data;
            } else {
                console.log(action.payload.msg);
            }
        },
        [__deleteComment.rejected]: (state, action) => {
            state.isLoading = false;
            console.log("error", action.payload);
        },
        //__getComment
        [__getComment.pending]: (state, action) => {
            state.isLoading = true;
        },
        [__getComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            if (action.payload.status === 200) {
                state.commentList = action.payload.data;
            } else {
                console.log(action.payload.msg);
            }
        },
        [__getComment.rejected]: (state, action) => {
            state.isLoading = false;
            console.log("error", action.payload);
        },
    }
});

export const { setCommentList } = commentSlice.actions;
export default commentSlice.reducer;