/* eslint-disable unicorn/no-null */
import { composeCssClass } from './composeCssClass'

describe('composeCssClass', () => {
    // @NOTE: ported from classNames package
    it('should return undefined if no arguments are passed', () => {
        expect(composeCssClass()).toBeUndefined()
    })

    test('(compat) keeps object keys with truthy values', () => {
        expect(composeCssClass({ a: true, b: false, c: 0, d: null, e: undefined, f: 1 })).toBe('a f')
    })

    test('(compat) joins arrays of class names and ignore falsy values', () => {
        expect(composeCssClass('a', 0, null, undefined, true, 1, 'b')).toBe('a 1 b')
    })

    test('(compat) supports heterogenous arguments', () => {
        expect(composeCssClass({ a: true }, 'b', 0)).toBe('a b')
    })

    test('(compat) should be trimmed', () => {
        expect(composeCssClass('', 'b', {}, '')).toBe('b')
    })

    test('(compat) returns undefined for an empty configuration', () => {
        expect(composeCssClass({})).toBeUndefined()
    })

    test('(compat) supports an array of class names', () => {
        expect(composeCssClass(['a', 'b'])).toBe('a b')
    })

    test('(compat) joins array arguments with string arguments', () => {
        expect(composeCssClass(['a', 'b'], 'c')).toBe('a b c')
        expect(composeCssClass('c', ['a', 'b'])).toBe('c a b')
    })

    test('(compat) handles multiple array arguments', () => {
        expect(composeCssClass(['a', 'b'], ['c', 'd'], ['e', 'f'])).toBe('a b c d e f')
    })

    test('(compat) handles arrays that include falsy and true values', () => {
        expect(composeCssClass(['a', 0, null, undefined, false, true, 'b'])).toBe('a b')
    })

    test('(compat) handles arrays that include arrays', () => {
        expect(composeCssClass(['a', ['b', 'c']])).toBe('a b c')
    })

    test('(compat) handles arrays that include objects', () => {
        expect(composeCssClass(['a', { b: true, c: false }])).toBe('a b')
    })

    test('(compat) handles deep array recursion', () => {
        expect(composeCssClass(['a', ['b', ['c', { d: true }]]])).toBe('a b c d')
    })

    test('(compat) handles arrays that are empty', () => {
        expect(composeCssClass(['a', []])).toBe('a')
    })

    test('(compat) handles nested arrays that have empty nested arrays', () => {
        expect(composeCssClass('a', [[]])).toBe('a')
    })

    test('(compat) handles all types of truthy and falsy property values as expected', () => {
        const out = composeCssClass({
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
        expect(composeCssClass('')).toBeUndefined()
        expect(composeCssClass('foo')).toBe('foo')
        expect(composeCssClass(true && 'foo')).toBe('foo')
        expect(composeCssClass(false && 'foo')).toBeUndefined()
    })

    test('strings (variadic)', () => {
        expect(composeCssClass('')).toBeUndefined()
        expect(composeCssClass('foo', 'bar')).toBe('foo bar')
        expect(composeCssClass(true && 'foo', false && 'bar', 'baz')).toBe('foo baz')
        expect(composeCssClass(false && 'foo', 'bar', 'baz', '')).toBe('bar baz')
    })

    test('objects', () => {
        expect(composeCssClass({})).toBeUndefined()
        expect(composeCssClass({ foo: true })).toBe('foo')
        expect(composeCssClass({ foo: true, bar: false })).toBe('foo')
        expect(composeCssClass({ foo: 'hiya', bar: 1 })).toBe('foo bar')
        expect(composeCssClass({ foo: 1, bar: 0, baz: 1 })).toBe('foo baz')
        expect(composeCssClass({ '-foo': 1, '--bar': 1 })).toBe('-foo --bar')
    })

    test('objects (variadic)', () => {
        expect(composeCssClass({}, {})).toBeUndefined()
        expect(composeCssClass({ foo: 1 }, { bar: 2 })).toBe('foo bar')
        expect(composeCssClass({ foo: 1 }, null, { baz: 1, bat: 0 })).toBe('foo baz')
        expect(composeCssClass({ foo: 1 }, {}, {}, { bar: 'a' }, { baz: null, bat: Number.POSITIVE_INFINITY })).toBe(
            'foo bar bat'
        )
    })

    test('arrays', () => {
        expect(composeCssClass([])).toBeUndefined()
        expect(composeCssClass(['foo'])).toBe('foo')
        expect(composeCssClass(['foo', 'bar'])).toBe('foo bar')
        expect(composeCssClass(['foo', 0 && 'bar', 1 && 'baz'])).toBe('foo baz')
    })

    test('arrays (nested)', () => {
        expect(composeCssClass([[[]]])).toBeUndefined()
        expect(composeCssClass([[['foo']]])).toBe('foo')
        expect(composeCssClass([true, [['foo']]])).toBe('foo')
        expect(composeCssClass(['foo', ['bar', ['', [['baz']]]]])).toBe('foo bar baz')
    })

    test('arrays (variadic)', () => {
        expect(composeCssClass([], [])).toBeUndefined()
        expect(composeCssClass(['foo'], ['bar'])).toBe('foo bar')
        expect(composeCssClass(['foo'], null, ['baz', ''], true, '', [])).toBe('foo baz')
    })

    test('arrays (no `push` escape)', () => {
        expect(composeCssClass({ push: 1 })).toBe('push')
        expect(composeCssClass({ pop: true })).toBe('pop')
        expect(composeCssClass({ push: true })).toBe('push')
        expect(composeCssClass('hello', { world: 1, push: true })).toBe('hello world push')
    })

    test('functions', () => {
        const mockFunction = jest.fn()
        // @ts-expect-error - we want to test invalid input
        expect(composeCssClass(mockFunction, 'hello')).toBe('hello')
        // @ts-expect-error - we want to test invalid input
        expect(composeCssClass(mockFunction, 'hello', composeCssClass)).toBe('hello')
        // @ts-expect-error - we want to test invalid input
        expect(composeCssClass(mockFunction, 'hello', [[composeCssClass], 'world'])).toBe('hello world')

        expect(mockFunction).not.toHaveBeenCalled()
    })
})
