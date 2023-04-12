import { isString } from './isString'

describe('isString', () => {
    it("should return 'false' for non-string values", () => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        expect(isString(undefined)).toBe(false)

        expect(isString(1)).toBe(false)

        expect(isString([])).toBe(false)

        expect(isString({})).toBe(false)

        expect(isString(true)).toBe(false)

        expect(isString(false)).toBe(false)

        expect(isString(Symbol('Kickass Coderz'))).toBe(false)

        const mockFunction = jest.fn()

        expect(isString(mockFunction)).toBe(false)

        expect(mockFunction).not.toHaveBeenCalled()
    })

    it("should return 'true' for string values", () => {
        expect(isString('')).toBe(true)

        expect(isString('Kickass Coderz')).toBe(true)
    })
})
