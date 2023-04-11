import { isArray } from './isArray'
import { isNull } from './isNull'

/**
 * Checks if the given value is an object. It filters out `null` and `array`.
 * @param value - The value to check.
 * @returns `true` if the value is an object, `false` otherwise.
 */
function isObject(value: unknown): value is object {
    return typeof value === 'object' && !isArray(value) && !isNull(value)
}

export { isObject }
