/**
 * Check if given `value` is a `bigint`.
 * @param value - The value to check.
 * @returns `true` if `value` is a `bigint`, `false` otherwise.
 * @example
 * Returns `true`:
 * ```ts
 * isBigint(1n) // true
 * ```
 * @example
 * Returns `false`:
 * ```ts
 * isBigint(1) // false
 * ```
 */
function isBigint(value: unknown): value is bigint {
    return typeof value === 'bigint'
}

export { isBigint }
