import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    questionPosts : [
      
    ]

}


export const __addPost3 = createAsyncThunk(
    "questionPosts/__addPost3",
    async (payload, thunkAPI) => {
      try {
        await axios
          .post(`http://54.180.201.200/askposts`, payload, {
            headers: {
              enctype: "multipart/form-data",
              Access_Token: localStorage.getItem("token"),
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


export const __getPost3 = createAsyncThunk(
    "questionPosts/__getPost3",
    async (payload, thunkAPI) => {
      try {
        const data = await axios.get("http://3.38.255.232/allposts", 
        // {
        //   headers: {
        //     "Content-Type": `application/json`,
        //     Access_Token: getCookie('Access_Token'),
        //     "Cache-Control": "no-cache",
        //   },
        // }
        );
        return thunkAPI.fulfillWithValue(data.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const PostSlice3 = createSlice({
    name: "questionPosts", 
    initialState,
    reducers: {},
    extraReducers: {
        
    //__addPost3
    [__addPost3.pending]: (state) => {
        state.isLoading = true; 
    },
    [__addPost3.fulfilled]: (state, action) => {
        state.isLoading = false; 
        state.questionPosts = action.payload; 
    },
    [__addPost3.rejected]: (state, action) => {
        state.isLoading = false; 
        state.error = action.payload; 
    },

     //__getPost3
     [__getPost3.pending]: (state) => {
      state.isLoading = true;
      },
      [__getPost3.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.questionPosts = action.payload;
      },
      [__getPost3.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
      }

        
    }})

export const { } = PostSlice3.actions;
export default PostSlice3.reducer;
    