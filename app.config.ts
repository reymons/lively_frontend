import { paths } from "./src/config/paths";

function getPages(data: Record<string, any>): string[] {
    const stack: Record<string, any>[] = [data];
    const pages: string[] = [];

    while (stack.length > 0) {
        const data = stack.pop();
        for (const key in data) {
            if (key === "path") {
                pages.push(data[key]);
            } else if (key !== "get") {
                if (typeof data[key] === "object" && data[key] !== null) {
                    stack.push(data[key]);
                }
            }
        }
    }

    return pages;
}

export default {
    env: {
        HTTP_CLIENT_BASE_URL: process.env.HTTP_CLIENT_BASE_URL,
    },
    // It's needed for gh pages so that you can access any pages via an address bar
    // Do not specify the home page since it's handeled by default
    pages: getPages(paths).filter(p => p !== paths.home.path),
};
