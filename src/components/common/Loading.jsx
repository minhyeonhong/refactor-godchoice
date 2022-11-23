import React from 'react';
import styled from 'styled-components';

import spinerImg from '../../assets/images/common/spiner.gif'

const Loading = (props) => {
  return (
    <Background height={props.height} position={props.position} >
      <img src={spinerImg} alt="로딩중" width={props.spinerWidth.toString()} />
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
    </Background>
  );
};

export default Loading;

const Background = styled.div`
  position: ${(props) => props.position}; //absolute
  width: 100vw;
  height: ${(props) => props.height};
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
`;

const LoadingText = styled.div`
  font-weight : bold;
  margin-top : 10px;
  text-align: center;
`;