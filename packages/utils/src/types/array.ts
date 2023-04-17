/* eslint-disable @typescript-eslint/no-explicit-any */
export type List<T = any> = ReadonlyArray<T>

export type Length<T extends List> = T['length']

export type Tail<T extends List> = T extends readonly [] ? T : T extends readonly [any?, ...infer Tailing] ? Tailing : T

export type Last<T extends List = List<any>> = T[Length<Tail<T>>]
