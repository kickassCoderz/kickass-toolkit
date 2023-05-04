import { isArray, isNumber, isObject, isString, isUndefined } from '../../guards'

export type TComposeCssClassDictionaryValue = Record<string, unknown>

export type TComposeCssClassArrayValue = Array<TComposeCssClassValue>

export type TComposeCssClassValue =
    | TComposeCssClassArrayValue
    | TComposeCssClassDictionaryValue
    | string
    | number
    | null
    | boolean
    | undefined

/**
 * Composes a CSS class string conditionally from the given values.
 * Falsy values are discarded as well as standalone boolean values.
 * @param values - The values to construct the CSS class string from. It can take any number of arguments.
 * @returns `string` or `undefined` if no value is truthy.
 * @example
 * Strings:
 * ```ts
 * composeCssClass('foo', 'bar') // 'foo bar'
 * ```
 * @example
 * Strings(variadic):
 * ```ts
 * composeCssClass('foo', true && 'bar', 'baz') // 'foo bar baz'
 * ```
 * @example
 * Objects:
 * ```ts
 * composeCssClass({ foo:true, bar:false, baz:isTrue() }) // 'foo baz'
 * ```
 * @example
 * Objects(variadic):
 * ```ts
 * composeCssClass({ foo:true }, { bar:false }, null, { '--foobar':'hello' }) // 'foo --foobar'
 * ```
 * @example
 * Arrays:
 * ```ts
 * composeCssClass(['foo', 0, false, 'bar']) // 'foo bar'
 * ```
 * @example
 * Arrays(variadic):
 * ```ts
 * composeCssClass(['foo'], ['', 0, false, 'bar'], [['baz', [['hello'], 'there']]]) // 'foo bar baz hello there'
 * ```
 * @example
 * Mixed:
 * ```ts
 * composeCssClass('foo', [1 && 'bar', { baz:false, bat:null }, ['hello', ['world']]], 'cya') // 'foo bar hello world cya'
 * ```
 */
function composeCssClass(...values: Array<TComposeCssClassValue>): string | undefined {
    if (values.length === 0) {
        return
    }

    const classNameStack: Array<string | number> = []

    for (let valueIndex = 0; valueIndex < values.length; valueIndex += 1) {
        const value = values[valueIndex]

        // this filters out falsy values: null, undefined, false, 0, NaN, ''
        if (!value) {
            continue
        }

        if (isString(value) || isNumber(value)) {
            classNameStack.push(value)
        }

        if (isArray(value) && value.length > 0) {
            const valueFromArray = Reflect.apply(composeCssClass, undefined, value)

            if (!isUndefined(valueFromArray)) {
                classNameStack.push(valueFromArray)
            }
        }

        if (isObject(value)) {
            const objectEntries = Object.entries(value)

            for (let objectEntryIndex = 0; objectEntryIndex < objectEntries.length; objectEntryIndex += 1) {
                const [objectKey, objectValue] = objectEntries[objectEntryIndex]

                if (objectValue) {
                    classNameStack.push(objectKey)
                }
            }
        }
    }

    return classNameStack.length > 0 ? classNameStack.join(' ') : undefined
}

export { composeCssClass }
