const fs = require("node:fs");
const swcCfg = JSON.parse(fs.readFileSync(".swcrc", "utf8"));
swcCfg.jsc.target = "esnext";

module.exports = {
    testEnvironment: "jest-fixed-jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/testing/setup-after-env.ts"],
    transform: {
        "^.+\\.(t|j)sx?$": ["@swc/jest", swcCfg],
        "^.+\\.(svg|scss|css|png|jpg|woff2)$": "jest-transform-stub",
    },
    moduleNameMapper: {
        "^@/(.+)$": "<rootDir>/src/$1",
        "^@ui/(.+)$": "<rootDir>/src/comp/ui/$1",
    },
    testEnvironmentOptions: {
        globalsCleanup: "on",
    },
    transformIgnorePatterns: ["/node_modules/.pnpm/(?!(until-async|@faker-js))"],
};
