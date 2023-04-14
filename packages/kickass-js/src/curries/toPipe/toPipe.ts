/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnyUnaryFunction } from '../../types'
import { pipe, type PipeFunctions, type PipeInitalValue } from '../pipe/pipe'

/**
 * Creates a callable pipe function from a list of `unary` functions. The pipe function takes the same arguments as the first function in the pipe and returns the result of the last function in the pipe.
 * @param first - The first function in the pipe. It can be of any arity.
 * @param pipeFunctions - A list of `unary` functions to execute in non mathematical order from left to right.
 * @returns A function that takes the same arguments as the first function in the pipe and returns the result of the last function in the pipe.
 */
function toPipe<F extends (...arguments_: any[]) => PipeInitalValue<R>, R extends AnyUnaryFunction[]>(
    first: F,
    ...pipeFunctions: PipeFunctions<R>
) {
    return (...arguments_: Parameters<F>) => pipe(Reflect.apply(first, first, arguments_), ...pipeFunctions)
}

export { toPipe }
