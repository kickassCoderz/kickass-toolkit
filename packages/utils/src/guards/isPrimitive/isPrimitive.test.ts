import { isPrimitive } from './isPrimitive'
describe('isPrimitive', () => {
    it("should return 'false' for non-primitive values", () => {
        expect(isPrimitive([])).toBe(false)

        expect(isPrimitive({})).toBe(false)

        const mockFunction = jest.fn()

        expect(isPrimitive(mockFunction)).toBe(false)

        expect(mockFunction).not.toHaveBeenCalled()
    })

    it("should return 'true' if value is primitive", () => {
        expect(isPrimitive('')).toBe(true)

        expect(isPrimitive(1)).toBe(true)

        expect(isPrimitive(BigInt('9007199254740991'))).toBe(true)

        expect(isPrimitive(1n)).toBe(true)

        expect(isPrimitive(true)).toBe(true)

        expect(isPrimitive(false)).toBe(true)

        // eslint-disable-next-line unicorn/no-null
        expect(isPrimitive(null)).toBe(true)

        /* eslint-disable-next-line unicorn/no-useless-undefined */
        expect(isPrimitive(undefined)).toBe(true)

        expect(isPrimitive(Symbol('Kickass Coderz'))).toBe(true)
    })
})
