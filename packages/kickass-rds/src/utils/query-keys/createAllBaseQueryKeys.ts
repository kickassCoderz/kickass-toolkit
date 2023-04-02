import { createBaseQueryKey } from './createBaseQueryKey'
import { createGetListQueryKey } from './createGetListQueryKey'

function createAllBaseQueryKeys(resource: string) {
    return [
        createBaseQueryKey(resource, 'getOne'),
        createBaseQueryKey(resource, 'getMany'),
        createGetListQueryKey(resource)
    ] as const
}

export { createAllBaseQueryKeys }
