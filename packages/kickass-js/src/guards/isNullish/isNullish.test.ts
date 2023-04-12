import { isNullish } from './isNullish'

describe('isNullish', () => {
    it('should return false if value is not null or undefined', () => {
        const mockFunction = jest.fn()

        expect(isNullish(0)).toBe(false)

        expect(isNullish('')).toBe(false)

        expect(isNullish(false)).toBe(false)

        expect(isNullish([])).toBe(false)

        expect(isNullish({})).toBe(false)

        expect(isNullish(mockFunction)).toBe(false)

        expect(mockFunction).not.toHaveBeenCalled()

        expect(isNullish(Symbol('Kickass Coderz'))).toBe(false)
    })
    it('should return true if value is null undefined', () => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        expect(isNullish(undefined)).toBe(true)

        // eslint-disable-next-line unicorn/no-null
        expect(isNullish(null)).toBe(true)
    })
})
