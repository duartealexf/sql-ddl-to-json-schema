export type TransformerFunction<T> = (s: string) => T;
export type StringMap = { [k: string]: string };
export type AnyMap = { [k: string]: never };
export type TMap<T> = { [k: string]: T };
export type Tuple<T> = [keyof T, T[keyof T]];
