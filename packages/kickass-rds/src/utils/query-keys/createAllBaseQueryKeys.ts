import { createBaseQueryKey } from './createBaseQueryKey'

function createAllBaseQueryKeys(resource: string) {
    return [
        createBaseQueryKey(resource, 'getOne'),
        createBaseQueryKey(resource, 'getMany'),
        createBaseQueryKey(resource, 'getList')
    ] as const
}

export { createAllBaseQueryKeys }
