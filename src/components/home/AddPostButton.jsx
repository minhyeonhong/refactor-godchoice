import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AddPostButton= ()=> {

    const navigate = useNavigate();

    return(
        <>
           <STTopButton onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth"}) }}>↑</STTopButton>
           <STAddButton onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth"}) 
                                        navigate("/post") 
                                        }}>작성하기</STAddButton>
        </>
    )
}

export default AddPostButton;

const STTopButton = styled.button`
  position : fixed;
  bottom : 50%;
  right : 2rem;
  background-color: black;
  border: transparent;
  width: 50px;
  height: 50px;
  color:white;
  border-radius: 50px;
`
const STAddButton = styled.button`
    position : fixed;
  bottom : 45%;
  right : 2rem;
  background-color: #3556E1;
  color : white;
  border: transparent;
  width: 50px;
  height: 50px;
  border-radius: 50px;
`