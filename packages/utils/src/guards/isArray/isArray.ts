/**
 * Checks if the given value is an array.
 * @param value - The value to check
 * @returns `true` if the value is an array, `false` otherwise.
 * @example
 * Returns `true`:
 * ```ts
 * isArray([]) // true
 * ```
 * @example
 * Returns `false`:
 * ```ts
 * isArray(1) // false
 * ```
 */
function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value)
}

export { isArray }
