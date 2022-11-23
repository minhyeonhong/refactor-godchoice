import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { saveCategory, __getMyCmt  } from "../../redux/modules/myPageSlice";
import Button from "../elements/Button";
import { Image } from "../../assets";
import noImg from "../../assets/images/common/noImg.png"

const MyCmt = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [categoryTab, setCategoryTab] = useState("event");
    useEffect(() => {
        dispatch(__getMyCmt());
        setCategoryTab(saveCategoryTab);
    }, []);

    const { myCommentList } = useSelector((state) => state.myPage);
    console.log("제발 !!!!!! ===> ", myCommentList);

    const onClickCategory = (tab) => {
        setCategoryTab(tab);
        dispatch(saveCategory(tab));
    };

    const { saveCategoryTab } = useSelector((state) => state.myPage);
    const {eventPost, gatherPost, askPost} = myCommentList
    

    return (
        <>
        <CateWrap>
        <Container>
          <CategoryBox>
            <Button
              btnType="tabMenu"
              onClick={() => {
                onClickCategory("event");
              }}
              active={categoryTab}
              name="event"
            >
              행사글
            </Button>
            <Button
              btnType="tabMenu"
              onClick={() => {
                onClickCategory("gather");
              }}
              active={categoryTab}
              name="gather"
            >
              모집글
            </Button>
            <Button
              btnType="tabMenu"
              onClick={() => {
                onClickCategory("ask");
              }}
              active={categoryTab}
              name="ask"
            >
              질문글
            </Button>
          
          </CategoryBox>

          <CategoryInfoList>
           
              <>

             { categoryTab === "event" ? (eventPost && eventPost.map((v) => (
                    <ListBox
                      key={v.postId}
                      onClick={() =>
                        navigate(`/eventposts/${v.postId}`)
                      }
                    >
                      {/* <ItemImg
                        bgImg={
                          v.imgUrl !== null
                            ? v.imgUrl : <img src={noImg} alt="noImg" />
                        }
                      ></ItemImg> */}
                       <ItemImg>
                      {  v.img !== null ? v.img : <img src={noImg} alt="noImg" /> }
                      </ItemImg>
                      <div>
                        <div>
                          <p>{v.title}</p>
                          <p>{v.content}</p>
                          <p>
                            {v.startPeriod} - {v.endPeriod}
                          </p>
                        </div>
                      </div>
                    </ListBox>
                  )
)):categoryTab === "gather"?(gatherPost &&
gatherPost.map(
    (v) => (
        <ListBox
          key={v.postId}
          onClick={() =>
            navigate(`/gatherposts/${v.postId}`)
          }
        >
          {/* <ItemImg
            bgImg={
              v.imgUrl !== null
              ? v.imgUrl : <img src={noImg} alt="noImg" />
            }
          ></ItemImg> */}
           <ItemImg>
                      {  v.img !== null ? v.img : <img src={noImg} alt="noImg" /> }
                      </ItemImg>
          <div>
            <div>
              <p>{v.title}</p>
              <p>{v.content}</p>
              <p>
                {v.startPeriod} - {v.endPeriod}
              </p>
            </div>
          </div>
        </ListBox>
      )

)
)
:  ( askPost && askPost.map(
(v) => (
                    <ListBox
                      key={v.postId}
                      onClick={() =>
                        navigate(`/askposts/${v.postId}`)
                      }
                    >
                      {/* <ItemImg
                        bgImg={
                          v.imgUrl !== null
                          ? v.imgUrl : <img src={noImg} alt="noImg" />
                        }
                      ></ItemImg> */}
                       <ItemImg>
                      {  v.img !== null ? v.img : <img src={noImg} alt="noImg" /> }
                      </ItemImg>
                      <div>
                        <div>
                          <p>{v.title}</p>
                          <p>{v.content}</p>
                          <p>
                            {v.startPeriod} - {v.endPeriod}
                          </p>
                        </div>
                      </div>
                    </ListBox>
                  )
)) 
// if(categoryTab === "event"){
// eventPost.map(
// )
// }else if(categoryTab === "gather"){
// gatherPost.map(
// )
// }else{
// askPost.map(
// )
// }
}


                {/* {myPostList.filter((v) => v.whatwhat === saveCategoryTab).map(
                    (v) => (
                    <ListBox
                      key={v.postId}
                      onClick={() =>
                        navigate(`/eventposts/${v.postId}`)
                      }
                    >
                      <ItemImg
                        bgImg={
                          v.img !== null
                            ? v.img
                            : "https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg"
                        }
                      ></ItemImg>
                      <div>
                        <div>
                          <p>{v.title}</p>
                          <p>{v.content}</p>
                          <p>
                            {v.startPeriod} - {v.endPeriod}
                          </p>
                        </div>
                      </div>
                    </ListBox>
                  )
                  )} */}
              </>
          </CategoryInfoList>
        </Container>
      </CateWrap>
        </>
    )
}

export default MyCmt;



const CateWrap = styled.div`
  width: 100%;
`;
const Container = styled.div`
  width: 100%;
`;

const CategoryBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const CategoryInfoList = styled.div`
  width: 100%;
`;

const ItemImg = styled.div`
  background: url(${(props) => props.bgImg}) no-repeat center center;
  background-size: cover;
  width: 150px;
  height: 200px;
  @media (max-width: 375px) {
    width: 125px;
    height: 150px;
  }
  @media (max-width: 299px) {
    width: 100px;
    height: 125px;
  }
`;

const ListBox = styled.div`
  cursor: pointer;
  padding: 23px 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 22px;
  border-bottom: 1px solid #f3f3f3;
  div:nth-child(2) {
    width: 60%;
    div:nth-child(1) {
      width: 100%;

      p:nth-child(1) {
        font-weight: 600;
        font-size: 20px;
        line-height: 30px;
        /* 말줄임 */
        /* white-space:nowrap; */
        overflow: hidden;
        text-overflow: ellipsis;

        /* 두줄 */
        /* display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical; */
        /* color:black; */
      }
      p:nth-child(2) {
        font-weight: 300;
        font-size: 16px;
        line-height: 22px;
      }
      @media (max-width: 374px) {
        p:nth-child(1) {
          font-size: 16px;
        }
        p:nth-child(2) {
          font-size: 12px;
        }
      }
      p {
        font-family: "Noto Sans KR", "sans-serif";
      }
    }
    div:nth-child(2) {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
    }
  }
`;

// const WriterButton = styled.div`
//   text-align: end;
//   box-sizing: border-box;
//   padding: 6px 16px 0 16px;
//   display: flex;
//   align-items: flex-end;
//   align-content: flex-end;
//   width: 100%;
// `;

// const StyledLabel = styled.label`
//   display: flex;
//   align-items: center;
//   user-select: none;
// `;

// const StyledP = styled.p`
//   margin-left: 0.25rem;
// `;
// const StyledInput = styled.input`
//   appearance: none;
//   border: 1.5px solid gainsboro;
//   border-radius: 0.35rem;
//   width: 1.5rem;
//   height: 1.5rem;
//   cursor: pointer;

//   &:checked {
//     border-color: transparent;
//     background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
//     background-size: 100% 100%;
//     background-position: 50%;
//     background-repeat: no-repeat;
//     background-color: rgb(148, 218, 118);
//   }
// `;


// const {eventPost,gatherPost,myPostList} = myPostList
// categoryTab === "event"?(
// eventPost.map(
// )
// ):categoryTab === "gather"?(
// gatherPost.map(
// )
// )
// :(
// askPost.map(
// )
// )
// if(categoryTab === "event"){
// eventPost.map(
// )
// }else if(categoryTab === "gather"){
// gatherPost.map(
// )
// }else{
// askPost.map(
// )
// }