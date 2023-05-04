/**
 * Checks if the given value is a number. It filters out NaN.
 * @param value - The value to check.
 * @returns `true` if the value is a number, `false` otherwise.
 * @example
 * Returns `true`:
 * ```ts
 * isNumber(1) // true
 * ```
 * @example
 * Returns `false`:
 * ```ts
 * isNumber('1') // false
 * ```
 */
function isNumber(value: unknown): value is number {
    return !Number.isNaN(value) && typeof value === 'number'
}

export { isNumber }
