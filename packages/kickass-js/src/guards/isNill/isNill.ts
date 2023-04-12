import { isNull } from '../isNull/isNull'
import { isUndefined } from '../isUndefined/isUndefined'

/**
 * Checks if value is `null` or `undefined`.
 * @param value - The value to check.
 * @returns Returns `true` if value is `null` or `undefined`, else `false`.
 */
function isNill(value: unknown): value is null | undefined {
    return isNull(value) || isUndefined(value)
}

export { isNill }
