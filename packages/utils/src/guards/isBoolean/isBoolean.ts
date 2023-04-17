/**
 * Checks if the given value is a boolean.
 * @param value - The value to check.
 * @returns `true` if the value is a boolean, `false` otherwise.
 */
function isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean'
}

export { isBoolean }
