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
    let className = ''

    for (let valueIndex = 0, valuesLength = values.length; valueIndex < valuesLength; valueIndex += 1) {
        const value = values[valueIndex]

        switch (true) {
            case !value: {
                continue
            }
            case typeof value === 'string':
            case typeof value === 'number': {
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                className = className + (className && ' ') + value
                continue
            }
            case Array.isArray(value): {
                const valueFromArray = composeCssClass(...(value as TComposeCssClassArrayValue))

                if (valueFromArray) {
                    className = className + (className && ' ') + valueFromArray
                }
                continue
            }
            case typeof value === 'object': {
                for (const key in value as TComposeCssClassDictionaryValue) {
                    if ((value as TComposeCssClassDictionaryValue)[key]) {
                        className = className + (className && ' ') + key
                    }
                }
                continue
            }
        }
    }

    return className || undefined
}

export { composeCssClass }
