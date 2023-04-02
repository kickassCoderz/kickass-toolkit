import type { TGetManyParameters } from '../../types'
import { createBaseQueryKey } from './createBaseQueryKey'

function createGetManyQueryKey(resource: string, parameters?: TGetManyParameters) {
    if (!parameters) {
        return [...createBaseQueryKey(resource, 'getMany')] as const
    }

    return [...createBaseQueryKey(resource, 'getMany'), parameters] as const
}

export { createGetManyQueryKey }
