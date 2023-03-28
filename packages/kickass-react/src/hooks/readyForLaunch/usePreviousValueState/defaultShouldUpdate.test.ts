import { defaultShouldUpdate } from './usePreviousValueState'

describe('defaultShouldUpdate', () => {
    it('should return true if the values are different', () => {
        expect(defaultShouldUpdate(1, 2)).toBe(true)
    })

    it('should return false if the values are the same', () => {
        expect(defaultShouldUpdate(1, 1)).toBe(false)
    })
})
