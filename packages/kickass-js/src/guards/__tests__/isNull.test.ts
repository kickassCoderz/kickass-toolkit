import { isNull } from '../isNull'

describe('isNull', () => {
    it('should return false if value is not null', () => {
        const mockFunction = jest.fn()
        // eslint-disable-next-line unicorn/no-useless-undefined
        expect(isNull(undefined)).toBe(false)

        expect(isNull(0)).toBe(false)

        expect(isNull('')).toBe(false)

        expect(isNull(false)).toBe(false)

        expect(isNull([])).toBe(false)

        expect(isNull({})).toBe(false)

        expect(isNull(mockFunction)).toBe(false)

        expect(mockFunction).not.toHaveBeenCalled()

        expect(isNull(Symbol('Kickass Coderz'))).toBe(false)
    })
    it('should return true if value is null', () => {
        // eslint-disable-next-line unicorn/no-null
        expect(isNull(null)).toBe(true)
    })
})
