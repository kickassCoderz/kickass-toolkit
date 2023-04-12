import { isNumber } from './isNumber'

describe('isNumber', () => {
    it("should return 'false' for non-number values", () => {
        expect(isNumber([])).toBe(false)

        expect(isNumber({})).toBe(false)

        expect(isNumber('')).toBe(false)

        expect(isNumber(true)).toBe(false)

        expect(isNumber(false)).toBe(false)

        expect(isNumber(Symbol('Kickass Coderz'))).toBe(false)

        const mockFunction = jest.fn()

        expect(isNumber(mockFunction)).toBe(false)

        expect(mockFunction).not.toHaveBeenCalled()
    })

    it("should return 'false' if the value is 'NaN'", () => {
        expect(isNumber(Number.NaN)).toBe(false)
    })

    it("should return 'true' if value is number", () => {
        expect(isNumber(0)).toBe(true)

        expect(isNumber(1)).toBe(true)

        expect(isNumber(-1)).toBe(true)

        expect(isNumber(Number.POSITIVE_INFINITY)).toBe(true)

        expect(isNumber(Number.NEGATIVE_INFINITY)).toBe(true)

        expect(isNumber(Number.MAX_SAFE_INTEGER)).toBe(true)

        expect(isNumber(Number.MIN_SAFE_INTEGER)).toBe(true)

        expect(isNumber(Number.MAX_VALUE)).toBe(true)

        expect(isNumber(Number.MIN_VALUE)).toBe(true)

        expect(isNumber(Number.EPSILON)).toBe(true)

        expect(isNumber(Number(1))).toBe(true)
    })
})
