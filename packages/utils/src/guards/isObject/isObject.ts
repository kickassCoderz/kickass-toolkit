import { isArray } from '../isArray/isArray'
import { isNull } from '../isNull/isNull'

/**
 * Checks if the given value is an object. It filters out `null` and `array`.
 * @param value - The value to check.
 * @returns `true` if the value is an object, `false` otherwise.
 * @example
 * Returns `true`:
 * ```ts
 * isObject({}) // true
 * ```
 * @example
 * Returns `false`:
 * ```ts
 * isObject(1) // false
 * ```
 */
function isObject(value: unknown): value is object {
    return typeof value === 'object' && !isArray(value) && !isNull(value)
}

export { isObject }
