import React, { useState, useEffect } from "react";
import { BookmarkStroke, BookmarkFill } from "../../assets/index";
import { updateScrapUsers } from "../../hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";

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

    updateScrapUsers(postId, copyScrapUsers);

    queryClient.prefetchQuery(["getFBPostPart"]);
  };

  return (
    <>
      <div onClick={scrapHandler}>
        {scrapState ? <BookmarkFill /> : <BookmarkStroke />}
      </div>
    </>
  );
};

export default PostScrap;