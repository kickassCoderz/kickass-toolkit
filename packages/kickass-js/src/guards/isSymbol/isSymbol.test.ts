import { isSymbol } from './isSymbol'

describe('isSymbol', () => {
    it('should return false if value is not symbol', () => {
        const mockFunction = jest.fn()

        // eslint-disable-next-line unicorn/no-null
        expect(isSymbol(null)).toBe(false)

        // eslint-disable-next-line unicorn/no-useless-undefined
        expect(isSymbol(undefined)).toBe(false)

        expect(isSymbol(0)).toBe(false)

        expect(isSymbol('')).toBe(false)

        expect(isSymbol(false)).toBe(false)

        expect(isSymbol([])).toBe(false)

        expect(isSymbol({})).toBe(false)

        expect(isSymbol(mockFunction)).toBe(false)

        expect(mockFunction).not.toHaveBeenCalled()
    })
    it('should return true if value is symbol', () => {
        expect(isSymbol(Symbol('Kickass Coderz'))).toBe(true)
    })
})
