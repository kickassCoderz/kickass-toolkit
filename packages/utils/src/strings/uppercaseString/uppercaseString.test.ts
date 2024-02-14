import { uppercaseString } from './uppercaseString'

describe('uppercaseString', () => {
    it('should convert string to uppercase', () => {
        expect(uppercaseString('')).toBe('')

        expect(uppercaseString('string')).toBe('STRING')

        expect(uppercaseString('string with spaces')).toBe('STRING WITH SPACES')
    })
})
