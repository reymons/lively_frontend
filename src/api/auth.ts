import { clientV1 } from "@/lib/client/http";

export function login(data: { username: string; password: string }) {
    return clientV1.post<{ access_token: string }>("/auth/sign-in", data);
}

export function register(data: { username: string; password: string }) {
    return clientV1.post<{ access_token: string }>("/auth/sign-up", data);
}
