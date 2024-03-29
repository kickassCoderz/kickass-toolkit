import { isNull } from '../isNull/isNull'
import { isUndefined } from '../isUndefined/isUndefined'

/**
 * Checks if value is `null` or `undefined`.
 * @param value - The value to check.
 * @returns Returns `true` if value is `null` or `undefined`, else `false`.
 * @example
 * Returns `true`:
 * ```ts
 * isNullish(null) // true
 * isNullish(undefined) // true
 * ```
 * @example
 * Returns `false`:
 * ```ts
 * isNullish(1) // false
 * ```
 */
function isNullish(value: unknown): value is null | undefined {
    return isNull(value) || isUndefined(value)
}

export { isNullish }
