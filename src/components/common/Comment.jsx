import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import { __insertComment, __deleteComment, setCommentList } from '../../redux/modules/commentSlice'
import useInput from '../../hooks/useInput';

const Comment = ({ postId, kind, commentDtoList }) => {
    const dispatch = useDispatch();
    const { commentList } = useSelector((state) => state.commentSlice);

    useEffect(() => {
        if (Object.keys(commentDtoList).length > 0) {
            commentDtoList.forEach(element => {
                setOpenReComment(e => [...e, false])
            });
            dispatch(setCommentList(commentDtoList));
        }
    }, [commentDtoList])

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

        console.log("obj", obj);
        dispatch(__insertComment(obj));
    }

    useEffect(() => {
        console.log("commentList", commentList);

    }, [commentList])

    const [openReComment, setOpenReComment] = useState([]);
    const isOpenReComment = (idx, onOff) => {
        let newArr = [...openReComment];
        newArr[idx] = onOff;
        setOpenReComment(newArr);
    }
    return (
        <StCommentWrap>
            <StCommentAddBox>
                <div>댓글</div>
                <StCommentInputBox>
                    <StUserImg src={localStorage.getItem('userImgUrl')} />
                    <input type='text' name="content" value={comment.content || ""} onChange={commentHandle} />
                    <button onClick={() => submit(null, comment.content)}>등록</button>
                </StCommentInputBox>
            </StCommentAddBox>
            <StCommentListBox>
                {
                    commentList && commentList.map((item, commentIdx) => {
                        return (
                            <StCommentBox key={item.commentId}>
                                <StComment>
                                    <div className='commentInput'>
                                        <div><StUserImg src={item.userImg} /> {item.userName}</div>
                                        <button onClick={() => { dispatch(__deleteComment({ commentId: item.commentId, kind })) }}>삭제</button>
                                    </div>
                                    <div>{item.content}</div>
                                    <div style={{ borderTop: `1px solid grey` }} />
                                    <div className='commentWriteDate'>
                                        <div>댓글 등록날짜 필요</div>
                                        <button onClick={() => isOpenReComment(commentIdx, true)}>답글달기</button>
                                    </div>
                                    <div style={{ display: openReComment[commentIdx] ? "inline-block" : "none" }}>
                                        <StUserImg src={localStorage.getItem('userImgUrl')} />
                                        <input type='text' name="content" value={reComment.content || ""} onChange={reCommentHandle} />
                                        <button onClick={() => {
                                            submit(commentIdx, reComment.content);
                                            isOpenReComment(commentIdx, false);
                                        }}>등록</button>
                                    </div>
                                </StComment>

                                {/* <StReCommentBox>
                                    <div><img src={_comment_arrow} /></div>
                                    <div>
                                        <div>대댓글 닉네임</div>
                                        <div>대댓글 내용</div>
                                        <div style={{ borderTop: `1px solid grey` }} />
                                        <div>방금d전</div>
                                        <button onClick={() => { alert('대댓글 삭제') }}>삭제</button>
                                    </div>
                                </StReCommentBox> */}

                                {item.eventPostCommentChildren.map((child) => {
                                    return (
                                        <StReCommentBox key={child.commentId}>
                                            <div>_comment_arrow</div>
                                            <div>
                                                <div>{child.userName}</div>
                                                <div>{child.content}</div>
                                                <div style={{ borderTop: `1px solid grey` }} />
                                                <div>방금d전</div>
                                                <button onClick={() => { dispatch(__deleteComment({ commentId: child.commentId, kind })) }}>삭제</button>
                                            </div>
                                        </StReCommentBox>
                                    )
                                })}
                            </StCommentBox>
                        )
                    })

                }
            </StCommentListBox>
        </StCommentWrap>
    );
};

export default Comment;

const StCommentWrap = styled.div`
    border-top : 1px solid grey;    
    display : flex;
    flex-direction : column;
    gap : 5px;
`
const StCommentAddBox = styled.div`
    display : flex;
    flex-direction : column;
    gap : 5px;
    background-color : pink;
`

const StCommentListBox = styled.div`
    display:flex;
    flex-direction:column;
    gap : 5px;
`

const StCommentBox = styled.div`
    background-color : pink;
`

const StReCommentBox = styled.div`
    
`

const StComment = styled.div`
    display:flex;
    flex-direction:column;
    .commentInput {
        display:flex;
        flex-direction:row;
        justify-content:space-between;
    }
    .commentWriteDate{
        display:flex;
        flex-direction:row;
        justify-content:space-between;
    }
`

const StUserImg = styled.img`
    width: 30px;
    height: 30px;
    border-radius:50%;
`

const StCommentInputBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content : center;
    align-items: center;
    padding: 0px;
    gap: 8px;
    input{
        width : 100%;
        border : none;
        border-radius : 10px;
    }

    /* display:flex;
        flex-direction:row;
        input{
        width : 50%;
        border : none;
        border-radius : 10px;
    }
    input:focus {outline: none;} */
        
`