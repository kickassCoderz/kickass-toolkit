import { isFunction } from '../isFunction/isFunction'
import { isUndefined } from '../isUndefined/isUndefined'

export type TAssertOptions<E extends ErrorConstructor> = {
    /**
     * If a function is provided, it will be called only if the condition is falsy.
     */
    message?: string | (() => string)
    /**
     * Scope of the error message.
     */
    scope?: string

    /**
     * Error type to throw.
     */
    errorType?: E
}

/**
 * Invariant guard. Throws an error if condition is falsy. Works nicely with other guards.
 * @param condition - condition to check.
 * @param options - Error message options. Has three properties: `message`,`scope` and `errorType`.
 * @throws provided `ErrorType` if `condition` is falsy.
 * @example
 * Without options:
 * ```ts
 * assert(isString(1))
 * ```
 * @example
 * With options:
 * ```ts
 * assert(isString(1), { message: 'Expected string, got number',scope: 'MyScope', errorType: TypeError })
 * ```
 * Throws: `TypeError: [MyScope]: Expected string, got number`
 */
function assert<E extends ErrorConstructor = ErrorConstructor>(
    condition: unknown,
    options?: TAssertOptions<E>
): asserts condition {
    if (!condition) {
        const message = options?.message
        const scope = options?.scope
        const ErrorType = options?.errorType || Error

        const resolvedMessage = isFunction(message) ? message() : message
        const resolvedScope = !isUndefined(scope) && `[${scope}]:`

        const errorMessage = [resolvedScope, resolvedMessage].filter(Boolean).join(' ')

        throw new ErrorType(errorMessage)
    }
}

export { assert }
