import { isBigint } from '../isBigint'
import { isBoolean } from '../isBoolean'
import { isNullish } from '../isNullish'
import { isNumber } from '../isNumber'
import { isString } from '../isString'
import { isSymbol } from '../isSymbol'

/**
 * Check if given `value` is a primitive.
 * @param value - The value to check.
 * @returns `true` if `value` is a primitive, `false` otherwise.
 * @example
 * Returns `true`:
 * ```ts
 * isPrimitive(1) // true
 * ```
 * @example
 * Returns `false`:
 * ```ts
 * isPrimitive([]) // false
 * ```
 */
function isPrimitive(value: unknown): value is string | number | bigint | boolean | symbol | null | undefined {
    return (
        isString(value) || isNumber(value) || isBigint(value) || isBoolean(value) || isSymbol(value) || isNullish(value)
    )
}

export { isPrimitive }
