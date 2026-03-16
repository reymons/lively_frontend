export type Field<K extends string, D extends Record<string, any>> = { [P in K]: D };
