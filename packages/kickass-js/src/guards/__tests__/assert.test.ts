import { assert } from '../assert'

describe('assert', () => {
    it('should be defined', () => {
        expect(assert).toBeDefined()
    })

    it('should throw if condition is false', () => {
        expect(() => {
            assert(false, 'error message')
        }).toThrow('error message')
    })

    it('should not throw if condition is true', () => {
        expect(() => {
            assert(true, 'error message')
        }).not.toThrow()
    })

    it("should append prefix if it's provided", () => {
        expect(() => {
            assert(false, 'error message', { scope: 'prefix' })
        }).toThrow('[prefix]: error message')
    })
})
