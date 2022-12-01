import React from 'react';
import styled from 'styled-components';
// import { BsFillPersonFill, BsBell } from 'react-icons/bs'
import { Back, Bell, MyPage } from '../../assets';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/common/home_logo_fill.png"

import { RiLoginBoxLine } from 'react-icons/ri';

const Header = () => {

    const navigate = useNavigate();

    return (
        <StHeaderWrap>
            {/* <StBackBox><button className='arrow-left' onClick={() => { window.history.back() }} /></StBackBox> */}
            {/* <Back } style={{height: "48px"}} /> */}
            <StLogoBox> <Link to="/"> <img src={logo} style={{ width: '166px' }} /></Link></StLogoBox>
            <StRightBox>

                <Link to="/"><Bell style={{ height: "48px", marginRight: "15px", padding: "2px" }} /></Link>
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
