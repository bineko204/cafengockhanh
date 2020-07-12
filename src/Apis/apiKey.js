import { API_ENDPOINT } from "../Constants";
import AxiosService from "../Commons/axiosService";

const url = "api";

export const get = () => {
    return AxiosService.get(`${API_ENDPOINT}/${url}/get`);
};
export const change = () => {
    return AxiosService.get(`${API_ENDPOINT}/${url}/change`);
};
