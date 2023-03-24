import { TGetOneParams as TGetOneParameters } from '../../types'
import { createBaseQueryKey } from './createBaseQueryKey'

function createGetOneQueryKey(resource: string, parameters: TGetOneParameters) {
    return [...createBaseQueryKey(resource, 'getOne'), parameters] as const
}

export { createGetOneQueryKey }
