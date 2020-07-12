import { API_ENDPOINT } from "../Constants";
import AxiosService from "../Commons/axiosService";

const url = "media";

export const getList = () => {
    return AxiosService.get(`${API_ENDPOINT}/${url}`);
};
export const submitForm = (body) => {
    return AxiosService.post(`${API_ENDPOINT}/${url}/add`, body);
};
export const deleteImage = (body) => {
    return AxiosService.post(`${API_ENDPOINT}/${url}/delete`, body);
};