import { isNill } from './isNill'

describe('isNill', () => {
    it('should return false if value is not null or undefined', () => {
        const mockFunction = jest.fn()

        expect(isNill(0)).toBe(false)

        expect(isNill('')).toBe(false)

        expect(isNill(false)).toBe(false)

        expect(isNill([])).toBe(false)

        expect(isNill({})).toBe(false)

        expect(isNill(mockFunction)).toBe(false)

        expect(mockFunction).not.toHaveBeenCalled()

        expect(isNill(Symbol('Kickass Coderz'))).toBe(false)
    })
    it('should return true if value is null undefined', () => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        expect(isNill(undefined)).toBe(true)

        // eslint-disable-next-line unicorn/no-null
        expect(isNill(null)).toBe(true)
    })
})
