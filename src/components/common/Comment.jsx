import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { __insertComment, __deleteComment, setCommentList, __getComment } from '../../redux/modules/commentSlice'
import useInput from '../../hooks/useInput';

import Button from '../elements/Button';
import { CaretUp, CommentArrow, XBtn, ReComment } from '../../assets/index';

const Comment = ({ postId, kind, commentDtoList }) => {
    const dispatch = useDispatch();
    const { commentList } = useSelector((state) => state.commentSlice);

    // useEffect(() => {
    //     if (Object.keys(commentDtoList).length > 0) {
    //         commentDtoList.forEach(element => {
    //             setOpenReComment(e => [...e, false])
    //         });
    //         dispatch(setCommentList(commentDtoList));
    //     }
    // }, [commentDtoList])

    useEffect(() => {
        dispatch(__getComment({ postId, kind }));
    }, [])

    const [comment, setComment, commentHandle] = useInput({
        content: ""
    });

    const [reComment, setReComment, reCommentHandle] = useInput({
        content: ""
    });

    const submit = (parentId, content) => {
        const obj = {
            postId,
            kind,
            comment: {
                content,
                parentId
            }
        }

        if (content === "") {
            alert("댓글을 입력해 주세요");
            return
        }

        dispatch(__insertComment(obj));
    }

    const [openReComment, setOpenReComment] = useState([]);
    const isOpenReComment = (idx, onOff) => {
        let newArr = [...openReComment];
        newArr[idx] = onOff;
        setOpenReComment(newArr);
    }
    return (
        <StCommentWrap>
            <StCommentAddBox>
                <h5>댓글</h5>
                <StCommentInputBox style={{marginTop:"3px"}}>
                    <StUserImg src={localStorage.getItem('userImgUrl')} />
                    <div className='inputBox'>
                        <input type='text' name="content" value={comment.content || ""} onChange={commentHandle} />
                        <Button btnType='svg' margin='0 5px' backgroundColor='#3556E1' onClick={() => submit(null, comment.content)}><CaretUp /></Button>
                    </div>
                </StCommentInputBox>
            </StCommentAddBox>
            <StCommentListBox>
                {/* 댓글 */}
                {
                    commentList && commentList.map((item, commentIdx) => {
                        return (
                            <StCommentBox key={item.commentId}>
                                <StComment>
                                    <div className='userBox'>
                                        <div><StUserImg src={item.userImg} /> {item.userName}</div>
                                        {
                                            Number(localStorage.getItem('userId')) === item.userId &&
                                            <Button btnType='svg' onClick={() => { dispatch(__deleteComment({ postId, commentId: item.commentId, kind })) }}><XBtn /></Button>
                                        }
                                    </div>
                                    {/* <textarea value={item.content} readOnly /> */}
                                    <div className='contentBox'>{item.content}</div>
                                    <div className='dateBox'>
                                        <div className='date'>{item.commentWriteDate}</div>
                                        {
                                            item.content !== '알수없음' &&
                                            <Button btnType='svg' onClick={() => isOpenReComment(commentIdx, true)}><ReComment /></Button>
                                        }
                                    </div>

                                </StComment>
                                <StCommentInputBox style={{ display: openReComment[commentIdx] ? "flex" : "none" }}>
                                    <StUserImg src={localStorage.getItem('userImgUrl')} />
                                    <div className='inputBox'>
                                        <input type='text' name="content" value={reComment.content || ""} onChange={reCommentHandle} />
                                        <Button btnType='svg' margin='0 5px' backgroundColor='#3556E1' onClick={() => {
                                            submit(item.commentId, reComment.content);
                                            isOpenReComment(commentIdx, false);
                                        }}><CaretUp /></Button>
                                    </div>
                                </StCommentInputBox>
                                {/* 대댓글 */}
                                {
                                    kind === 'event' &&
                                    item.eventPostCommentChildren.map((child) => {
                                        return (
                                            <StReCommentBox key={child.commentId}>
                                                <div><CommentArrow /></div>
                                                <StComment>
                                                    <div className='userBox'>
                                                        <div><StUserImg src={child.userImg} /> {child.userName}</div>
                                                        {
                                                            Number(localStorage.getItem('userId')) === child.userId &&
                                                            <Button btnType='svg' onClick={() => { dispatch(__deleteComment({ postId, commentId: child.commentId, kind })) }}><XBtn /></Button>
                                                        }
                                                    </div>
                                                    <div className='contentBox'>{child.content}</div>
                                                    <div className='dateBox'>
                                                        <div className='date'>{child.commentWriteDate}</div>
                                                    </div>
                                                </StComment>
                                            </StReCommentBox>
                                        )
                                    })
                                }
                                {
                                    kind === 'gather' &&
                                    item.gatherPostCommentChildren.map((child) => {
                                        return (
                                            <StReCommentBox key={child.commentId}>
                                                <div><CommentArrow /></div>
                                                <StComment>
                                                    <div className='userBox'>
                                                        <div><StUserImg src={child.userImg} /> {child.userName}</div>
                                                        {
                                                            Number(localStorage.getItem('userId')) === child.userId &&
                                                            <Button btnType='svg' onClick={() => { dispatch(__deleteComment({ postId, commentId: child.commentId, kind })) }}><XBtn /></Button>
                                                        }
                                                    </div>
                                                    <div className='contentBox'>{child.content}</div>
                                                    <div className='dateBox'>
                                                        <div className='date'>{child.commentWriteDate}</div>
                                                    </div>
                                                </StComment>
                                            </StReCommentBox>
                                        )
                                    })
                                }
                                {
                                    kind === 'ask' &&
                                    item.askPostCommentChildren.map((child) => {
                                        return (
                                            <StReCommentBox key={child.commentId}>
                                                <div><CommentArrow /></div>
                                                <StComment>
                                                    <div className='userBox'>
                                                        <div><StUserImg src={child.userImg} /> {child.userName}</div>
                                                        {
                                                            Number(localStorage.getItem('userId')) === child.userId &&
                                                            <Button btnType='svg' onClick={() => { dispatch(__deleteComment({ postId, commentId: child.commentId, kind })) }}><XBtn /></Button>
                                                        }
                                                    </div>
                                                    <div className='contentBox'>{child.content}</div>
                                                    <div className='dateBox'>
                                                        <div className='date'>{child.commentWriteDate}</div>
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
        width : 100%;
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