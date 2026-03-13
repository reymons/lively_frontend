const paths = {
    home: {
        path: "/",
    },
    login: {
        path: "/login",
    },
    register: {
        path: "/register",
    },
    stream: {
        get: (username: string) => `/${username}`,
    },
};

export default paths;
