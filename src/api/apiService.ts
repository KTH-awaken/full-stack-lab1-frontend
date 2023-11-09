import axios, { AxiosResponse } from "axios";
// import { SERVER_URL } from "../auth/fake-user";
export const SERVER_URL = "http://localhost:8080"


axios.defaults.timeout = 3 * 1000;

const BASE_URL = SERVER_URL;

export const apiService = {
    get: async <T>(endpoint: string): Promise<T> => {
        const response: AxiosResponse<T> = await axios.get(
            `${BASE_URL}${endpoint}`
        );
        return response.data;
    },
    post: async <T, U = {}>(endpoint: string, data: U): Promise<T> => {
        const response: AxiosResponse<T> = await axios.post(
            `${BASE_URL}${endpoint}`,
            data
        );
        return response.data;
    },
    put: async <T, U = {}>(endpoint: string, data: U): Promise<T> => {
        const response: AxiosResponse<T> = await axios.put(
            `${BASE_URL}${endpoint}`,
            data
        );
        return response.data;
    },
    delete: async <T>(endpoint: string): Promise<T> => {
        const response: AxiosResponse<T> = await axios.delete(
            `${BASE_URL}${endpoint}`
        );
        return response.data;
    },
};
