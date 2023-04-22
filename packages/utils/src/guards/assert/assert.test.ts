import { assert } from './assert'

describe('assert', () => {
    it('should be defined', () => {
        expect(assert).toBeDefined()
    })

    it('should throw if condition is false', () => {
        expect(() => {
            assert(false, { message: 'error message' })
        }).toThrow('error message')
    })

    it('should not throw if condition is true', () => {
        expect(() => {
            assert(true, { message: 'error message' })
        }).not.toThrow()
    })

    it("should append prefix if it's provided", () => {
        expect(() => {
            assert(false, { scope: 'prefix', message: 'error message' })
        }).toThrow('[prefix]: error message')
    })
})
