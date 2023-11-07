// useCRUD.ts
import {
    useQuery,
    useMutation,
    useQueryClient,
    UseQueryResult,
    UseMutationResult,
} from "react-query";
import { apiService } from "./apiService";

export const useGetCall = <T>(endpoint: string): UseQueryResult<T, unknown> => {
    return useQuery<T, unknown>(["data", endpoint], () =>
        apiService.get<T>(endpoint)
    );
};

export const usePostCall = <T, U = {}>(
    endpoint: string
): UseMutationResult<T, unknown, U, unknown> => {
    const queryClient = useQueryClient();
    return useMutation<T, unknown, U>(
        (data: U) => apiService.post<T, U>(endpoint, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["data", endpoint]);
            },
        }
    );
};

export const usePutCall = <T, U = {}>(
    endpoint: string
): UseMutationResult<T, unknown, U, unknown> => {
    const queryClient = useQueryClient();
    return useMutation<T, unknown, U>(
        (data: U) => apiService.put<T, U>(endpoint, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["data", endpoint]);
            },
        }
    );
};

export const useDeleteCall = <T>(
    endpoint: string
): UseMutationResult<T, unknown, void, unknown> => {
    const queryClient = useQueryClient();
    return useMutation<T, unknown, void>(() => apiService.delete<T>(endpoint), {
        onSuccess: () => {
            queryClient.invalidateQueries(["data", endpoint]);
        },
    });
};
