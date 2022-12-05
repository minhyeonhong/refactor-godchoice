import { instance } from "../instance";

export const memberApis = {
    /**카카오 로그인 */
    kakaoLoginAX: (code) => instance.get(`${process.env.REACT_APP_API_URL}/member/signup/kakao?code=${code}`),
    /**네이버 로그인 */
    naverLoginAX: (loginInfo) => instance.get(`${process.env.REACT_APP_API_URL}/member/signup/naver?code=${loginInfo.code}&state=${loginInfo.state}`),
    /**구글 로그인 */
    googleLoginAX: (code) => instance.get(`${process.env.REACT_APP_API_URL}/member/signup/google?code=${code}`),
}
