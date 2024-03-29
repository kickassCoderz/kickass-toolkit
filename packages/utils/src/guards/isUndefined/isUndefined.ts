/**
 * Checks if the given value is `undefined`.
 * @param value - The value to check.
 * @returns `true` if the given value is `undefined`, `false` otherwise.
 * @example
 * Returns `true`:
 * ```ts
 * isUndefined(undefined) // true
 * ```
 * @example
 * Returns `false`:
 * ```ts
 * isUndefined(1) // false
 * ```
 */
function isUndefined(value: unknown): value is undefined {
    return value === undefined
}

export { isUndefined }
