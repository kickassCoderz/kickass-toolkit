import { isFunction } from '../isFunction'

describe('isFunction', () => {
    it("should return 'false' for non-function values", () => {
        expect(isFunction(11)).toBe(false)

        class Data {}

        expect(isFunction(new Data())).toBe(false)

        expect(isFunction([])).toBe(false)

        expect(isFunction({})).toBe(false)

        expect(isFunction('')).toBe(false)

        // eslint-disable-next-line unicorn/no-null
        expect(isFunction(null)).toBe(false)

        // eslint-disable-next-line unicorn/no-useless-undefined
        expect(isFunction(undefined)).toBe(false)

        expect(isFunction(true)).toBe(false)

        expect(isFunction(false)).toBe(false)

        expect(isFunction(Symbol('Kickass Coderz'))).toBe(false)
    })

    it("should return 'true' if value is function", () => {
        const mockFunction = jest.fn()

        expect(isFunction(mockFunction)).toBe(true)

        expect(mockFunction).not.toHaveBeenCalled()
    })
})
