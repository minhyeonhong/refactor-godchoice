# ![KakaoTalk_20221208_185649538](https://user-images.githubusercontent.com/90454621/207082891-4dc7cee1-1542-4169-8f39-f95cb59c6a45.png)
<br/>

## ⭐️ 프로젝트 소개  
### &nbsp;&nbsp;&nbsp;&nbsp;📌 전국에 있는 다양한 행사를 소개하고 같이 갈 사람을 모집하는 서비스



<br/>
<br/>

## ⭐️ 주요 서비스
![image](https://user-images.githubusercontent.com/90454621/207088933-8d19917d-2a1d-443d-9db2-54b5ed1636ea.png)
<br/>
### ✔ 지역 맞춤 설정
**마이페이지**에서 지역 설정을 하면 **메인페이지**에서 선택한 지역의 행사들을 확인할 수 있습니다!

 또한 홈 화면 지역 태그로 선택 지역의 행사들을 모아볼 수 있습니다.
 ### ✔ 다양한 행사 정보 확인과 소통
 **행사글, 모집글, 질문글**로 지역행사를 알리거나 함께 갈 사람을 모집할 수 있습니다. 

또한 궁금한 내용을 질문할 수 있고, 댓글과 대댓글로도 소통할 수 있습니다.
### ✔ 나의 관심 행사들만 모아보기
마이페이지에서 내가 쓴 글과 댓글 단 글, 스크랩한 행사들을 확인할 수 있습니다.
<br/>
<br/>


## ⭐️ 기술 정보
![react](https://user-images.githubusercontent.com/90454621/207085400-4fc1dbd6-a4ad-4e54-87a0-5ddf414f932a.svg)
![axios](https://user-images.githubusercontent.com/90454621/207085575-f3c559d2-1621-43a7-b78f-7a6de331784c.svg)
![versel](https://user-images.githubusercontent.com/90454621/207085784-bdad387e-57a4-4734-ac88-486d6ec48c59.svg)
![bootstrap](https://user-images.githubusercontent.com/90454621/207086086-96916e96-b628-4c41-98f9-871ce296cce5.svg)
![stylecomp](https://user-images.githubusercontent.com/90454621/207086411-6aed9818-279e-4112-abea-60b779ad3487.svg)
![reactquery](https://user-images.githubusercontent.com/90454621/207086571-44c76c42-152f-406c-98f6-670df17e286b.svg)


## ⭐️ 리펙토링

<details>
<summary>카카오톡 소셜 로그인</summary> 
<div markdown="1">
Kakao developers의 카카오 로그인 API를 활용하여 인가코드를 파라미터값으로 한 요청을 Back-End서버로 보내고 유저 정보와 토큰을 응답받아 로컬스토리지에 저장하여 구현했었습니다.   

Back-End서버가 닫혀 인가코드를 받고 인증까지 끝내고 유저정보를 받아 Firebase에 유저정보를 담고 Firebase에 담은 유저의 키값을 로컬스토리지에 담아 구현했습니다.

<a href="https://mhhmhh.tistory.com/120" target="_blank">자세한 내용</a>
</div>
</details>

<details>
<summary> firebase 사용 </summary>
<div markdown="1">
Back-End서버가 닫혔기 때문에 유저정보와 작성한 글을 담을 데이터 베이스서버가 필요했습니다.

DB서버만 있으면 서비스를 구축 가능하다고 판단되어 NoSql인 firebase를 선택하게 되었습니다.     

<a href="https://mhhmhh.tistory.com/122" target="_blank">자세한 내용</a>

또한 firebase에 Storage를 이용하여 이미지를 저장했습니다.   

<a href="https://mhhmhh.tistory.com/126" target="_blank">자세한 내용</a>

</div>
</details>

<details>
<summary>무한 스크롤 firebase 적용</summary> 
<div markdown="1">
기존 react-intersection-observer와 react-query의 useInfiniteQuery를 이용하여 무한스크롤을 구현 했었습니다.

Back-End서버의 api로 받아 오던 데이터를 firebase로 대체하여 구현했습니다.

<a href="https://mhhmhh.tistory.com/127" target="_blank">자세한 내용</a>
</div>
</details>

<details>
<summary>댓글 기능 firebase 적용</summary> 
<div markdown="1">
firebase에 comments컬렉션을 따로 만들어 글작성시 생성되도록 구현했습니다.   

<a href="https://mhhmhh.tistory.com/128" target="_blank">자세한 내용</a>
</div>
</details>