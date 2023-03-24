import { TGetListParams } from "../../types";
import { createBaseQueryKey } from "./createBaseQueryKey";

function createGetListQueryKey  (resource: string, params: TGetListParams)  {
    return [...createBaseQueryKey(resource, 'getList'), params] as const
}

export {createGetListQueryKey}