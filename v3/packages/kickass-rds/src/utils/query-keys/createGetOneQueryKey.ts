import { TGetOneParams } from "../../types"
import { createBaseQueryKey } from "./createBaseQueryKey"

function createGetOneQueryKey (resource: string, params: TGetOneParams)  {
    return [...createBaseQueryKey(resource, 'getOne'), params] as const
}

export {createGetOneQueryKey}