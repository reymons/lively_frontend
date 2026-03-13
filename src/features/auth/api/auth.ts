import Cookie from "js-cookie";
import { login, register } from "@/api/auth";
import { getCurrentUser } from "@/api/user";
import { getCurrentStreamKey } from "@/api/stream-key";
import { useMutateUser } from "@/stores/user";
import { useMutateStreamKey } from "@/stores/stream-key";
import { ACCESS_TOKEN_COOKIE } from "@/config/env";

function useAuth() {
    const mutateUser = useMutateUser();
    const mutateStreamKey = useMutateStreamKey();

    return async (token: string) => {
        Cookie.set(ACCESS_TOKEN_COOKIE, token);
        const [userRes, skRes] = await Promise.all([getCurrentUser(), getCurrentStreamKey()]);
        mutateUser(userRes.data);
        mutateStreamKey(skRes.data);
        return { user: userRes.data, streamKey: skRes.data };
    };
}

export function useLogin() {
    const handleAuth = useAuth();

    return async (data: { username: string; password: string }) => {
        const res = await login(data);
        return handleAuth(res.data.access_token);
    };
}

export function useRegister() {
    const handleAuth = useAuth();

    return async (data: { username: string; password: string }) => {
        const res = await register(data);
        return handleAuth(res.data.access_token);
    };
}
