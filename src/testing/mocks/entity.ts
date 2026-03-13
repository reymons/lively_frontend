import { User } from "@/entities/user";

const user: Readonly<User> = Object.freeze({
    id: 1,
    username: "mock-username",
});

export const entity = {
    user,
};
