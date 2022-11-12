import React from 'react';
import styled from 'styled-components';

import spinerImg from '../../assets/images/common/spiner.gif'

const Loading = (props) => {
    return (
        <Background height={props.height}>
            <img src={spinerImg} alt="로딩중" width="5%" />
            <LoadingText>잠시만 기다려 주세요.</LoadingText>
        </Background>
    );
};

export default Loading;

const Background = styled.div`
  position: absolute;
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
`;

const LoadingText = styled.div`
  font: 1rem 'Noto Sans KR';
  text-align: center;
`;