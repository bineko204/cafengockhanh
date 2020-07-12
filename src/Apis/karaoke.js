import { API_ENDPOINT } from "../Constants";
import AxiosService from "../Commons/axiosService";

const url = "karaoke";

export const getList = () => {
    return AxiosService.get(`${API_ENDPOINT}/${url}`);
};
export const addVideo = (body) => {
    return AxiosService.post(`${API_ENDPOINT}/${url}/add`, body);
};
export const deleteVideo = (id) => {
    return AxiosService.post(`${API_ENDPOINT}/${url}/delete/${id}`);
};
