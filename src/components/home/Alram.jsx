import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useMutation, useQuery } from '@tanstack/react-query';
import { notificationApis } from '../../api/api-functions/notificationApis';
import { useNavigate } from 'react-router-dom';

function Alram({ popUpNotice }) {

    const navigate = useNavigate();
    //업데이트 인풋
    const [noticeList, setNoticeList] = useState([]);
    //디테일 페이지 server state
    const { isSuccess, isLoading, refetch } = useQuery(['getNoticeList'], //key
        () => notificationApis.getNotificationAX(),
        {//options
            refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
            retry: 0, // 실패시 재호출 몇번 할지
            onSuccess: res => { // 성공시 호출
                console.log("res.data", res.data);
                setNoticeList(res.data.data);
            }
        })
    //알림 읽고 해당 게시물로 이동
    const putNotice = useMutation({
        mutationFn: id => {
            return notificationApis.putNotificationAX(id);
        },
        onSuccess: res => {
            if (res.data.status === 200) {
                navigate(res.data.msg);
            }
        },
    })
    const onClickPut = (id) => {
        putNotice.mutate(id);
    }

    //알림 삭제
    const deleteNotice = useMutation({
        mutationFn: id => {
            return notificationApis.deleteNotificationAX(id);
        },
        onSuccess: res => {
            if (res.data.status === 200) {
                refetch();
            }
        },
    })
    const onDeleteAlram = (id) => {
        deleteNotice.mutate(id);
    }

    useEffect(() => {
        console.log("noticeList", noticeList);
    }, [noticeList])

    console.log(noticeList)

    return (
        <>
            {noticeList === null ?
                (<STDiv>
                    <STContent>알림 내용이 없습니다❗</STContent>
                </STDiv>) :
                (
                    <STDiv>
                        {noticeList?.map((comment, index) => {
                            return (
                                <div key={index}>
                                    {comment.readStatus === false && <STBox onClick={() => onClickPut(comment.notificationId)}>
                                        <STDelete onClick={(e) => {
                                            e.stopPropagation()
                                            onDeleteAlram(comment.notificationId)
                                        }}>✖</STDelete>
                                        <p> <b>{comment.title}</b>님이
                                            <br />댓글을 입력하셨습니다.
                                        </p>
                                        <STComment>💬{comment.message.length > 6 ? (comment.message.slice(0, 6) + "...") : (comment.message)} </STComment>
                                        <STCreatAT>{comment.createdAt}</STCreatAT>

                                    </STBox>}
                                    {comment.readStatus === true && <STBox2 onClick={() => onClickPut(comment.notificationId)}>
                                        <STDelete onClick={(e) => {
                                            e.stopPropagation()
                                            onDeleteAlram(comment.notificationId)
                                        }}>✖</STDelete>
                                        <p> <b>{comment.title}</b>님이
                                            <br />댓글을 입력하셨습니다.
                                        </p>
                                        <STComment>{comment.message.length > 6 ? (comment.message.slice(0, 6) + "...") : (comment.message)} </STComment>
                                        <STCreatAT>{comment.createdAt}</STCreatAT>

                                    </STBox2>}
                                </div>

                            )
                        })}
                    </STDiv>
                )
            }

        </>
    )
}

export default Alram;

const STDiv = styled.div`
    position: absolute;
    background-color: white;
    width:180px;
    height: 250px;
    right:20px;
    margin-right: 30px;
    border-radius: 15px;
    z-index: 99999!important;
    width: 200px;
    height: 200px;
    top:48px;
    overflow-y: scroll;
&::-webkit-scrollbar {
    display: flex;
    width: 8px;  /* 스크롤바의 너비 */
}
&::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #3556e1; /* 스크롤바의 색상 */ 
    border-radius: 10px;
}
`

const STBox = styled.div`
    background-color: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(106, 106, 106, 0.1);
    border-radius: 10px;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 20%);
    height: 110px;
    margin:10px 0px;
    z-index: 99999!important;
    p{
        padding-top: 10px;
        text-align: center;
    }
`

const STBox2 = styled.div`
    background-color: rgba(26, 22, 22, 0.2);
    border: 1px solid rgba(106, 106, 106, 0.1);
    border-radius: 10px;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 20%);
    height: 110px;
    margin:10px 0px;
    color:gray;
    z-index: 99999!important;
    p{
        padding-top: 10px;
        text-align: center;
    }
`

const STDelete = styled.div`
    float: right;
    padding-right: 10px;
    cursor: pointer;
`
const STCreatAT = styled.div`
    color:black;
    font-size: 13px;
    float:right;
    margin-right: 10px;
`
const STComment = styled.div`
    margin-top: 10px;
    border-radius: 10px;
    text-align: center;
    width :70%;
    margin:auto;
    border: 1px solid rgba(106, 106, 106, 0.3);
`
const STContent = styled.div`
    text-align: center;
    margin:60px 0px;
    margin-left: 15px;
    font-size:15px;
    background-color: rgba(220, 224, 241, 0.9);
    border-radius: 15px;
    height: 70px;
    padding-top: 25px;
    width: 88%;

`