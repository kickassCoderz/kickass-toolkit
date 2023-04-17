/**
 * Checks if a given value is a valid callable function.
 * @param value - The value to check.
 * @returns `true` if `value` is a valid callable function, `false` otherwise.
 */
function isFunction(value: unknown): value is CallableFunction {
    return typeof value === 'function' && !!value.call && !!value.apply && !!value.bind
}

export { isFunction }
