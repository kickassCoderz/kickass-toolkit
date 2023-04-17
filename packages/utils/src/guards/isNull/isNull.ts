/**
 * Checks if the given value is `null`.
 * @param value - The value to check.
 * @returns `true` if the value is `null`, otherwise `false`.
 */
function isNull(value: unknown): value is null {
    return value === null
}

export { isNull }
