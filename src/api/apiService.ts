import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryResult,
    UseMutationResult,
} from "react-query";
import Cookies from "js-cookie";

const token = Cookies.get("token");
if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// const BASE_URL = "http://localhost:8080";

export const useGetCall = <T>(
    baseUrl: string,
    endpoint: string,
    queryKey?: string,
    headers?: AxiosRequestConfig["headers"],
): UseQueryResult<T, unknown> => {
    return useQuery<T, unknown>([queryKey, endpoint], async () => {
        const config: AxiosRequestConfig = {};
        if (headers) {
            config.headers = headers;
        }

        const response: AxiosResponse<T> = await axios.get(
            `${baseUrl}${endpoint}`,
            config
        );
        return response.data;
    });
};

export const usePostCall = <T, U = {}>(
    baseUrl: string,
    endpoint: string,
    queryKey: string,
    headers?: AxiosRequestConfig["headers"],
): UseMutationResult<T, unknown, U, unknown> => {
    const queryClient = useQueryClient();
    return useMutation<T, unknown, U>(
        async (data: U) => {
            const config: AxiosRequestConfig = {};
            if (headers) {
                config.headers = headers;
            }
         `Bearer ${token}`;

            const response: AxiosResponse<T> = await axios.post(
                `${baseUrl}${endpoint}`,
                data,
                config
            );
            return response.data;
        },
        {
            onSuccess: (newValue: T) => {
                queryClient.invalidateQueries([queryKey, endpoint]);
                queryClient.setQueryData<T[]>(queryKey, (oldValue = []) => {
                    // Append the new encounter to the existing encounters
                    return [...oldValue, newValue];
                });
            },
        }
    );
};


export const usePutCall = <T, U = {}>(
    baseUrl: string,
    endpoint: string,
    headers?: AxiosRequestConfig["headers"],
): UseMutationResult<T, unknown, U, unknown> => {
    const queryClient = useQueryClient();
    return useMutation<T, unknown, U>(
        async (data: U) => {
            const config: AxiosRequestConfig = {};
            if (headers) {
                config.headers = headers;
            }
            const response: AxiosResponse<T> = await axios.put(
                `${baseUrl}${endpoint}`,
                data,
                config
            );
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["data", endpoint]);
            },
        }
    );
};

export const useDeleteCall = <T>(
    baseUrl: string,
    endpoint: string,
    headers?: AxiosRequestConfig["headers"],
): UseMutationResult<T, unknown, void, unknown> => {
    const queryClient = useQueryClient();
    return useMutation<T, unknown, void>(
        async () => {
            const config: AxiosRequestConfig = {};
            if (headers) {
                config.headers = headers;
            }
            const response: AxiosResponse<T> = await axios.delete(
                `${baseUrl}${endpoint}`,
                config
            );
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["data", endpoint]);
            },
        }
    );
};
