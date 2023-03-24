import { TGetManyParams } from "../../types";
import { createBaseQueryKey } from "./createBaseQueryKey";

function createGetManyQueryKey  (resource: string, params: TGetManyParams)  {
    return [...createBaseQueryKey(resource, 'getMany'), params] as const
}

export {createGetManyQueryKey}