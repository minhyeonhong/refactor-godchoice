// import styled from "styled-components";
// // import Button from "components/elements/Button";
// import { colors, fontSize } from "styles/theme";
// // import icons from "assets";
// import React from "react";

// const RegisterAlert = ({ message, handleOpenModal }) => {
//   // const { IconOops } = icons;

//   return (
//     <StRegisterAlert>
//       <StMessage>
//         <IconOops width="40px" height="40px" fill={`${colors.mainP}`} />
//         <StSelectMessage>
//           {message.split("\n").map((val) => (
//             <React.Fragment key={val}>
//               {val} <br />
//             </React.Fragment>
//           ))}
//         </StSelectMessage>
//       </StMessage>
//       <Button onClickHandler={handleOpenModal}>닫기</Button>
//     </StRegisterAlert>
//   );
// };

// const StRegisterAlert = styled.div`
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
//   gap: 24px;
//   padding: 10px 35px 0 35px;
// `;

// const StSelectMessage = styled.span`
//   text-align: center;
//   font-size: ${fontSize.large20};
// `;

// export default RegisterAlert;