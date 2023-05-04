/**
 * Checks if a given value is a valid callable function.
 * @param value - The value to check.
 * @returns `true` if `value` is a valid callable function, `false` otherwise.
 * @example
 * Returns `true`:
 * ```ts
 * isFunction(() => {}) // true
 * ```
 * @example
 * Returns `false`:
 * ```ts
 * isFunction(1) // false
 * ```
 */
function isFunction(value: unknown): value is CallableFunction {
    return typeof value === 'function' && !!value.call && !!value.apply && !!value.bind
}

export { isFunction }
