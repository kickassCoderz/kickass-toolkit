import { uncapitalizeString } from './uncapitalizeString'

describe('uncapitalizeString', () => {
    it('should uncapitalize string', () => {
        expect(uncapitalizeString('')).toBe('')

        expect(uncapitalizeString('String')).toBe('string')

        expect(uncapitalizeString('STRING WITH SPACES')).toBe('sTRING WITH SPACES')
    })
})
