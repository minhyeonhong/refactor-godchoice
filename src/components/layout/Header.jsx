import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { BsFillPersonFill, BsBell } from 'react-icons/bs'
import { Bell, MyPage } from '../../assets';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/common/home_logo_fill.png"

import { RiLoginBoxLine } from 'react-icons/ri';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

// import { useQuery } from 'react-query';
import { notificationApis } from '../../api/api-functions/notificationApis';
import Alram from '../home/Alram';
// import axios from 'axios';
const Header = () => {

    const navigate = useNavigate();

    const EventSource = NativeEventSource || EventSourcePolyfill;

    const [listening, setListening] = useState(false);
    const [data, setData] = useState([]);
    const [value, setValue] = useState(null);
    const [meventSource, msetEventSource] = useState(undefined);

    let eventSource = undefined;

    useEffect(() => {
        console.log("listening", listening);

        if (!listening) {
            eventSource = new EventSourcePolyfill("http://54.180.201.200/subscribe", {
                headers: {
                    "Access_Token": localStorage.getItem("token"),
                    'Content-Type': 'text/event-stream',
                }, heartbeatTimeout: 600000, withCredentials: true,
            });

            msetEventSource(eventSource);

            console.log("eventSource", eventSource);

            eventSource.onopen = (e) => {
                console.log("connection opened");
                console.log('e', e)
            };

            eventSource.onmessage = (event) => {
                console.log("result", event);
                console.log("result", JSON.parse(event.data));
                setData(old => [...old, event.data]);
                setValue(event.data);
            };

            eventSource.onerror = event => {
                console.log(event.target.readyState);
                if (event.target.readyState === EventSource.CLOSED) {
                    console.log("eventsource closed (" + event.target.readyState + ")");
                }
                eventSource.close();
            };

            setListening(true);
        }

        return () => {
            eventSource.close();
            console.log("eventsource closed");
        };
    }, []);

    const [notice, setNotice] = useState(false);
    const popUpNotice = () => {
        setNotice(!notice)
    }

    return (
        <StHeaderWrap>
            <StLogoBox> <Link to="/"> <img src={logo} style={{ width: '166px' }} /></Link></StLogoBox>
            <StRightBox>

                <Bell style={{ height: "48px", marginRight: "15px", padding: "2px" }} onClick={popUpNotice} />
                {
                    notice ? (

                        <Alram popUpNotice={popUpNotice} />

                    ) : (
                        ""
                    )
                }


                {/* <Link to="/alram"><Bell style={{ height: "48px", marginRight: "15px", padding: "2px" }} /></Link> */}
                {localStorage.getItem("token") === null ?
                    <RiLoginBoxLine style={{ width: '32px', height: "48px", marginRight: "15px", padding: "2px", color: '#00208F' }}
                        onClick={() => { navigate("/login") }} />
                    :
                    <MyPage style={{ height: "48px", marginRight: "5px", padding: "2px" }}
                        onClick={() => { navigate("/mypage") }} />
                }

            </StRightBox>
        </StHeaderWrap>
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
`
