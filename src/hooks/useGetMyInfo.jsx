import { useQuery } from '@tanstack/react-query';
import { getUser } from '../firestore/module/users';

function useGetMyInfo(uid) {

    const getFBUserInfo = async () => {
        const response = await getUser(uid);
        return response._document.data.value.mapValue.fields;
    }

    const { data, isLoading } = useQuery(["getUserInfoFB"], getFBUserInfo,
        {
            select: response => {
                const { email, gender, nickname, profile_image_url } = response;
                const userInfo = {
                    email: email.stringValue,
                    gender: gender.stringValue,
                    nickname: nickname.stringValue,
                    profile_image_url: profile_image_url.stringValue
                }
                return userInfo
            }
        }
    );

    return {
        userInfo: data,
        isLoading
    };
}

export default useGetMyInfo;