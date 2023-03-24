import type {
    TGetListParams as TGetListParameters,
    TGetManyParams as TGetManyParameters,
    TGetOneParams as TGetOneParameters,
    TQueryKeyIdentifier
} from '../../types'

function createBaseQueryKey(resource: string, queryIdentifier: TQueryKeyIdentifier) {
    return [resource, queryIdentifier] as const
}

export { createBaseQueryKey }
