import { isArray } from './isArray'

describe('isArray', () => {
    const mockFunction = jest.fn()
    it("should return 'false' for non-array values", () => {
        expect(isArray({})).toBe(false)

        expect(isArray(1)).toBe(false)

        expect(isArray('')).toBe(false)
        // eslint-disable-next-line unicorn/no-null
        expect(isArray(null)).toBe(false)
        // eslint-disable-next-line unicorn/no-useless-undefined
        expect(isArray(undefined)).toBe(false)

        expect(isArray(false)).toBe(false)

        expect(isArray(true)).toBe(false)

        expect(isArray(mockFunction)).toBe(false)

        expect(mockFunction).not.toHaveBeenCalled()

        expect(isArray(Symbol('Kickass Coderz'))).toBe(false)
    })
    it("should return 'true' if value is array", () => {
        expect(isArray([])).toBe(true)

        expect(isArray([1, 'Kickass Coderz', mockFunction])).toBe(true)
    })
})
