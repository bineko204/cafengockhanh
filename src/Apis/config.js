import { API_ENDPOINT } from "../Constants";
import AxiosService from "../Commons/axiosService";

const url = "config";

export const getListConfig = () => {
    return AxiosService.get(`${API_ENDPOINT}/${url}`);
};
export const changeConfig = (body) => {
    return AxiosService.post(`${API_ENDPOINT}/${url}/edit`, body);
};
