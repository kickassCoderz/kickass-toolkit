import { isArray, isNumber, isObject, isString, isUndefined } from '../../guards'

export type TConstructCssClassDictionaryValue = Record<string, unknown>

export type TConstructCssClassArrayValue = Array<TConstructCssClassValue>

export type TConstructCssClassValue =
    | TConstructCssClassArrayValue
    | TConstructCssClassDictionaryValue
    | string
    | number
    | null
    | boolean
    | undefined

/**
 * Constructs a CSS class string conditionally from the given values.
 * Falsy values are discarded as well as standalone boolean values.
 * @param values - The values to construct the CSS class string from. It can take any number of arguments.
 * @returns `string` or `undefined` if no value is truthy.
 * @example
 * Strings:
 * ```ts
 * constructCssClass('foo', 'bar') // 'foo bar'
 * ```
 * @example
 * Strings(variadic):
 * ```ts
 * constructCssClass('foo', true && 'bar', 'baz') // 'foo bar baz'
 * ```
 * @example
 * Objects:
 * ```ts
 * constructCssClass({ foo:true, bar:false, baz:isTrue() }) // 'foo baz'
 * ```
 * @example
 * Objects(variadic):
 * ```ts
 * constructCssClass({ foo:true }, { bar:false }, null, { '--foobar':'hello' }) // 'foo --foobar'
 * ```
 * @example
 * Arrays:
 * ```ts
 * constructCssClass(['foo', 0, false, 'bar']) // 'foo bar'
 * ```
 * @example
 * Arrays(variadic):
 * ```ts
 * constructCssClass(['foo'], ['', 0, false, 'bar'], [['baz', [['hello'], 'there']]]) // 'foo bar baz hello there'
 * ```
 * @example
 * Mixed:
 * ```ts
 * constructCssClass('foo', [1 && 'bar', { baz:false, bat:null }, ['hello', ['world']]], 'cya') // 'foo bar hello world cya'
 * ```
 */
function constructCssClass(...values: Array<TConstructCssClassValue>): string | undefined {
    if (values.length === 0) {
        return
    }

    const stringStack: Array<string> = []

    for (const value of values) {
        // this filters out falsy values: null, undefined, false, 0, NaN, ''
        if (!value) {
            continue
        }

        if (isString(value)) {
            stringStack.push(value)
        }

        if (isNumber(value)) {
            stringStack.push(value.toString())
        }

        if (isArray(value) && value.length > 0) {
            const valueFromArray = Reflect.apply(constructCssClass, undefined, value)

            if (!isUndefined(valueFromArray)) {
                stringStack.push(valueFromArray)
            }
        }

        if (isObject(value)) {
            const objectEntries = Object.entries(value)

            const objectStringStack: Array<string> = []

            for (const [objectKey, objectValue] of objectEntries) {
                if (objectValue) {
                    objectStringStack.push(objectKey)
                }
            }

            const objectString = objectStringStack.length > 0 ? objectStringStack.join(' ') : undefined

            if (!isUndefined(objectString)) {
                stringStack.push(objectString)
            }
        }
    }

    return stringStack.length > 0 ? stringStack.join(' ') : undefined
}

export { constructCssClass }
