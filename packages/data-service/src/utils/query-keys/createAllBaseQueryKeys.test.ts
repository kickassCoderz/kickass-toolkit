import { createAllBaseQueryKeys } from './createAllBaseQueryKeys'

describe('createAllBaseQueryKeys', () => {
    it('should be defined', () => {
        expect(createAllBaseQueryKeys).toBeDefined()
    })

    it('should create a base query keys', () => {
        expect(createAllBaseQueryKeys('users')).toEqual([
            ['users', 'getOne'],
            ['users', 'getMany'],
            ['users', 'getList']
        ])
    })
})
