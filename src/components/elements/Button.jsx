import styled, { css } from "styled-components";
// import icons from "../../assets";
import { colors } from "../../styles/color";

const Button = ({
  imgUrl,
  on,
  font,
  outline,
  border,
  margin,
  height,
  width,
  btnType,
  type,
  onClick,
  children,
  disabled,
  svgType,
  name,
  active,
  color,
  flag,
}) => {
  // const { Back, Question, Cancel, Setting, CommunityNewGroup, CommunityNewProof } = icons;
  return (
    <StButton
      font={font}
      outline={outline}
      border={border}
      margin={margin}
      height={height}
      width={width}
      type={type}
      onClick={onClick}
      btnType={btnType}
      disabled={disabled}
      on={on}
      imgUrl={imgUrl}
      svgType={svgType}
      name={name}
      active={active}
      color={color}
      flag={flag}
    >
      {children}
      {/* {svgType === "back" && <Back width="12px" height="21px" />}
      {svgType === "question" && <Question width="28px" height="29px" />}
      {svgType === "cancel" && <Cancel width="21px" height="21px" />}
      {svgType === "setting" && <Setting width="28px" height="29px" />}
      {svgType === "newGroup" && <CommunityNewGroup />}
      {svgType === "newProof" && <CommunityNewProof />} */}
    </StButton>
  );
};

export default Button;

const StButton = styled.button`
  cursor: pointer;
  color: black;
  ${(props) => {
    return (
      props.btnType === "onOff" &&
      css`
        background-color: transparent;
        border: transparent;
        color: ${(props) => (props.on === "on" ? colors.black22 : colors.grayCB)};
        justify-content: center;
        align-items: center;
        height: 78px;
        width: 100%;
        border-bottom: ${(props) => (props.on === "on" ? "6px solid #8ecf70" : `6px solid ${colors.grayF5}`)};
        font-size: 20px;
        font-weight: 600;
        box-sizing: border-box;
        :hover {
          border: ${({ border }) => `${border}`};
        }
      `
    );
  }}
  ${(props) => {
    return (
      props.btnType === "submit" &&
      css`
        width: 100%;
        border: none;
        line-height: 56px;
        font-weight: 600;
        font-size: 20px;
        color: ${(props) => (props.on === "on" ? "white" : "#BEBEBE")};
        background-color: ${(props) => (props.on === "on" ? colors.green00 : "#EDEDED")};
        cursor: ${(props) => (props.on === "on" ? "pointer" : "default")};
      `
    );
  }}
  ${(props) => {
    return (
      props.btnType === "svg" &&
      css`
        height: 100%;
        background-color: transparent;
        border: none;
        display: flex;
      `
    );
  }}
  ${(props) => {
    return (
      props.btnType === "modal" &&
      css`
        border: none;
        border-top: 2px solid rgba(217, 217, 217, 0.3);
        width: 100%;
        padding: 17px 0;
        font-weight: 600;
        font-size: 20px;
        line-height: 27px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        color: ${(props) => (props.on === "on" ? "#B9B9B9" : colors.black21)};
      `
    );
  }}
  ${(props) => {
    return (
      props.btnType === "communityWrite" &&
      css`
        position: absolute;
        bottom: 80px;
        right: 17px;
        z-index: 5;

        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: transparent;
      `
    );
  }}
  ${(props) => {
    return (
      props.btnType === "login" &&
      css`
        width: 100%;
        height: 60px;
        padding: 15px 0;
        box-sizing: border-box;

        background: #ffffff;
        border: 1px solid #b5b5b5;

        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        span {
          display: block;
          font-size: 16px;
          height: 16px;
          line-height: 0.9;
        }
        div {
          position: absolute;
          top: 50%;
          left: 15px;
          transform: translate(0, -50%);
          width: 28px;
          height: 28px;
          img {
            width: 100%;
          }
        }
      `
    );
  }}
  ${(props) => {
    return (
      props.btnType === "missionGroupMenu" &&
      css`
        width: 100%;
        height: 78px;
        box-sizing: border-box;Participation
        font-weight: 600;
        font-size: 20px;
        box-sizing: border-box;
        border: none;
        background-color: transparent;
        border-bottom: ${({ active, name }) => (active === name ? "6px solid #8ECF70" : "6px solid #f2f2f2")};
        color: ${({ active, name }) => (active === name ? "#222" : "#cbcbcb")};
      `
    );
  }}
  ${(props) => {
    return (
      props.btnType === "communityJoin" &&
      css`
        width: 100%;
        border: none;
        font: 18px/27px "Noto Sans KR", "sana-serif";
        text-align: center;
        padding: 11px 0;
        background-color: ${(props) => props.color};
        color: #fff;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
      `
    );
  }}
  ${(props) => {
    return (
      props.btnType === "todayMission" &&
      css`
        border: none;
        border-radius: 50px;
        display: inline-block;
        width: 100%;
        color: #2c2c2c;
        padding: 18px 0;
        box-sizing: border-box;
        color: ${(props) => (props.flag ? `${colors.grayCF}` : `${colors.white}`)};
        background-color: ${(props) => (props.flag ? `${colors.grayF9}` : `${colors.green77}`)};
      `
    );
  }}
`;
