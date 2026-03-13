import { clientV1 } from "@/lib/client/http";
import { StreamKey } from "@/entities/stream-key";

export async function getCurrentStreamKey() {
    return clientV1.get<StreamKey>("/stream-keys/current");
}
