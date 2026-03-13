import { clientV1 } from "@/lib/client/http";
import { User } from "@/entities/user";

export async function getCurrentUser() {
    return clientV1.get<User>("/users/current");
}
