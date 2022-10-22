import type { TGetListParams, TGetManyParams, TGetOneParams, TQueryKeyIdentifier } from '../types'

const createBaseQueryKey = (resource: string, queryIdentifier: TQueryKeyIdentifier) => {
    return [resource, queryIdentifier] as const
}

const createAllBaseQueryKeys = (resource: string) => {
    return [
        createBaseQueryKey(resource, 'getOne'),
        createBaseQueryKey(resource, 'getMany'),
        createBaseQueryKey(resource, 'getList')
    ] as const
}

const createGetOneQueryKey = (resource: string, params: TGetOneParams) => {
    return [...createBaseQueryKey(resource, 'getOne'), params] as const
}

const createGetManyQueryKey = (resource: string, params: TGetManyParams) => {
    return [...createBaseQueryKey(resource, 'getMany'), params] as const
}

const createGetListQueryKey = (resource: string, params: TGetListParams) => {
    return [...createBaseQueryKey(resource, 'getList'), params] as const
}

export {
    createAllBaseQueryKeys,
    createBaseQueryKey,
    createGetListQueryKey,
    createGetManyQueryKey,
    createGetOneQueryKey
}
