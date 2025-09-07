/* eslint-disable @typescript-eslint/no-explicit-any */
export type List<T = any> = ReadonlyArray<T>

export type ListLength<T extends List> = T['length']

export type ListTail<T extends List> = T extends readonly []
    ? T
    : T extends readonly [any?, ...infer Tailing]
    ? Tailing
    : T

export type FirstInList<T extends List> = ListLength<T> extends 0 ? undefined : T[0]

export type LastInList<T extends List> = T[ListLength<ListTail<T>>]
