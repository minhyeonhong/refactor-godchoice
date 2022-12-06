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

    return (
        <ModalWrap onClick={popUpNotice}>
            {noticeList.length === 0 ?
                (<STNoAlram>알림 내용이 없습니다 💦 </STNoAlram>) :
                (
                    <div style={{ marginTop: "20px" }}>
                        {noticeList?.map((comment, index) => {
                            return (
                                <STBox key={index} onClick={() => onClickPut(comment.notificationId)}>
                                    <STDelete onClick={(e) => {
                                        e.stopPropagation()
                                        onDeleteAlram(comment.notificationId)
                                    }}>✖</STDelete>
                                    <p> <b>{comment.title}</b>님이
                                        <br />댓글을 입력하셨습니다.
                                    </p>
                                    <STComment>💬 {comment.message}</STComment>
                                    <STCreatAT>{comment.createdAt}</STCreatAT>
                                </STBox>
                            )
                        })}
                    </div>
                )
            }

        </ModalWrap>
    )
}

export default Alram;

const STBox = styled.div`
    background-color: rgba(106, 106, 106, 0.6);
    border: 1px solid rgba(106, 106, 106, 0.1);
    border-radius: 10px;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
    height: 100px;
    width: 260px;
    font-size: 15px;
    color: black;
    margin:10px 0px;
    float:right;
    z-index: 999;
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
    color:gray;
    font-size: 13px;
    float:right;
    margin-right: 10px;
`
const STComment = styled.div`
    margin-top: 10px;
    background-color: white;
    border-radius: 10px;
    text-align: center;
    width :70%;
    margin:auto;
`

const ModalWrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(245, 240, 240, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 0 15px;
  box-sizing: border-box;
`
const STNoAlram = styled.div`
    background-color: white;
    width: 220px;
    height:100px;
    border-radius: 15px;
    text-align: center;
    padding-top: 30px;
    font-size: 20px;
`
//https://www.npmjs.com/package/event-source-polyfill
// https://velog.io/@green9930/%EC%8B%A4%EC%A0%84-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-React%EC%99%80-SSE
// https://surviveasdev.tistory.com/entry/%EC%9B%B9%EC%86%8C%EC%BC%93-%EA%B3%BC-SSEServer-Sent-Event-%EC%B0%A8%EC%9D%B4%EC%A0%90-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B3%A0-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0
// https://velog.io/@stella6767/SSE-Protocol-%ED%99%9C%EC%9A%A9%ED%95%B4%EC%84%9C-Spring-React-%EB%8B%A8%EB%B0%A9%ED%96%A5-%ED%86%B5%EC%8B%A0%ED%95%98%EC%9E%90