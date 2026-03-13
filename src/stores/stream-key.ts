import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentStreamKey } from "@/api/stream-key";
import { StreamKey } from "@/entities/stream-key";

const queryKey = "/stream-keys/current";

export function useStreamKey(enabled = true) {
    return useQuery({
        queryKey: [queryKey],
        queryFn: () => getCurrentStreamKey().then(r => r.data),
        staleTime: Infinity,
        retry: false,
        retryOnMount: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled,
    });
}

export function useMutateStreamKey() {
    const client = useQueryClient();

    return (sk: StreamKey | null) => {
        client.setQueryData([queryKey], sk);
    };
}
