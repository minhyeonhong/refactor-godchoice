import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MyPage } from '../../assets';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/common/home_logo_fill.png"

import { RiLoginBoxLine } from 'react-icons/ri';

const Header = () => {

    const navigate = useNavigate();

    return (
        <>

            <StHeaderWrap>

                <StLogoBox> <Link to="/"> <img src={logo} style={{ width: '166px' }} alt="logo" /></Link></StLogoBox>
                <StRightBox>
                    {localStorage.getItem("uid") === null ?
                        <RiLoginBoxLine style={{ width: '32px', height: "48px", marginRight: "15px", padding: "2px", color: '#00208F', cursor: "pointer" }}
                            onClick={() => { navigate("/login") }} />
                        :
                        <>
                            <StBell>
                                {/* {alramNum > 0 && <div className='bellNum'>{alramNum}</div>} */}
                                {/* {result.data.unReadNum > 0 && <div className='bellNum'>{result.data.unReadNum}</div>} */}
                                {/* <Bell style={{ height: "48px", marginRight: "15px", padding: "2px", cursor: "pointer" }} onClick={popUpNotice} /> */}
                            </StBell>
                            <MyPage style={{ height: "48px", marginRight: "5px", padding: "2px", cursor: "pointer" }}
                                onClick={() => { navigate("/mypage") }} />
                        </>
                    }
                </StRightBox>
            </StHeaderWrap>
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
