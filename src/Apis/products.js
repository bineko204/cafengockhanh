import { API_ENDPOINT } from "./../Constants";
import AxiosService from "./../Commons/axiosService";

const url = "products";

export const getList = () => {
    return AxiosService.get(`${API_ENDPOINT}/${url}`);
};
export const getProductInfo = (id) => {
    return AxiosService.get(`${API_ENDPOINT}/${url}/${id}`);
};
export const submitForm = (body) => {
    return AxiosService.post(`${API_ENDPOINT}/${url}/add`, body);
};
export const updateProduct = (id, body) => {
    return AxiosService.post(`${API_ENDPOINT}/${url}/edit/${id}`, body);
};
export const deleteProduct = (listId) => {
    return AxiosService.post(`${API_ENDPOINT}/${url}/delete`, listId);
};
