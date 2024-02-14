import { lowercaseString } from './lowercaseString'

describe('lowercaseString', () => {
    it('should convert string to lowercase', () => {
        expect(lowercaseString('')).toBe('')

        expect(lowercaseString('strIng')).toBe('string')

        expect(lowercaseString('STRING WITH SPACES')).toBe('string with spaces')
    })
})
