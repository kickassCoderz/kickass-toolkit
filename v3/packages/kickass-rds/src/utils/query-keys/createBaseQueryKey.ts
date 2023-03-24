
import type { TGetListParams, TGetManyParams, TGetOneParams, TQueryKeyIdentifier } from "../../types"

function createBaseQueryKey (resource: string, queryIdentifier: TQueryKeyIdentifier)  {
    return [resource, queryIdentifier] as const
}

export {createBaseQueryKey}