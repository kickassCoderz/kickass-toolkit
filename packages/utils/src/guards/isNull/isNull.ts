/**
 * Checks if the given value is `null`.
 * @param value - The value to check.
 * @returns `true` if the value is `null`, otherwise `false`.
 * @example
 * Returns `true`:
 * ```ts
 * isNull(null) // true
 * ```
 * @example
 * Returns `false`:
 * ```ts
 * isNull(1) // false
 * ```
 */
function isNull(value: unknown): value is null {
    return value === null
}

export { isNull }
