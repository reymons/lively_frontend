import { type Field } from "@/lib/client/socket";

type InStreamStarted = Field<`stream.${number}.started`, { user_id: number }>;

type InStreamViewers = Field<`stream.${number}.viewers`, { user_id: number; viewers: number }>;

export type InStreamMessage = InStreamStarted & InStreamViewers;
