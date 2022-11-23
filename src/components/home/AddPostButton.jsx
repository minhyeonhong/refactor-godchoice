import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Writing from '../../assets/icon/Writing.svg'
const AddPostButton= ()=> {

    const navigate = useNavigate();

    return(
        <>
           <STTopButton onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth"}) }}>↑</STTopButton>
           <STAddButton onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth"}) 
                                        navigate("/post") 
                                        }}><img src={Writing}/></STAddButton>
        </>
    )
}

export default AddPostButton;

const STTopButton = styled.button`
  position : fixed;
  bottom : 14%;
  right : 2rem;
  background-color: #E1E3EC;
  border: transparent;
  width: 50px;
  height: 50px;
  color:black;
  font-size: 25px;
  border-radius: 50px;
`
const STAddButton = styled.button`
  position : fixed;
  bottom : 5%;
  right : 2rem;
  background-color: #3556E1;
  color : white;
  border: transparent;
  width: 50px;
  height: 50px;
  border-radius: 50px;
`