/**
 * Checks if the value is an instance of the constructor.
 * @param constructor - The constructor function to check against.
 * @param value - The value to check.
 * @returns A type guard that checks if the value is an instance of the constructor.
 * @example
 * Returns `true`:
 * ```ts
 * class Foo {}
 * isInstanceOf(Foo, new Foo()) // true
 * ```
 * @example
 * Returns `false`:
 * ```ts
 * class Foo {}
 * isInstanceOf(Foo, {}) // false
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isInstanceOf<T extends abstract new (...arguments_: any) => any>(
    constructor: T,
    value: unknown
): value is InstanceType<T> {
    return value instanceof constructor
}

export { isInstanceOf }
