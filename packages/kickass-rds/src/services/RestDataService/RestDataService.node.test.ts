/**
 * @jest-environment node
 */
import { RestDataService } from './RestDataService'

describe('RestDataService (Node)', () => {
    it('should be defined', () => {
        expect(RestDataService).toBeDefined()
    })

    it('should use provided fetch polyfill in Node environment', () => {
        const fetchPolyfill = jest.fn()
        const dataService = new RestDataService('http://localhost/api', fetchPolyfill)

        expect(dataService.fetch).toBe(fetchPolyfill)
    })

    it('should throw in Node environment if missing fetch instance', () => {
        expect(() => {
            new RestDataService('http://localhost/api')
        }).toThrow('fetch instance is required in non browser environments')
    })
})
