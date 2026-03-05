import { http, HttpResponse, type HttpHandler } from "msw";
import { setupServer } from "msw/node";
import { HTTP_CLIENT_BASE_URL } from "@/config/env";
import { entity } from "./mocks/entity";

type Method = keyof typeof http;

export { HttpResponse };

export function restHandler<T extends Record<string, any> | null>(
    method: Method,
    route: string,
    body: T
): HttpHandler {
    return http[method](`${HTTP_CLIENT_BASE_URL}${route}`, () => HttpResponse.json(body));
}

const handlers = [
    restHandler("get", "/api/v1/users/me", entity.user),
    restHandler("post", "/api/v1/auth/sign-in", entity.user),
];

export const restServer = setupServer(...handlers);
