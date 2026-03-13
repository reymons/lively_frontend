import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "@/api/user";
import { User } from "@/entities/user";

const queryKey = "/users/me";

export function useUser(enabled = true) {
    return useQuery({
        queryKey: [queryKey],
        queryFn: () => getCurrentUser().then(r => r.data),
        staleTime: Infinity,
        retry: false,
        retryOnMount: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled,
    });
}

export function useMutateUser() {
    const client = useQueryClient();

    return (newUser: User | null) => {
        client.setQueryData([queryKey], newUser);
    };
}
