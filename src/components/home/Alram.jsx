import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { __deleteAlram, __putAlram } from '../../redux/modules/postSlice3';
function Alram({ popUpNotice }) {

    const [noticeList, setNoticeList] = useState([]);
    const [isError, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)

    // get 해오기
    useEffect(() => {
        const fetchData = async () => {
            setError(false);
            setLoading(true);

            try {
                const res = await axios('http://54.180.201.200/getnotice', {
                    headers: {
                        "Access_Token": localStorage.getItem("token"),
                    }
                })
                console.log("alldata", res.data.data)
                setNoticeList(res.data.data);
            } catch (error) {
                setError(true);
            } setLoading(false);
        }
        fetchData()
    }, [])



    const dispatch = useDispatch();

    const onDeleteAlram = (id) => {
        dispatch(__deleteAlram(id))
    }

    const [unread, setUnread] = useState();

    // unreadnotice get 해오기
    useEffect(() => {
        const fetchData = async () => {
            setError(false);
            setLoading(true);

            try {
                const res = await axios('http://54.180.201.200/unreadnotice', {
                    headers: {
                        "Access_Token": localStorage.getItem("token"),
                    }
                })
                console.log("allread", res.data)
                setUnread(res.data);

            } catch (error) {
                setError(true);
            } setLoading(false);
        }
        fetchData()
    }, [])

    const onClickPut = (id) => {
        dispatch(__putAlram(id))
    }

    return (
        <>
            {noticeList.length === 0 ?
                (<STDiv>
                    <div style={{ marginTop: "100px" }}>알림 내용이 없습니다 💦 </div>
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
