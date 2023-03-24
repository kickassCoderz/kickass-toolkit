import { TGetListParams as TGetListParameters } from '../../types'
import { createBaseQueryKey } from './createBaseQueryKey'

function createGetListQueryKey(resource: string, parameters: TGetListParameters) {
    return [...createBaseQueryKey(resource, 'getList'), parameters] as const
}

export { createGetListQueryKey }
