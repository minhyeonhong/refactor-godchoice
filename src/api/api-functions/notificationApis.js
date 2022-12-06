import { instance } from "../instance";

export const notificationApis = {
    getNotificationAX: () => instance.get(`${process.env.REACT_APP_API_URL}/getnotice`),

    deleteNotificationAX: (id) => instance.delete(`${process.env.REACT_APP_API_URL}/notice/${id}`),

    putNotificationAX: (id) => instance.put(`${process.env.REACT_APP_API_URL}/notice/${id}`)
}