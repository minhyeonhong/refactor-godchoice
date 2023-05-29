import PageState from '../common/PageState';
import { useQuery } from '@tanstack/react-query';
import { kakaoInstance } from '../../api/kakaoInstance';
import { doc, setDoc, getDoc, db } from "../../firebase";

// 리다이렉트될 화면
const Kakao = () => {

	// 인가코드
	let code = new URL(window.location.href).searchParams.get('code');

	const kakaoLogin = async () => {

		const params = new URLSearchParams();

		params.append("grant_type", "authorization_code");
		params.append("client_id", process.env.REACT_APP_KAKAO_REST_API_KEY);
		params.append("redirect_uri", process.env.REACT_APP_KAKAO_REDIRECT_URI);
		params.append("code", code);

		return await kakaoInstance.post('https://kauth.kakao.com/oauth/token', params)
	}

	const kakaoLoginResponse = useQuery(['kakaoLogin'], kakaoLogin);

	const {
		access_token,
		expires_in,
		refresh_token,
		refresh_token_expires_in,
		scope,
		token_type
	} = kakaoLoginResponse.data.data

	const getKakaoUserInfo = async () => {
		return await kakaoInstance.get(`https://kapi.kakao.com/v2/user/me`,
			{
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			})
	}

	useQuery(["getKakaoUserInfo"], getKakaoUserInfo,
		{
			refetchOnWindowFocus: false,
			onSuccess: async (res) => {
				const { id, kakao_account } = res.data;
				const { email, gender, profile } = kakao_account;
				const { nickname, profile_image_url } = profile;

				const haveUserInfo = (await getDoc(doc(db, "users", `UID_${id}`)))._document !== null;

				if (!haveUserInfo) {
					await setDoc(doc(db, "users", `UID_${id}`), {
						email,
						gender,
						nickname,
						profile_image_url
					})
				}

				localStorage.setItem("uid", `UID_${id}`);
				window.location.replace("/mypage");
			},
			onError: error => {
				alert("로그인 실패 메인화면으로 돌아갑니다.");
				window.location.replace("/");
			}
		});


	return (
		<PageState display='flex' state='loading' imgWidth='25%' height='100vh'
			text='로그인 중입니다.' />
	)
};

export default Kakao;
