/* eslint-disable unicorn/no-null */
import { constructCssClass } from './constructCssClass'

describe('constructCssClass', () => {
    // @NOTE: ported from classNames package
    it('should return undefined if no arguments are passed', () => {
        expect(constructCssClass()).toBeUndefined()
    })

    test('(compat) keeps object keys with truthy values', () => {
        expect(constructCssClass({ a: true, b: false, c: 0, d: null, e: undefined, f: 1 })).toBe('a f')
    })

    test('(compat) joins arrays of class names and ignore falsy values', () => {
        expect(constructCssClass('a', 0, null, undefined, true, 1, 'b')).toBe('a 1 b')
    })

    test('(compat) supports heterogenous arguments', () => {
        expect(constructCssClass({ a: true }, 'b', 0)).toBe('a b')
    })

    test('(compat) should be trimmed', () => {
        expect(constructCssClass('', 'b', {}, '')).toBe('b')
    })

    test('(compat) returns an empty string for an empty configuration', () => {
        expect(constructCssClass({})).toBeUndefined()
    })

    test('(compat) supports an array of class names', () => {
        expect(constructCssClass(['a', 'b'])).toBe('a b')
    })

    test('(compat) joins array arguments with string arguments', () => {
        expect(constructCssClass(['a', 'b'], 'c')).toBe('a b c')
        expect(constructCssClass('c', ['a', 'b'])).toBe('c a b')
    })

    test('(compat) handles multiple array arguments', () => {
        expect(constructCssClass(['a', 'b'], ['c', 'd'], ['e', 'f'])).toBe('a b c d e f')
    })

    test('(compat) handles arrays that include falsy and true values', () => {
        expect(constructCssClass(['a', 0, null, undefined, false, true, 'b'])).toBe('a b')
    })

    test('(compat) handles arrays that include arrays', () => {
        expect(constructCssClass(['a', ['b', 'c']])).toBe('a b c')
    })

    test('(compat) handles arrays that include objects', () => {
        expect(constructCssClass(['a', { b: true, c: false }])).toBe('a b')
    })

    test('(compat) handles deep array recursion', () => {
        expect(constructCssClass(['a', ['b', ['c', { d: true }]]])).toBe('a b c d')
    })

    test('(compat) handles arrays that are empty', () => {
        expect(constructCssClass(['a', []])).toBe('a')
    })

    test('(compat) handles nested arrays that have empty nested arrays', () => {
        expect(constructCssClass('a', [[]])).toBe('a')
    })

    test('(compat) handles all types of truthy and falsy property values as expected', () => {
        const out = constructCssClass({
            // falsy:
            null: null,
            emptyString: '',
            noNumber: Number.NaN,
            zero: 0,
            negativeZero: -0,
            false: false,
            undefined: undefined,

            // truthy (literally anything else):
            nonEmptyString: 'foobar',
            whitespace: ' ',
            // eslint-disable-next-line @typescript-eslint/unbound-method
            function: Object.prototype.toString,
            emptyObject: {},
            nonEmptyObject: { a: 1, b: 2 },
            emptyList: [],
            nonEmptyList: [1, 2, 3],
            greaterZero: 1
        })

        expect(out).toBe(
            'nonEmptyString whitespace function emptyObject nonEmptyObject emptyList nonEmptyList greaterZero'
        )
    })

    // @NOTE: ported from clsx package
    test('strings', () => {
        expect(constructCssClass('')).toBeUndefined()
        expect(constructCssClass('foo')).toBe('foo')
        expect(constructCssClass(true && 'foo')).toBe('foo')
        expect(constructCssClass(false && 'foo')).toBeUndefined()
    })

    test('strings (variadic)', () => {
        expect(constructCssClass('')).toBeUndefined()
        expect(constructCssClass('foo', 'bar')).toBe('foo bar')
        expect(constructCssClass(true && 'foo', false && 'bar', 'baz')).toBe('foo baz')
        expect(constructCssClass(false && 'foo', 'bar', 'baz', '')).toBe('bar baz')
    })

    test('objects', () => {
        expect(constructCssClass({})).toBeUndefined()
        expect(constructCssClass({ foo: true })).toBe('foo')
        expect(constructCssClass({ foo: true, bar: false })).toBe('foo')
        expect(constructCssClass({ foo: 'hiya', bar: 1 })).toBe('foo bar')
        expect(constructCssClass({ foo: 1, bar: 0, baz: 1 })).toBe('foo baz')
        expect(constructCssClass({ '-foo': 1, '--bar': 1 })).toBe('-foo --bar')
    })

    test('objects (variadic)', () => {
        expect(constructCssClass({}, {})).toBeUndefined()
        expect(constructCssClass({ foo: 1 }, { bar: 2 })).toBe('foo bar')
        expect(constructCssClass({ foo: 1 }, null, { baz: 1, bat: 0 })).toBe('foo baz')
        expect(constructCssClass({ foo: 1 }, {}, {}, { bar: 'a' }, { baz: null, bat: Number.POSITIVE_INFINITY })).toBe(
            'foo bar bat'
        )
    })

    test('arrays', () => {
        expect(constructCssClass([])).toBeUndefined()
        expect(constructCssClass(['foo'])).toBe('foo')
        expect(constructCssClass(['foo', 'bar'])).toBe('foo bar')
        expect(constructCssClass(['foo', 0 && 'bar', 1 && 'baz'])).toBe('foo baz')
    })

    test('arrays (nested)', () => {
        expect(constructCssClass([[[]]])).toBeUndefined()
        expect(constructCssClass([[['foo']]])).toBe('foo')
        expect(constructCssClass([true, [['foo']]])).toBe('foo')
        expect(constructCssClass(['foo', ['bar', ['', [['baz']]]]])).toBe('foo bar baz')
    })

    test('arrays (variadic)', () => {
        expect(constructCssClass([], [])).toBeUndefined()
        expect(constructCssClass(['foo'], ['bar'])).toBe('foo bar')
        expect(constructCssClass(['foo'], null, ['baz', ''], true, '', [])).toBe('foo baz')
    })

    test('arrays (no `push` escape)', () => {
        expect(constructCssClass({ push: 1 })).toBe('push')
        expect(constructCssClass({ pop: true })).toBe('pop')
        expect(constructCssClass({ push: true })).toBe('push')
        expect(constructCssClass('hello', { world: 1, push: true })).toBe('hello world push')
    })

    test('functions', () => {
        const mockFunction = jest.fn()
        // @ts-expect-error - we want to test invalid input
        expect(constructCssClass(mockFunction, 'hello')).toBe('hello')
        // @ts-expect-error - we want to test invalid input
        expect(constructCssClass(mockFunction, 'hello', constructCssClass)).toBe('hello')
        // @ts-expect-error - we want to test invalid input
        expect(constructCssClass(mockFunction, 'hello', [[constructCssClass], 'world'])).toBe('hello world')

        expect(mockFunction).not.toHaveBeenCalled()
    })
})
