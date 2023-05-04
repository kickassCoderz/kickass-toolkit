/**
 * Checks if the value is a string.
 * @param value - The value to check.
 * @returns `true` if the value is a string, `false` otherwise.
 * @example
 * Returns `true`:
 * ```ts
 * isString('') // true
 * ```
 * @example
 * Returns `false`:
 * ```ts
 * isString(1) // false
 * ```
 */
function isString(value: unknown): value is string {
    return typeof value === 'string'
}

export { isString }
