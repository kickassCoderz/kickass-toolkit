/**
 * @jest-environment node
 */
import { MOCK_API_BASE_URL } from '../../mocks/consts'
import { RestDataService } from './RestDataService'

describe('RestDataService (Node)', () => {
    it('should be defined', () => {
        expect(RestDataService).toBeDefined()
    })

    it('should use provided fetch polyfill in Node environment', async () => {
        const fetchPolyfill = jest.fn()
        const dataService = new RestDataService(MOCK_API_BASE_URL, fetchPolyfill)

        expect(dataService.fetch).toBe(fetchPolyfill)
    })

    it('should throw in Node environment if missing fetch instance', async () => {
        expect(() => {
            new RestDataService(MOCK_API_BASE_URL)
        }).toThrow('fetch instance is required in non browser environments')
    })
})
