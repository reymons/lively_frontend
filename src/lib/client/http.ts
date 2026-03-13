import Cookie from "js-cookie";
import { HTTP_CLIENT_BASE_URL, ACCESS_TOKEN_COOKIE } from "@/config/env";
import axios from "axios";

export const clientV1 = axios.create({
    baseURL: HTTP_CLIENT_BASE_URL + "/api/v1",
});

clientV1.interceptors.request.use(cfg => {
    const token = Cookie.get(ACCESS_TOKEN_COOKIE);
    if (token) {
        cfg.headers.set("Authorization", `Bearer ${token}`);
    }
    cfg.headers.set("Content-Type", "application/json");
    cfg.withCredentials = true;
    return cfg;
});

clientV1.interceptors.response.use(
    res => res,
    err =>
        Promise.reject(
            new Error(
                (err.response?.data || err.message || "").trim() || "Unknown error has occurred"
            )
        )
);
