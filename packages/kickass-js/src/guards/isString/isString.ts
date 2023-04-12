/**
 * Checks if the value is a string.
 * @param value - The value to check.
 * @returns `true` if the value is a string, `false` otherwise.
 */
function isString(value: unknown): value is string {
    return typeof value === 'string'
}

export { isString }
