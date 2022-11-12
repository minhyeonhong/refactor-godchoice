import React from 'react';
import styled from 'styled-components';
import { BsFillPersonFill, BsBell } from 'react-icons/bs'

const Header = () => {
    return (
        <StHeaderWrap>
            <StBackBox><button className='arrow-left' onClick={() => { window.history.back() }} /></StBackBox>
            <StLogoBox><button>거기어때</button></StLogoBox>
            <StLoginBox>
                <button><BsBell style={{ width: "20px", height: "20px" }} /></button>
                {
                    localStorage.getItem("token") === null ?
                        <button>로그인</button>
                        :
                        <button><BsFillPersonFill style={{ width: "20px", height: "20px" }} /></button>
                }

            </StLoginBox>
        </StHeaderWrap>
    );
};

export default Header;

const StHeaderWrap = styled.div`
    position:sticky;
    top : 0;  
    z-index : 1;

    display : flex;
    flex-direction : row;
    justify-content : space-between;
    background-color : white;
    button {
        background-color : transparent;
        border : none;
        vertical-align : middle;
    }
`
const StBackBox = styled.div`
    .arrow-left {
        width: 1rem;
        height: 1rem;
        border: 2px solid #333;
        border-left: 0;
        border-top: 0;
        
        margin-left : 10px;
        transform: rotate(135deg);
    }
`
const StLogoBox = styled.div`
    position: fixed;
    top : 0;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 400;
`

const StLoginBox = styled.div`
    
`
