import { isFunction } from '../isFunction/isFunction'
import { isUndefined } from '../isUndefined/isUndefined'

export type TAssertOptions = {
    /**
     * If a function is provided, it will be called only if the condition is falsy.
     */
    message?: string | (() => string)
    /**
     * Scope of the error message.
     */
    scope?: string
}

/**
 * Invariant guard. Throws an error if condition is falsy. Works nicely with other guards.
 * @param condition - condition to check.
 * @param options - Error message options. Has two properties: `message` and `scope`.
 */
function assert(condition: unknown, options?: TAssertOptions): asserts condition {
    if (!condition) {
        const message = options?.message
        const scope = options?.scope

        const resolvedMessage = isFunction(message) ? message() : message
        const resolvedScope = !isUndefined(scope) && `[${scope}]:`

        const errorMessage = [resolvedScope, resolvedMessage].filter(Boolean).join(' ')

        throw new Error(errorMessage)
    }
}

export { assert }
