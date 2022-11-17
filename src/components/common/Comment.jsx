import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import { __addComment, __deleteComment, __getComment } from '../../redux/modules/postSlice'

const Comment = () => {
    const dispatch = useDispatch();
    const commentList = useSelector((state) => state.postSlice.comments);
    const [comments, setComments] = useState("");

    useEffect(() => {
        dispatch(__getComment())
        console.log(commentList)
    }, [])


    const onsubmit = () => {
        dispatch(__addComment(comments))
        //dispatch(__addComment({id: Number(id), comment : comments}))
    }

    const deleteComment = (id) => {
        dispatch(__deleteComment(id))

    }

    console.log(comments)

    return (
        <StCommentWrap>
            <StCommentBox>
                <div>댓글</div>
                <div>
                    <InputGroup className="mb-3" onChange={(e) => setComments(e.target.value)}>
                        <Form.Control
                            placeholder="댓글 달기"
                            aria-label="댓글 달기"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2"
                            onClick={onsubmit}>
                            등록
                        </Button>
                    </InputGroup>
                </div>
            </StCommentBox>

            {
                commentList && commentList.map((item) => {
                    return (
                        <StListBox key={item.id}>
                            <div>닉네임</div>
                            {item.comment}
                            <div style={{ borderTop: `1px solid grey` }} />
                            <div>방금전</div>
                            <button onClick={() => deleteComment(commentList.id)}>삭제</button>
                        </StListBox>
                    )
                })
            }

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
const StCommentBox = styled.div`
    display : flex;
    flex-direction : column;
    gap : 5px;
    background-color : pink;
`

const StListBox = styled.div`
    background-color : pink;
`
