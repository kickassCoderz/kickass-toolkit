import type { TGetManyParameters } from '../../types'
import { createBaseQueryKey } from './createBaseQueryKey'

function createGetManyQueryKey(resource: string, parameters: TGetManyParameters) {
    return [...createBaseQueryKey(resource, 'getMany'), parameters] as const
}

export { createGetManyQueryKey }
