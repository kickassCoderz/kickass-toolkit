/**
 * Invariant guard. Throws an error if condition is falsy. Works nicely with other guards.
 * @param condition - condition to check.
 * @param message - error message. If a function is provided, it will be called only if the condition is falsy.
 * @param options - options. If `scope` is provided, it will be prepended to the error message.
 */
function assert(
    condition: unknown,
    message?: string | (() => string),
    options?: { scope?: string }
): asserts condition {
    const resolvedMessage = typeof message === 'function' ? message() : message
    const scope = options?.scope && `[${options.scope}]:`

    const errorMessage = [scope, resolvedMessage].filter(Boolean).join(' ')

    if (!condition) {
        throw new Error(errorMessage)
    }
}

export { assert }
