/**
 * Checks if a value is a symbol.
 * @param value - The value to check.
 * @returns `true` if the value is a symbol, otherwise `false`.
 * @example
 * Returns `true`:
 * ```ts
 * isSymbol(Symbol()) // true
 * ```
 * @example
 * Returns `false`:
 * ```ts
 * isSymbol(1) // false
 * ```
 */
function isSymbol(value: unknown): value is symbol {
    return typeof value === 'symbol'
}

export { isSymbol }
