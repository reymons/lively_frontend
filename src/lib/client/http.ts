import { HTTP_CLIENT_BASE_URL } from "@/config/env";
import axios from "axios";

export const clientV1 = axios.create({
    baseURL: HTTP_CLIENT_BASE_URL + "/api/v1",
});

clientV1.interceptors.request.use(async cfg => {
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
