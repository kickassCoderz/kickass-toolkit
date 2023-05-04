import { isBigint } from './isBigint'

describe('isBigint', () => {
    it("should return 'false' for non-bigint values", () => {
        expect(isBigint([])).toBe(false)

        expect(isBigint(1)).toBe(false)

        expect(isBigint({})).toBe(false)

        expect(isBigint('')).toBe(false)

        expect(isBigint(true)).toBe(false)

        expect(isBigint(false)).toBe(false)

        expect(isBigint(Symbol('Kickass Coderz'))).toBe(false)

        const mockFunction = jest.fn()

        expect(isBigint(mockFunction)).toBe(false)

        expect(mockFunction).not.toHaveBeenCalled()
    })

    it("should return 'true' if value is bigint", () => {
        expect(isBigint(BigInt('9007199254740991'))).toBe(true)

        expect(isBigint(1n)).toBe(true)
    })
})
