const paths = {
    home: {
        path: "/",
    },
    stream: {
        get: (username: string) => `/${username}`,
    },
};

export default paths;
