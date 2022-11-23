import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Redux import
import { __putMyInfo, __getMyInfo } from "../../redux/modules/myPageSlice";
import { useDispatch, useSelector } from "react-redux";

import { Camera, Delete } from "../../assets";
import Layout from "../../components/layout/Layout";
import kakao from "../../assets/logo_kakao.png";
import naver from "../../assets/logo_naver.png";
import google from "../../assets/logo_google.png";


const MyPageEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = {
    nickName: "",
    address: "",
  };

  console.log("이건 data야!", data);

  const profileData = useSelector((state) => state.myPage.userInfo);
  console.log("프로필 데이터가 뭔데", profileData);
  const img_ref = useRef(null);

  const [inputForm, setInputForm] = useState(data);
  const [imgFile, setImgFile] = useState([]);
  const [imagePreview, setImagePreview] = useState(profileData.userImg);


  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const nickName = profileData.nickName;
  const address = profileData.addressTag;

  console.log("address나와랏", address);
  console.log("userId ===> ", userId);
  console.log("email ===> ", email);
  console.log("profileData.userImg ===> ", profileData.userImg)
  console.log("닉네임 ===> ", profileData.nickName)


  const onLoadFile = (e) => {
    const reader = new FileReader();
    setImgFile(...imgFile, URL.createObjectURL(e.target.files[0]));

    const prevImg = e.target.files[0];
    reader.readAsDataURL(prevImg);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const onSubmitHandler = async () => {
    let formData = new FormData();
    let uploadImg = img_ref.current;

    const obj = { userName: inputForm.nickName, userAddress: inputForm.address }
    console.log("넘어오니 ===> ", obj)

    formData.append(
      "user",
      new Blob([JSON.stringify(obj)], { type: "application/json" })
    );
    if (imgFile.length === 0) {
      return formData.append("multipartFile", null);
    } else {
      formData.append("multipartFile", uploadImg.files[0]);
    }

    const data = dispatch(
      __putMyInfo(formData)
    ).unwrap();
    // if (data) {
    //   window.alert("프로필이 변경되었습니다!")
    //   // navigate(-1, {replace: true})
    // }
  };

  useEffect(() => {
    dispatch(__getMyInfo(userId));
  }, [imagePreview]);

  return (
    <>
      <Layout>
        <div>
          <h3>프로필 수정</h3>
        </div>
        <MyProfile>
          <MyImgWrap>
            <MyImgBox>
              {/* {imagePreview === null ? (
                  profileData?.userImgUrl === null ? (
                    <BasicProfile />
                  ) : (
                    <img src={profileData?.profileImgUrl} alt="" />
                  )
                ) : (
                  <img src={imagePreview} alt="" />
                )} */}
              <img src={imagePreview} alt="" />
              <label htmlFor="img_UpFile">
                <Camera />
              </label>
              <input
                ref={img_ref}
                type="file"
                accept="image/*"
                id="img_UpFile"
                onChange={onLoadFile}
                style={{ display: "none" }}
              />
            </MyImgBox>
          </MyImgWrap>

          <LoginInfo>
            <LoginInfoTitle>로그인 정보</LoginInfoTitle>
            <LoginInfoContent>
              {profileData.domain === 'google' ? <img src={google} alt="logoImg" /> : null}
              {profileData.domain === 'kakao' ? <img src={kakao} alt="logoImg" /> : null}
              {profileData.domain === 'naver' ? <img src={naver} alt="logoImg" /> : null}
              {profileData.email}
            </LoginInfoContent>
          </LoginInfo>

          <MyTextWrap>
            <div className="MyTextNick">닉네임</div>
            <div className="MyTextInputWrap">
              <input
                type="text"
                value={inputForm.nickName}
                name="nickName"
                onChange={onChangeHandler}
                placeholder={
                  nickName === null
                    ? "닉네임을 입력해주세요."
                    : nickName
                }
                minLength="1"
                maxLength="6"
              />
              <Delete />
            </div>
            {/* <span className="MyTextCheck"></span> */}
          </MyTextWrap>
          <MyTextWrap>
            <div className="MyTextAdd">관심 지역</div>
            <div className="MyTextInputWrap">
              <input
                type="text"
                value={inputForm.address}
                name="address"
                onChange={onChangeHandler}
                placeholder={
                  address === null
                    ? "관심 지역을 입력해주세요."
                    : address
                }
              />
              <Delete />
            </div>
            {/* <span className="MyTextCheck"></span> */}
          </MyTextWrap>
        </MyProfile>
        <MyDoneBtnWrap>
          <MyDoneBtn onClick={onSubmitHandler}>
            완료
          </MyDoneBtn>
        </MyDoneBtnWrap>
      </Layout>
    </>
  );
};

export default MyPageEdit;


const MyProfile = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0px 10px 10px 10px;
  margin: 00px 20px 0px 20px;
`;

const MyImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  margin-top: 32px;
`;

const MyImgBox = styled.div`
  display: flex;
  width: 120px;
  height: 100%;

  img {
    display: flex;
    width: 120px;
    height: 120px;
    border-radius: 120px;
  }
  label {
    display: flex;
    position: absolute;
    top: 186px;
    left: 219px;
    width: 36px;
    height: 36px;
    border-radius: 36px;
    align-items: center;
    justify-content: center;
    background-color: #eee;
  }
`;
const LoginInfo = styled.div`
  width: 100%;
  border-bottom: 1px solid black;

`;
const LoginInfoTitle = styled.h2`
  font: 500 18px/1 "Noto sans", "sans-serif";
`;
const LoginInfoContent = styled.div`
  font: 16px/1 "Noto sans", "sans-serif";
  color: #7b7b7b;
  padding: 20px 0 28px;
  box-sizing: border-box;
  display:flex;
  align-items:center;
  img{
    width:20px;
    margin-right:10px;
  }
`;

const MyTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;

  .MyTextNick {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 400;
  }
  .MyTextInputWrap {
    display: flex;
    margin-top: 16px;
    width: 100%;
    height: 56px;
    position: relative;
    input {
      width: 100%;
      padding: 17px 30px 14px 9px;
      border-radius: 8px;
      border: 1px solid grey;
      font-size: 18px;
    }
    svg {
      position: absolute;
      top: 19px;
      right: 8px;
      width: 18px;
      height: 18px;
      border-radius: 18px;
      border: none;
      align-items: center;
      justify-content: center;
    }
  }
  .MyTextCheck {
    display: flex;
    margin-top: 12px;
    font-size: 16px;
    font-weight: 300;
    color: #ddd;
  }
`;

const MyDoneBtnWrap = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
`;

const MyDoneBtn = styled.button`
  display: flex;
  width: 350px;
  height: 56px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  background-color: #dedede;
  border: none;
  border-radius: 8px;
  position: fixed;
  bottom: 26px;
  left: 50%;
  transform: translate(-50%);
`;