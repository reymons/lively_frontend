export function routeWithQuery(route: string, q: Record<string, any>) {
    if (!route) return "";
    const queryStr = Object.keys(q)
        .map(key => `${key}=${q[key]}`)
        .join("&");
    const newRoute = route[0] === "/" ? route : "/" + route;
    if (queryStr.length > 0) return `${newRoute}?${queryStr}`;
    return newRoute;
}
