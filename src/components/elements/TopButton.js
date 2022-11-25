import { throttle } from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import writing from "../../assets/images/common/writing.png";
import topBtn from "../../assets/images/common/topBtn.png";
import writingToggle from "./WritingToggle";

const TopButton = ({ modalOn, setModalOn }) => {
  const [isTopButtonOn, setIsTopButtonOn] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(
    throttle(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, 200),
    [isTopButtonOn]
  );
  const handleScroll = throttle((e) => {
    const { scrollTop } = e.target.documentElement;
    if (scrollTop > 300) {
      setIsTopButtonOn(true);
    }
    if (scrollTop <= 300) {
      setIsTopButtonOn(false);
    }
  }, 200);
  return isTopButtonOn ? (
    <StyledTopBtn height={"90px"}>
      <StyledTopBtnImg
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        src={topBtn}
        width={"40px"}
      />
      <StyledTopBtnImg
        src={writing}
        padding={"6px 6px 10px 6px"}
        onClick={() => {
          setModalOn(!modalOn);
        }}
      />
    </StyledTopBtn>
  ) : (
    <StyledTopBtn height={"50px"}>
      <StyledTopBtnImg
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        src={topBtn}
        width={"0px"}
        height={"40px"}
      />
      <StyledTopBtnImg
        src={writing}
        padding={"6px 6px 10px 6px"}
        onClick={() => {
          setModalOn(!modalOn);
        }}
      />
    </StyledTopBtn>
  );
};
export default TopButton;

const StyledTopBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 50px;
  height: ${(props) => props.height};
  /* padding: 2px 0 2px 0; */

  z-index: 10;

  border: none;
  border-radius: 50px;

  background-color: grey;
  opacity: 0.7;
  box-shadow: 0px 0px 5px gray;

  position: fixed;
  bottom: 4em;
  right: 4em;

  transition: all 0.2s;

  cursor: pointer;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  @media screen and (max-width: 768px) {
    bottom: 3em;
    right: 3em;
  }
`;
const StyledTopBtnImg = styled.img`
  padding: ${(props) => (props.padding ? props.padding : "0")};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  transform: ${(props) => props.rotate} ${(props) => props.scale};
  transition: all 0.2s;
  top: 0;
  left: 50%;
  :hover {
    transform: ${(props) => props.rotate} ${(props) => (props.hvScale ? props.hvScale : "scale(1)")};
  }
`;
