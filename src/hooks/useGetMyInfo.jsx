import { useQuery } from '@tanstack/react-query';
import { doc, db, getDoc } from "../firebase";

function useGetMyInfo(fbCollection, docId) {

    const getFBUserInfo = async () => {
        const response = await getDoc(doc(db, fbCollection, docId));
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