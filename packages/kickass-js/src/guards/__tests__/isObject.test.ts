import { isObject } from '../isObject'

describe('isObject', () => {
    it("should return 'false' for 'null'", () => {
        // eslint-disable-next-line unicorn/no-null
        expect(isObject(null)).toBe(false)
    })

    it("should return 'false' if value is 'array'", () => {
        expect(isObject([])).toBe(false)
    })

    it("should return 'false' for other non object values", () => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        expect(isObject(undefined)).toBe(false)

        expect(isObject(1)).toBe(false)

        expect(isObject('')).toBe(false)

        expect(isObject(true)).toBe(false)

        expect(isObject(false)).toBe(false)

        expect(isObject(Symbol('Kickass Coderz'))).toBe(false)

        const mockFunction = jest.fn()

        expect(isObject(mockFunction)).toBe(false)

        expect(mockFunction).not.toHaveBeenCalled()
    })

    it("should return 'true' for object values", () => {
        class Test {}

        expect(isObject(new Test())).toBe(true)

        expect(isObject({})).toBe(true)
    })
})
