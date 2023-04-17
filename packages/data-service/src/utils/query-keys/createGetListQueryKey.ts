import type { TGetListParameters } from '../../types'
import { createBaseQueryKey } from './createBaseQueryKey'

function createGetListQueryKey(resource: string, parameters?: TGetListParameters) {
    if (!parameters) {
        return [...createBaseQueryKey(resource, 'getList')] as const
    }

    return [...createBaseQueryKey(resource, 'getList'), parameters] as const
}

export { createGetListQueryKey }
