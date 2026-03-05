import { routeWithQuery } from "./location";

describe("routeWithQuery", () => {
    it("constructs route with query parameters", () => {
        const result = routeWithQuery("/register", {
            country: "Serbia",
            city: "Belgrade",
        });
        expect(result).toBe(`/register?country=Serbia&city=Belgrade`);
    });

    it("appends leading slash if it's not present", () => {
        const result = routeWithQuery("about", {
            country: "Serbia",
            city: "Belgrade",
        });
        expect(result).toBe(`/about?country=Serbia&city=Belgrade`);
    });

    it("returns empty string if route is empty", () => {
        const result = routeWithQuery("", { name: "Jack" });
        expect(result).toBe("");
    });

    it("returns route with no query if query object is empty", () => {
        const result = routeWithQuery("/login", {});
        expect(result).toBe("/login");
    });
});
