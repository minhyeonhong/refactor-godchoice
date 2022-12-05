import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postApis } from "../../api/api-functions/postApis"

const initialState = {
  gatherPosts: [

  ]

}


export const __addPost2 = createAsyncThunk(
  "gatherPosts/__addPost2",
  async (payload, thunkAPI) => {
    try {
      await postApis.addGatherPostAx(payload)
        .then((response) => {
          if (response.data.status === 200) window.location.replace(`/gatherposts/${response.data.data.postId}`);
        });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __putPost = createAsyncThunk(
  "posts/__putPost",
  async (payload, thunkAPI) => {
    try {
      postApis.putGatherPostAx(payload)
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
      postApis.deleteGatherPostAx(payload)
        .then((res) => {
          window.location.replace('/');
        })

    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);




export const PostSlice2 = createSlice({
  name: "gatherPosts",
  initialState,
  reducers: {},
  extraReducers: {

    //__addPost2
    [__addPost2.pending]: (state) => {
      state.isLoading = true;
    },
    [__addPost2.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.gatherPosts = action.payload;
    },
    [__addPost2.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },


  }
})

export const { } = PostSlice2.actions;
export default PostSlice2.reducer;
