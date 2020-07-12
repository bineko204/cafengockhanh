import { API_ENDPOINT } from "../Constants";
import AxiosService from "../Commons/axiosService";

const url = "users";

export const getList = () => {
    return AxiosService.get(`${API_ENDPOINT}/${url}`);
};
export const getUserInfo = (id) => {
    return AxiosService.get(`${API_ENDPOINT}/${url}/${id}`);
};
export const login = (body) => {
    return AxiosService.post(`${API_ENDPOINT}/${url}/login`, body);
};
export const updateUserInfo = (id, body) => {
    return AxiosService.post(`${API_ENDPOINT}/${url}/edit/${id}`, body);
};
export const deleteArticle = (listId) => {
    return AxiosService.post(`${API_ENDPOINT}/${url}/delete`, listId);
};
