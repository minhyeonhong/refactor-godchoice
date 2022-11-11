// import { useState, useEffect } from "react";
// import styled from "styled-components";
// import Button from "components/elements/Button";
// import { removeCookie, setWeekCookie } from "api/cookies";
// import { patchAcceptEmail } from "api/mypageApi";
// import { colors, fontSize } from "styles/theme";
// import { a11yHidden } from "styles/mixin";
// import icons from "assets";

// const EmailAlert = ({ handleOpenModal, social, email }) => {
//   const [isChecked, setIsChecked] = useState(false);
//   const { MainArrow } = icons;

//   /* 동의할 경우 이메일 수신 동의 PATCH --------------------------------------------------- */
//   const handleAccept = () => {
//     patchAcceptEmail({ isAccepted: true });
//     handleOpenModal();
//   };

//   /* 체크박스 체크 여부에 따라 쿠기 생성 or 제거 ----------------------------------------------- */
//   useEffect(() => {
//     isChecked
//       ? setWeekCookie(`emailAlertCookie_${social}`, email)
//       : removeCookie(`emailAlertCookie_${social}`);
//   }, [isChecked]);

//   return (
//     <StLogoutAlert>
//       <StMessage>
//         <StTitle>알림 수신 동의</StTitle>
//         <StContent>
//           실시간 알림을 이메일로
//           <br />
//           받아보시겠습니까?
//         </StContent>
//         <StCheck>
//           <CheckBoxContainer>
//             <StyledCheckBox
//               onClick={() => setIsChecked(!isChecked)}
//               checked={isChecked}
//             >
//               <MainArrow fill={`${colors.black}`} width="16px" height="16px" />
//             </StyledCheckBox>
//           </CheckBoxContainer>
//           <StCheckMessage>7일간 보지 않기</StCheckMessage>
//         </StCheck>
//       </StMessage>
//       <StButton>
//         <Button onClickHandler={handleAccept}>동의</Button>
//         <Button theme="grey" onClickHandler={handleOpenModal}>
//           닫기
//         </Button>
//       </StButton>
//     </StLogoutAlert>
//   );
// };

// const StLogoutAlert = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100%;
// `;

// const StMessage = styled.div`
//   flex-grow: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-start;
//   padding-top: 20px;
// `;

// const StTitle = styled.span`
//   text-align: center;
//   color: ${colors.grey2};
//   line-height: ${fontSize.large20};
//   font-size: ${fontSize.large20};
//   font-weight: 700;
// `;

// const StContent = styled.span`
//   margin: 22px 0 10px 0;
//   text-align: center;
//   color: ${colors.grey1};
//   font-size: ${fontSize.large20};
// `;

// const StCheck = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 16px;
// `;

// const CheckBoxContainer = styled.div`
//   width: ${fontSize.regular16};
//   height: ${fontSize.regular16};
//   margin-right: ${fontSize.small10};
//   .a11y-hidden {
//     ${a11yHidden}
//   }
// `;

// const StyledCheckBox = styled.div`
//   display: inline-block;
//   background: #ffffff;
//   box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.21);
//   border-radius: 1px;
//   width: ${fontSize.regular16};
//   height: ${fontSize.regular16};
//   transition: all 150ms;
//   svg {
//     visibility: ${({ checked }) => (checked ? "visible" : "hidden")};
//   }
// `;

// const StCheckMessage = styled.span`
//   color: ${colors.grey3};
//   line-height: ${fontSize.regular16};
//   font-size: ${fontSize.regular16};
// `;

// const StButton = styled.div`
//   display: flex;
// `;

// export default EmailAlert;