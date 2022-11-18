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
  tab,
}) => {
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
      tab={tab}
    >
      {children}
    </StButton>
  );
};

export default Button;

const StButton = styled.button`
  cursor: pointer;
  color: black;
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
      props.btnType === "tabMenu" &&
      css`
        width: 100%;
        height: 78px;
        box-sizing: border-box;Participation
        font-weight: 600;
        font-size: 20px;
        box-sizing: border-box;
        border: none;
        background-color: transparent;
        border-bottom: ${({ active, name }) => (active === name ? "6px solid powderblue" : "6px solid #f2f2f2")};
        color: ${({ active, name }) => (active === name ? "#222" : "grey")};
      `
    );
  }}
  
`;
