import { capitalizeString } from './capitalizeString'

describe('capitalizeString', () => {
    it('should capitalize string', () => {
        expect(capitalizeString('')).toBe('')

        expect(capitalizeString('string')).toBe('String')

        expect(capitalizeString('string with spaces')).toBe('String with spaces')
    })
})
