import {
    IDataService,
    TBaseResponse,
    TCreateManyParameters,
    TCreateOneParameters,
    TDeleteManyParameters,
    TDeleteOneParameters,
    TGetListParameters,
    TGetListResponse,
    TGetManyParameters,
    TGetOneParameters,
    TQueryContext,
    TUpdateManyParameters,
    TUpdateOneParameters
} from '../../types'

/**
 * Create single DataService instance from multiple instances.
 *
 * Useful when you want consume multiple resources from different APIs.
 *
 * @beta This utility is still in beta and might change in future.
 * @param dataServiceMap - map of dataService instances per resources
 * @returns dataService - combined dataService instance
 */
const combineDataServices = (dataServiceMap: Record<string, IDataService>): IDataService => {
    const getDataServiceForResource = (resource: string) => {
        const dataService = dataServiceMap[resource]

        if (!dataService) {
            throw new Error(`Resource '${resource}' not supported`)
        }

        return dataService
    }

    class CombinedDataService implements IDataService {
        getOne<T extends TBaseResponse>(
            resource: string,
            parameters: TGetOneParameters,
            context?: TQueryContext | undefined
        ): Promise<T> {
            const dataService = getDataServiceForResource(resource)

            return dataService.getOne(resource, parameters, context)
        }
        getMany<T extends TBaseResponse>(
            resource: string,
            parameters: TGetManyParameters,
            context?: TQueryContext | undefined
        ): Promise<T[]> {
            const dataService = getDataServiceForResource(resource)

            return dataService.getMany(resource, parameters, context)
        }
        getList<T extends TBaseResponse>(
            resource: string,
            parameters?: TGetListParameters | undefined,
            context?: TQueryContext | undefined
        ): Promise<TGetListResponse<T[]>> {
            const dataService = getDataServiceForResource(resource)

            return dataService.getList(resource, parameters, context)
        }
        createOne<T extends TBaseResponse>(resource: string, parameters: TCreateOneParameters): Promise<T> {
            const dataService = getDataServiceForResource(resource)

            return dataService.createOne(resource, parameters)
        }
        createMany<T extends TBaseResponse>(resource: string, parameters: TCreateManyParameters): Promise<T[]> {
            const dataService = getDataServiceForResource(resource)

            return dataService.createMany(resource, parameters)
        }
        updateOne<T extends TBaseResponse>(resource: string, parameters: TUpdateOneParameters): Promise<T> {
            const dataService = getDataServiceForResource(resource)

            return dataService.updateOne(resource, parameters)
        }
        updateMany<T extends TBaseResponse>(resource: string, parameters: TUpdateManyParameters): Promise<T[]> {
            const dataService = getDataServiceForResource(resource)

            return dataService.updateMany(resource, parameters)
        }
        deleteOne<T extends Partial<TBaseResponse>>(resource: string, parameters: TDeleteOneParameters): Promise<T> {
            const dataService = getDataServiceForResource(resource)

            return dataService.deleteOne(resource, parameters)
        }
        deleteMany<T extends Partial<TBaseResponse>>(
            resource: string,
            parameters: TDeleteManyParameters
        ): Promise<T[]> {
            const dataService = getDataServiceForResource(resource)

            return dataService.deleteMany(resource, parameters)
        }
    }

    return new CombinedDataService()
}

export { combineDataServices }
