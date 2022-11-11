const {
    // REACT_APP_KAKAO_REDIRECT_URI,
    // REACT_APP_KAKAO_REDIRECT_URI,
    REACT_APP_GOOGLE_CLIENT_ID,
    REACT_APP_GOOGLE_REDIRECT_URI,
    // REACT_APP_NAVER_CLIENT_ID,
    // REACT_APP_NAVER_REDIRECT_URI,
  } = process.env;


   const REACT_APP_KAKAO_REST_API_KEY = '790a14386cc99f5c69cd925a977f2d22'
   const REACT_APP_KAKAO_REDIRECT_URI = 'http://3.38.255.232/member/signup/kakao'

   const REACT_APP_NAVER_CLIENT_ID = "BeFF2BLXGHQ26lS7FEd0"
   const REACT_APP_NAVER_REDIRECT_URI = "http://3.38.255.232/member/signup/naver"


  export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=profile%20email`;

  export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  // export const KAKAO_AUTH_URL = `http://kauth.kakao.com/oauth/authorize?client_id={client_id}&redirect_uri={redirect_url}&response_type=code`;

  export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${REACT_APP_NAVER_REDIRECT_URI}&state=state
  `;
  // export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id={client_id}&state=state&redirect_uri={redirect_uri}
  // `;


  // export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

  // export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_CALLBACK_URL}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`;
  
  // Jf8SsxW29OiPMjbzrGRqdHHwwzMVFlevJlfYELD4bte1-Do8SDVuLC3p2mA8ueevR7suKAo9cuoAAAGEZat_oQ