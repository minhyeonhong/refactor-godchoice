import React, { useState, useEffect } from "react";
import { BookmarkStroke, BookmarkFill } from "../../assets/index";
import { useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../../firestore/module/post";

const PostScrap = ({ postId, scrapUsers }) => {

  const [scrapState, setScrapState] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (scrapUsers.indexOf(localStorage.getItem("uid")) === -1) {
      setScrapState(false);
    } else {
      setScrapState(true);
    }
  }, [scrapUsers])

  const scrapHandler = () => {
    const copyScrapUsers = [...scrapUsers];
    const scrapIdx = scrapUsers.indexOf(localStorage.getItem("uid"));

    if (scrapIdx === -1) {
      copyScrapUsers.push(localStorage.getItem("uid"));
    } else {
      copyScrapUsers.splice(scrapIdx, 1);
    }

    updatePost(postId, { scrapUsers: copyScrapUsers });

    queryClient.prefetchQuery(["getFBPost"]);
  };

  return (
    <>
      <div onClick={scrapHandler} style={{ cursor: "pointer" }}>
        {scrapState ? <BookmarkFill /> : <BookmarkStroke />}
      </div>
    </>
  );
};

export default PostScrap;