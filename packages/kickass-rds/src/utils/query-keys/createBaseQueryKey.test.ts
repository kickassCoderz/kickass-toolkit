import { createBaseQueryKey } from './createBaseQueryKey'

describe('createBaseQueryKey', () => {
    it('should be defined', () => {
        expect(createBaseQueryKey).toBeDefined()
    })

    it('should create a base query key', () => {
        expect(createBaseQueryKey('users', 'getList')).toEqual(['users', 'getList'])
    })
})
