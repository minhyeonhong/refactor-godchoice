import React, { useState } from 'react';
import styled from 'styled-components';

import useInput from '../../hooks/useInput';

import Button from '../elements/Button';
import { CaretUp, CommentArrow, XBtn, ReComment } from '../../assets/index';

import { useQueryClient } from "@tanstack/react-query";
import { updatePostPart } from '../../firestore/module/postPart';
import { writeTime } from './Date';

const Comment = ({ postId, comments }) => {
    const queryClient = useQueryClient();

    //댓글 인풋
    const [comment, setComment, commentHandle] = useInput({
        content: ""
    });
    //대댓글 인풋
    const [reComment, setReComment, reCommentHandle] = useInput({
        content: ""
    });

    const writeComment = () => {
        const uid = localStorage.getItem("uid");
        const profile_image_url = localStorage.getItem("profile_image_url");
        const nickname = localStorage.getItem("nickname");

        if (comment.content === "") {
            alert("댓글을 입력해 주세요");
            return
        }

        const sendData = {
            comment: comment.content,
            reComments: [],
            uid,
            profile_image_url,
            writer: nickname,
            writeTime
        }

        updatePostPart(postId, { comments: [...comments, sendData] })
            .then(() => {
                setComment({ content: "" });
                queryClient.prefetchQuery(["getFBPostPart"]);
            })
            .catch((error) => {
                console.log("writeComment error", error);
            })
    }

    const writeReComment = (idx) => {
        const uid = localStorage.getItem("uid");
        const profile_image_url = localStorage.getItem("profile_image_url");
        const nickname = localStorage.getItem("nickname");

        if (reComment.content === "") {
            alert("댓글을 입력해 주세요");
            return
        }

        const sendData = {
            ...comments[idx],
            reComments: [
                ...comments[idx].reComments,
                {
                    comment: reComment.content,
                    uid,
                    profile_image_url,
                    writer: nickname,
                    writeTime
                }
            ]
        }

        comments.splice(idx, 1, sendData);

        updatePostPart(postId, { comments })
            .then(() => {
                setReComment({ content: "" });
                onReComment(idx);
                queryClient.prefetchQuery(["getFBPostPart"]);
            })
            .catch((error) => {
                console.log("writeReComment error", error);
            })
    }

    //댓글 삭제
    const delComment = (commentIdx) => {
        if (!window.confirm("댓글을 삭제 하시겠습니까?")) return;

        const hasReComment = comments[commentIdx].reComments.length > 0;
        const modComments = comments.map(comment => { return { ...comment, reComments: comment.reComments.map(reComment => reComment) } });

        if (hasReComment) {
            const sendData = {
                ...comments[commentIdx],
                comment: "알수없음",
            }

            modComments.splice(commentIdx, 1, sendData);
        } else {
            modComments.splice(commentIdx, 1);
        }

        updatePostPart(postId, { comments: modComments })
            .then(() => {
                queryClient.prefetchQuery(["getFBPostPart"]);
            })
            .catch((error) => {
                console.log("delComment error", error);
            })
    }

    //대댓글 삭제
    const delReComment = (commentIdx, reCommentIdx) => {
        if (!window.confirm("댓글을 삭제 하시겠습니까?")) return;

        const isReCommentCountOne = comments[commentIdx].reComments.length === 1;

        const modComments = comments.map(comment => { return { ...comment, reComments: comment.reComments.map(reComment => reComment) } });

        if (isReCommentCountOne && comments[commentIdx].comment === "알수없음") {
            modComments.splice(commentIdx, 1);
        } else {
            modComments[commentIdx].reComments.splice(reCommentIdx, 1);
        }

        updatePostPart(postId, { comments: modComments })
            .then(() => {
                queryClient.prefetchQuery(["getFBPostPart"]);
            })
            .catch((error) => {
                console.log("delComment error", error);
            })
    }

    //대댓글 인풋 온오프
    const onReComment = (idx) => {
        const writeReComment = document.getElementsByClassName("writeReComment")[idx];
        if (writeReComment.style.display === "none") {
            writeReComment.style.display = "flex";
        } else {
            writeReComment.style.display = "none";
        }
    }


    return (
        <StCommentWrap>
            <StCommentAddBox>
                <h5>댓글</h5>
                <StCommentInputBox style={{ marginTop: "3px" }}>
                    <StUserImg
                        src={localStorage.getItem('profile_image_url') === null ? "" : localStorage.getItem('profile_image_url')}
                        onError={(e) => {
                            e.target.src = `${process.env.PUBLIC_URL}/kakao_base_profil.jpg`
                        }} />
                    <div className='inputBox'>
                        <input type='text' name="content" value={comment.content || ""} onChange={commentHandle} />
                        <Button btnType='svg' margin='0 5px' backgroundColor='#3556E1' onClick={writeComment}><CaretUp /></Button>
                    </div>
                </StCommentInputBox>
            </StCommentAddBox>
            <StCommentListBox>
                {/* 댓글 */}
                {
                    comments?.map((comment, commentIdx) => {
                        return (
                            <StCommentBox key={commentIdx}>
                                <StComment>
                                    <div className='userBox'>
                                        <div><StUserImg
                                            src={comment.profile_image_url}
                                            onError={(e) => {
                                                e.target.src = `${process.env.PUBLIC_URL}/kakao_base_profil.jpg`
                                            }} /> {comment.nickname}</div>
                                        {
                                            localStorage.getItem('uid') === comment.uid && comment.comment !== '알수없음' &&
                                            <Button btnType='svg' onClick={() => { delComment(commentIdx) }}><XBtn /></Button>
                                        }
                                    </div>
                                    {/* <textarea value={item.content} readOnly /> */}
                                    <div className='contentBox'>{comment.comment}</div>
                                    <div className='dateBox'>
                                        <div className='date'>{comment.writeTime}</div>
                                        {
                                            comment.comment !== '알수없음' &&
                                            <Button btnType='svg' onClick={() => onReComment(commentIdx)}><ReComment /></Button>
                                        }
                                    </div>

                                </StComment>
                                <StCommentInputBox className='writeReComment' style={{ display: "none" }}>
                                    <StUserImg
                                        src={localStorage.getItem('profile_image_url') === null ? "" : localStorage.getItem('profile_image_url')}
                                        onError={(e) => {
                                            e.target.src = `${process.env.PUBLIC_URL}/kakao_base_profil.jpg`
                                        }}
                                    />
                                    <div className='inputBox'>
                                        <input type='text' name="content" value={reComment.content || ""} onChange={reCommentHandle} />
                                        <Button btnType='svg' margin='0 5px' backgroundColor='#3556E1' onClick={() => {
                                            writeReComment(commentIdx);
                                        }}><CaretUp /></Button>
                                    </div>
                                </StCommentInputBox>
                                {/* 대댓글 */}
                                {
                                    comment.reComments?.map((reComment, reCommentIdx) => {
                                        return (
                                            <StReCommentBox key={reCommentIdx}>
                                                <div><CommentArrow /></div>
                                                <StComment>
                                                    <div className='userBox'>
                                                        <div><StUserImg src={reComment.profile_image_url} /> {reComment.nickname}</div>
                                                        {
                                                            localStorage.getItem('uid') === reComment.uid &&
                                                            <Button btnType='svg' onClick={() => { delReComment(commentIdx, reCommentIdx) }}><XBtn /></Button>
                                                        }
                                                    </div>
                                                    <div className='contentBox'>{reComment.comment}</div>
                                                    <div className='dateBox'>
                                                        <div className='date'>{reComment.writeTime}</div>
                                                    </div>
                                                </StComment>
                                            </StReCommentBox>
                                        )
                                    })
                                }
                            </StCommentBox>
                        )
                    })

                }
            </StCommentListBox>
        </StCommentWrap >
    );
};

export default Comment;

const StCommentWrap = styled.div`
    border-top : 1px solid #ccc;    
    display : flex;
    flex-direction : column;
    margin: 25px 0;
    padding: 20px 0;
`
const StCommentAddBox = styled.div`
    display : flex;
    flex-direction : column;
`

const StCommentListBox = styled.div`
    display:flex;
    flex-direction:column;
    margin-top : 12px;
    gap:10px;
`

const StCommentBox = styled.div`
    display:flex;
    flex-direction:column;
    gap:5px;
`

const StReCommentBox = styled.div`
    display:flex;
    flex-direction:row;
`

const StComment = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    border-radius : 10px;
    background-color : #FFFFFF;
    padding : 10px;
    .userBox {
        display:flex;
        flex-direction:row;
        justify-content:space-between;
    }
    .contentBox {
        margin : 10px 0;
        word-break: break-all;
    }
    .dateBox {
        display:flex;
        flex-direction:row;
        justify-content:space-between;
    }
    .dateBox .date {
        font-size : 14px;        
        display: flex;
        align-items: end;
    }
`

const StUserImg = styled.img`
    width: 36px;
    height: 36px;
    border-radius:50%;
`

const StCommentInputBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content : center;
    align-items: center;
    padding: 0px;
    gap: 8px;
    .inputBox{
        width : 90%;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius : 10px;
        background-color : white;
    }
    input{
        width : 95%;
        height : 40px;
        border : none;
        border-radius : 10px;
        text-indent:5px;
    }
    input:focus {outline: none;}
        
`