import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../cookie/cookie";

const initialState={
    gatherPosts : [
      
    ]

}


export const __addPost2 = createAsyncThunk(
    "gatherPosts/__addPost2",
    async (payload, thunkAPI) => {
      try {
        await axios
          .post(`http://3.38.255.232/gatherposts`, payload, {
            headers: {
              enctype: "multipart/form-data",
              Access_Token: getCookie('Access_Token'),
              // RefreshToken: refreshToken, 생략 예정
              "Cache-Control": "no-cache",
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

        
    }})

export const { } = PostSlice2.actions;
export default PostSlice2.reducer;
    