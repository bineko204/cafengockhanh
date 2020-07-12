import { API_ENDPOINT } from "../Constants";
import AxiosService from "../Commons/axiosService";

const url = "category";

export const getList = (table) => {
    return AxiosService.get(`${API_ENDPOINT}/${url}/${table}`);
};
export const getCategoryInfo = (table, id) => {
    return AxiosService.get(`${API_ENDPOINT}/${url}/${table}/${id}`);
};
export const submitForm = (table, body) => {
    return AxiosService.post(`${API_ENDPOINT}/${url}/${table}`, body);
};
export const updateCategory = (table, id, body) => {
    return AxiosService.put(`${API_ENDPOINT}/${url}/${table}/${id}`, body);
};
export const deleteCategory = (table, id) => {
    return AxiosService.delete(`${API_ENDPOINT}/${url}/${table}/${id}`);
};
