import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// 리덕스 import
import { __getPost, __postScrap, setScrapState } from "../../redux/modules/postSlice";
import { useDispatch, useSelector } from "react-redux";

import { HeartEmpty, HeartFull } from "../../assets";

const PostScrap = ({ bookMarkStatus }) => {
  // 좋아요 기능
  const dispatch = useDispatch();
  const { scrapState } = useSelector((state) => state.postSlice)
  const { url, postId } = useParams();

  const scrapHandler = () => {
    dispatch(__postScrap({ kind: url.split('posts')[0].toString(), postId: Number(postId) }));
  };

  useEffect(() => {
    if (bookMarkStatus !== undefined) {
      dispatch(setScrapState(bookMarkStatus));
    }
  }, [bookMarkStatus])

  useEffect(() => {
    console.log("scrapState", scrapState);
  }, [scrapState])

  return (
    <>
      <div onClick={() => scrapHandler()}>
        {scrapState !== null && scrapState ? <HeartFull /> : <HeartEmpty />}
      </div>
    </>
  );
};

export default PostScrap;