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
  const selectList = ["서울", "인천", "세종", "대구", "부산", "울산", "광주", "대전", "제주도", "경기도", "강원도", "충청도", "경상도", "전라도"];
  const [Selected, setSelected] = useState("");

  const data = {
    nickName: "",
    address: "",
  };


  const profileData = useSelector((state) => state.myPage.userInfo);
  const img_ref = useRef(null);

  const [inputForm, setInputForm] = useState(data);
  const [imgFile, setImgFile] = useState([]);
  const [imagePreview, setImagePreview] = useState(profileData.userImg);


  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const nickName = profileData.nickName;
  const address = profileData.addressTag;

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

  const onChangeHandler2 = (v) => {
    setSelected(v.target.value);
  };

  const onSubmitHandler = async () => {
    let formData = new FormData();
    let uploadImg = img_ref.current;

    const obj = { userName: inputForm.nickName, userAddress: Selected }

    formData.append(
      "user",
      new Blob([JSON.stringify(obj)], { type: "application/json" })
    );

    if (imgFile.length === 0) {
      formData.append("multipartFile", null);
    } else {
      formData.append("multipartFile", uploadImg.files[0]);
    }

    dispatch(__putMyInfo(formData));

    // const data = dispatch(
    //   __putMyInfo(formData)
    // ).unwrap();

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
        {/* <div>
          <h3>프로필 수정</h3>
        </div> */}
        <MyProfile>
          <MyImgWrap>
            <MyImgBox>
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
            <div className="MyTextNick">관심 지역</div>
            <div className="MyTextInputWrap">
              {/* <input
                type="text"
                value={inputForm.address}
                name="address"
                onChange={onChangeHandler}
                placeholder={
                  address === null
                    ? "관심 지역을 입력해주세요."
                    : address
                }
              /> */}
              <select onChange={onChangeHandler2} defaultValue={address} style={{ width: "100%", height: "56px", border: "1px solid #808080", borderRadius: "10px" }} >
                {selectList.map((v) => (
                  <option value={v} key={v} >
                    {v}
                  </option>
                ))}
              </select>
              {/* <p>Selected : <b>{Selected}</b> </p> */}
              {/* <Delete /> */}
            </div>
            {/* <span className="MyTextCheck"></span> */}
          </MyTextWrap>
        </MyProfile>
        <MyDoneBtnWrap>
          <MyDoneBtn onClick={() => window.history.back()}>
            취소
          </MyDoneBtn>
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
  height: 150px;
  margin-top: 40px;
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
  margin : 50px 0 100px 0;
`;

const MyDoneBtn = styled.button`
  display: flex;
  width: 100%;
  height: 56px;
  margin : 20px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  background-color: #3556E1;
  border: none;
  border-radius: 10px;
  color : #fff;
  font-weight : 400;
`;
