import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { postApis } from "../../api/api-functions/postApis"

const initialState={
    gatherPosts : [
      
    ]

}


export const __addPost2 = createAsyncThunk(
    "gatherPosts/__addPost2",
    async (payload, thunkAPI) => {
      try {
        await axios
          .post(`http://54.180.201.200/gatherposts`, payload, {
            headers: {
              enctype: "multipart/form-data",
              "Access_Token": localStorage.getItem("token"),
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

  export const __putPost = createAsyncThunk(
    "posts/__putPost",
    async (payload, thunkAPI) => {
        try {
            postApis.putGatherPostAx(payload)
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
      postApis.deleteGatherPostAx(payload)
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
    