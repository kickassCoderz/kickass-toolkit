/* eslint-disable @typescript-eslint/no-explicit-any */
import type { List } from './array'

export type AnyFunction<P extends List, R = any> = (...arguments_: P) => R

export type AnyUnaryFunction<P = any, R = any> = AnyFunction<[P], R>
