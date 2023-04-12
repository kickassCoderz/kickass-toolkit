import { isBoolean } from './isBoolean'

describe('isBoolean', () => {
    const mockFunction = jest.fn()
    it("should return 'false' for non-boolean values", () => {
        expect(isBoolean([])).toBe(false)

        expect(isBoolean({})).toBe(false)

        expect(isBoolean('')).toBe(false)

        expect(isBoolean(0)).toBe(false)
        // eslint-disable-next-line unicorn/no-null
        expect(isBoolean(null)).toBe(false)
        // eslint-disable-next-line unicorn/no-useless-undefined
        expect(isBoolean(undefined)).toBe(false)

        expect(isBoolean(Symbol('Kickass Coderz'))).toBe(false)

        expect(isBoolean(mockFunction)).toBe(false)

        expect(mockFunction).not.toHaveBeenCalled()
    })

    it("should return 'true' if value is boolean", () => {
        expect(isBoolean(true)).toBe(true)

        expect(isBoolean(false)).toBe(true)
    })
})
