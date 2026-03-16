import { useQuery } from "@tanstack/react-query";
import { getUserByUsername } from "@/api/user";

export function usePublicUser({ username }: { username?: string }) {
    return useQuery({
        queryKey: ["/users/usernames", username],
        queryFn: () => getUserByUsername(username ?? "").then(r => r.data),
        staleTime: Infinity,
        retryOnMount: false,
        retry: false,
    });
}
