import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import X from "../../assets/images/common/X.png";


const WritingToggle = ({ modalOn, setModalOn }) => {
    const navigate = useNavigate();

    const writePost = (url) => {
        if (localStorage.getItem('token') === null || localStorage.getItem('token') === 'null' ||
            localStorage.getItem('token') === undefined || localStorage.getItem('token') === '') {
            alert('로그인 해주세요.');
            window.location.replace('/login');
        } else {
            navigate(url)
        }
    }

    return (
        <WritingToggleWrap>
            <img src={X} onClick={() => { setModalOn(!modalOn) }} />

            <Cate onClick={() => writePost("/festivalpost")} style={{ marginTop: "17px" }}>행사글</Cate>
            <Cate onClick={() => writePost("/gatherpost")}>모집글</Cate>
            <Cate onClick={() => writePost("/questionpost")}>질문글</Cate>
        </WritingToggleWrap>
    )
};

export default WritingToggle;

const WritingToggleWrap = styled.div`
z-index : 999;
background-color: gray;
opacity : 0.8;
color : #fff;
border-radius : 20px;
padding : 10px;
width: 100px;
height: 160px;
position: fixed;
bottom: 45px;
right:120px;
text-align : center;
@media screen and (min-width: 425px) and (max-width : 100vw) {
    width: 100px;
    left: calc(50% + 50px);
    transform: translateX(-50%);
  }
img {
    width: 20px;
    height: 20px;
    position:absolute;
    right: 10px;
}`

const Cate = styled.div`
    cursor : pointer;
    padding: 8px;
`

