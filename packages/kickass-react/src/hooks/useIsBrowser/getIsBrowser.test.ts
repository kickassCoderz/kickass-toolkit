import { getIsBrowser } from './useIsBrowser'

describe('getIsBrowser', () => {
    it('should return "true" when global window is present (is browser)', () => {
        expect(getIsBrowser()).toBe(true)
    })
})
