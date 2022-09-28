import {
    IDataService,
    IGenericDataProvider,
    TBaseResponse,
    TCreateManyParams,
    TCreateOneParams,
    TDeleteManyParams,
    TDeleteOneParams,
    TGetListParams,
    TGetListResponse,
    TGetManyParams,
    TGetOneParams,
    TQueryContext,
    TUpdateManyParams,
    TUpdateOneParams
} from './types'

/**
 * Create DataService from dataProvider instance.
 *
 * @param {IGenericDataProvider} dataProvider
 * @return {*}  {IDataService}
 */
const createFromDataProvider = (dataProvider: IGenericDataProvider): IDataService => {
    if (typeof dataProvider == 'function') {
        throw new Error(
            'Invalid dataProvider, looks like you passed the constructor/function instead of dataProvider instance'
        )
    }

    if (!dataProvider || typeof dataProvider !== 'object' || Array.isArray(dataProvider)) {
        throw new Error('Invalid dataProvider, make sure you passed the dataProvider instance')
    }

    class DataServiceFromDataProvider implements IDataService {
        getOne<T extends TBaseResponse>(
            resource: string,
            params: TGetOneParams,
            context?: TQueryContext | undefined
        ): Promise<T> {
            return dataProvider.getOne(resource, params)
        }
        async getMany<T extends TBaseResponse>(
            resource: string,
            params: TGetManyParams,
            context?: TQueryContext | undefined
        ): Promise<T[]> {
            if (typeof dataProvider.getMany === 'function') {
                return dataProvider.getMany(resource, params)
            }

            const results = await Promise.all(params.ids.map(id => this.getOne<T>(resource, { id })))

            return results
        }
        getList<T extends TBaseResponse>(
            resource: string,
            params?: TGetListParams | undefined,
            context?: TQueryContext | undefined
        ): Promise<TGetListResponse<T[]>> {
            return dataProvider.getList(resource, params)
        }
        createOne<T extends TBaseResponse>(resource: string, params: TCreateOneParams): Promise<T> {
            return dataProvider.create(resource, params)
        }
        async createMany<T extends TBaseResponse>(resource: string, params: TCreateManyParams): Promise<T[]> {
            const results = await Promise.all(params.payload.map(payload => this.createOne<T>(resource, { payload })))

            return results
        }
        updateOne<T extends TBaseResponse>(resource: string, params: TUpdateOneParams): Promise<T> {
            return dataProvider.update(resource, params)
        }
        async updateMany<T extends TBaseResponse>(resource: string, params: TUpdateManyParams): Promise<T[]> {
            if (typeof dataProvider.updateMany === 'function') {
                return dataProvider.updateMany(resource, params)
            }

            const results = await Promise.all(
                params.ids.map((id, index) => this.updateOne<T>(resource, { id, payload: params.payload[index] }))
            )

            return results
        }
        deleteOne<T extends Partial<TBaseResponse>>(resource: string, params: TDeleteOneParams): Promise<T> {
            return dataProvider.delete(resource, params)
        }
        async deleteMany<T extends Partial<TBaseResponse>>(resource: string, params: TDeleteManyParams): Promise<T[]> {
            if (typeof dataProvider.deleteMany === 'function') {
                return dataProvider.deleteMany(resource, params)
            }

            const results = await Promise.all(params.ids.map(id => this.deleteOne<T>(resource, { id })))

            return results
        }
    }

    return new DataServiceFromDataProvider()
}

export { createFromDataProvider }
