import { isUndefined } from '../isUndefined'

describe('isUndefined', () => {
    it('should return false if value is not undefined', () => {
        const mockFunction = jest.fn()

        // eslint-disable-next-line unicorn/no-null
        expect(isUndefined(null)).toBe(false)

        expect(isUndefined(0)).toBe(false)

        expect(isUndefined('')).toBe(false)

        expect(isUndefined(false)).toBe(false)

        expect(isUndefined([])).toBe(false)

        expect(isUndefined({})).toBe(false)

        expect(isUndefined(mockFunction)).toBe(false)

        expect(mockFunction).not.toHaveBeenCalled()

        expect(isUndefined(Symbol('Kickass Coderz'))).toBe(false)
    })
    it('should return true if value is undefined', () => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        expect(isUndefined(undefined)).toBe(true)
    })
})
