import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// 리덕스 import
import { __getPost, __postScrap } from "../../redux/modules/postSlice";
import { useDispatch, useSelector } from "react-redux";

import { HeartEmpty, HeartFull } from "../../assets";

const PostScrap = () => {
    // 좋아요 기능
    const dispatch = useDispatch();
    const data = useSelector((state) => state.postSlice.post);
    //console.log("안녕? =====> ", data)
    
    const [scrapState, setScrapState] = useState(false);
    const { url, postId } = useParams();

    //console.log( "얘는 url", data.bookmark);
    //console.log("얘는 postId", postId);



    const scrapHandler = () => {
        setScrapState(!scrapState)
      dispatch(__postScrap({url:url, postId:postId}));
    };
    useEffect(() => {
      dispatch(__getPost({url:url, postId:postId}));
    }, [scrapState]);
  
    return (
      <>
        <div onClick={() => scrapHandler()}>
          {data.bookmark ? <HeartFull /> : <HeartEmpty />}
        </div>
      </>
    );
  };
  
  export default PostScrap;