/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnyUnaryFunction } from '../../types'

export type PipeInitalValue<T extends AnyUnaryFunction[]> = Parameters<T[0]>[0]

export type PipeReturnType<T extends AnyUnaryFunction[]> = T extends [...any[], (argument: any) => infer R] ? R : never

export type PipeArguments<T extends AnyUnaryFunction[], Accumulator extends AnyUnaryFunction[] = []> = T extends [
    (argument: infer A) => infer B
]
    ? [...Accumulator, (argument: A) => B]
    : T extends [(argument: infer A) => any, ...infer Tail]
    ? Tail extends [(argument: infer B) => any, ...any[]]
        ? PipeArguments<Tail, [...Accumulator, (argument: A) => B]>
        : Accumulator
    : Accumulator

export type PipeFunctions<T extends AnyUnaryFunction[]> = PipeArguments<T> extends T ? T : PipeArguments<T>

/**
 * Executes a list of `unary` functions in non mathematical order from left to right.
 * @param initialValue - The initial value to pass to the first function in the pipe. It should be of same type as the argument of the first function in the pipe.
 * @param pipeFunctions - A list of `unary` functions to execute in non mathematical order from left to right.
 * @returns The result of the last function in the pipe.
 * @example
 * ```ts
 * const multiplyByTwo = (a: number) => a * 2
 * const subtractThree = (a: number) => a - 3
 * pipe(2, multiplyByTwo, subtractThree) // returns 1
 * ```
 */
function pipe<T extends AnyUnaryFunction[]>(
    initialValue: PipeInitalValue<T>,
    ...pipeFunctions: PipeFunctions<T>
): PipeReturnType<T> {
    let result = initialValue

    for (const functionToExecute of pipeFunctions) {
        result = functionToExecute(result) as PipeFunctions<T>[number]
    }

    return result as PipeReturnType<T>
}

export { pipe }
