import { assert } from './assert'

describe('assert', () => {
    it('should be defined', () => {
        expect(assert).toBeDefined()
    })

    it('should throw if condition is false', () => {
        expect(() => {
            assert(false, 'error message')
        }).toThrow('[AssertionError]: error message')
    })

    it('should not throw if condition is true', () => {
        expect(() => {
            assert(true, '[AssertionError]: error message')
        }).not.toThrow()
    })

    it("should append prefix if it's provided", () => {
        expect(() => {
            assert(false, 'error message', 'prefix')
        }).toThrow('[prefix]: error message')
    })

    it('should only throw prefix if message is not provided', () => {
        expect(() => {
            assert(false, undefined, 'prefix')
        }).toThrow('[prefix]')
    })
})
