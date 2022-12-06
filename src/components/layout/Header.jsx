import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Bell, MyPage } from '../../assets';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/common/home_logo_fill.png"

import { RiLoginBoxLine } from 'react-icons/ri';
import { EventSourcePolyfill } from 'event-source-polyfill';

import { notificationApis } from '../../api/api-functions/notificationApis';
import Alram from '../home/Alram';
import AlramAlert from '../home/AlramAlert';
import { useQuery } from '@tanstack/react-query';
const Header = () => {

    const navigate = useNavigate();

    //sse연결 여부
    const [listening, setListening] = useState(false);
    //로그인 여부
    const isLogin = localStorage.getItem('token') !== null;

    //알림 server state
    const [noticeList, setNoticeList] = useState([]);
    const [alramNum, setAlarmNum] = useState(0);
    //알림 리스트
    const { refetch } = useQuery(['getNoticeList'], //key
        () => notificationApis.getNotificationAX(),
        {//options
            refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
            retry: 0, // 실패시 재호출 몇번 할지
            onSuccess: res => { // 성공시 호출  
                if (res.data.status === 200 && res.data.data !== null) {
                    const resList = res.data.data;
                    setNoticeList(resList);
                    const unReadNum = resList.filter((notice) => { return !notice.readStatus }).length;
                    setAlarmNum(unReadNum);
                }
            }
        })

    //sse handle
    const [newNotice, setNewNotice] = useState({})

    let eventSource = undefined;
    useEffect(() => {
        if (!listening && isLogin) {
            eventSource = new EventSourcePolyfill(`${process.env.REACT_APP_API_URL}/subscribe`, {
                headers: {
                    "Access_Token": localStorage.getItem("token"),
                    'Content-Type': 'text/event-stream',
                },
                heartbeatTimeout: 3600000,
                withCredentials: true,
            });
            //sse 연결
            eventSource.onopen = (event) => {
                if (event.status === 200) {
                    console.log('connection opened', event)
                    setListening(true);
                }
            };

            //sse 받는 처리
            eventSource.onmessage = (event) => {
                console.log('onmessage', event)

                const isJson = (str) => {
                    try {
                        const json = JSON.parse(str);
                        return json && typeof json === 'object';
                    } catch (e) {
                        return false;
                    }
                };
                if (isJson(event.data)) {
                    //알림 리스트 refetch
                    refetch();
                    //실시간 알림 데이터
                    const obj = JSON.parse(event.data);
                    console.log("JSON.parse obj", obj);
                    setNewNotice(obj);
                }
            };

            //sse 에러
            eventSource.onerror = event => {
                console.log("sse onerror", event);
                if (eventSource !== undefined) {
                    eventSource.close();
                    setListening(false);
                }
            };
        }

        return () => {
            if (!isLogin && eventSource !== undefined) {
                eventSource.close();
                setListening(false);
            }
        };
    }, [isLogin]);



    const [notice, setNotice] = useState(false);
    const popUpNotice = () => {
        setNotice(!notice)
    }

    useEffect(() => { console.log("newNotice", newNotice) }, [newNotice])
    return (
        <>

            <StHeaderWrap>

                <StLogoBox> <Link to="/"> <img src={logo} style={{ width: '166px' }} /></Link></StLogoBox>
                <StRightBox>
                    {localStorage.getItem("token") === null ?
                        <RiLoginBoxLine style={{ width: '32px', height: "48px", marginRight: "15px", padding: "2px", color: '#00208F', cursor: "pointer" }}
                            onClick={() => { navigate("/login") }} />
                        :
                        <>
                            <StBell>
                                {alramNum > 0 && <div className='bellNum'>{alramNum}</div>}
                                <Bell style={{ height: "48px", marginRight: "15px", padding: "2px", cursor: "pointer" }} onClick={popUpNotice} />
                            </StBell>
                            <MyPage style={{ height: "48px", marginRight: "5px", padding: "2px", cursor: "pointer" }}
                                onClick={() => { navigate("/mypage") }} />
                        </>
                    }
                </StRightBox>
            </StHeaderWrap>
            {/* 알림 리스트 모달 */}
            {notice && <Alram />}
            <AlramAlert newNotice={newNotice} />
        </>
    );
};

export default Header;

const StHeaderWrap = styled.div`
    position:sticky;
    position: relative;
    top : 0;  
    z-index : 1;
    width : 100%;
    height : 48px;

    display : flex;
    flex-direction : row;
    justify-content : space-between;
    background-color : white;
    button {
        background-color : transparent;
        border : none;
        vertical-align : middle;
        height : 48px;
    }
`

const StLogoBox = styled.p`
    position: absolute;
    top : 0;
    left: 0;
    img {
        width: 100%;
        height: 48px;
        padding : 6px;
    }
`

const StRightBox = styled.div`
    position : absolute;
    right : 0;
    top : 0;
    display: flex;
`

const StBell = styled.div`
    position : relative;
    .bellNum {
        position : absolute;
        top : 5px;
        left: 15px;
        color : white;
        font-size : 1px;
        padding:1px 6px;
        border-radius: 50%;
        background-color:#00208F;
    }
`
