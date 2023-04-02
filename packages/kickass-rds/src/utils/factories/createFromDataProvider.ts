/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type {
    IDataService,
    IGenericDataProvider,
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
 * Create DataService from dataProvider instance.
 *
 * @beta This utility is still in beta and might change in future.
 * @param dataProvider - dataProvider instance
 * @returns dataService
 */
const createFromDataProvider = (dataProvider: IGenericDataProvider): IDataService => {
    if (typeof dataProvider == 'function') {
        throw new TypeError(
            'Invalid dataProvider, looks like you passed the constructor/function instead of dataProvider instance'
        )
    }

    if (!dataProvider || typeof dataProvider !== 'object' || Array.isArray(dataProvider)) {
        throw new Error('Invalid dataProvider, make sure you passed the dataProvider instance')
    }

    class DataServiceFromDataProvider implements IDataService {
        private extractData<T>(payload: { data?: T }): T {
            if (!payload?.data) {
                throw new Error('dataProvider returned invalid response, data property is missing')
            }

            return payload.data
        }

        private async extractDataPromise<T>(promise: Promise<{ data: T }>): Promise<T> {
            const payload = await promise

            return this.extractData(payload)
        }

        getOne<T extends TBaseResponse>(
            resource: string,
            parameters: TGetOneParameters,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            context?: TQueryContext | undefined
        ): Promise<T> {
            return this.extractDataPromise(dataProvider.getOne(resource, parameters))
        }
        async getMany<T extends TBaseResponse>(
            resource: string,
            parameters: TGetManyParameters,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            context?: TQueryContext | undefined
        ): Promise<T[]> {
            if (typeof dataProvider.getMany === 'function') {
                return this.extractDataPromise(dataProvider.getMany(resource, parameters))
            }

            const results = await Promise.all(parameters.ids.map(id => this.getOne<T>(resource, { id })))

            return results
        }
        getList<T extends TBaseResponse>(
            resource: string,
            parameters?: TGetListParameters | undefined,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            context?: TQueryContext | undefined
        ): Promise<TGetListResponse<T[]>> {
            return dataProvider.getList(resource, {
                pagination: parameters?.pagination,
                sort: parameters?.sort?.[0], // dataProvider supports single sort property
                filter: parameters?.filter
            })
        }
        createOne<T extends TBaseResponse>(resource: string, parameters: TCreateOneParameters): Promise<T> {
            return this.extractDataPromise(dataProvider.create(resource, { data: parameters.payload }))
        }
        async createMany<T extends TBaseResponse>(resource: string, parameters: TCreateManyParameters): Promise<T[]> {
            const results = await Promise.all(
                parameters.payload.map(payload => this.createOne<T>(resource, { payload }))
            )

            return results
        }
        updateOne<T extends TBaseResponse>(resource: string, parameters: TUpdateOneParameters): Promise<T> {
            return this.extractDataPromise(
                dataProvider.update(resource, { id: parameters.id, data: parameters.payload })
            )
        }
        async updateMany<T extends TBaseResponse>(resource: string, parameters: TUpdateManyParameters): Promise<T[]> {
            // we use updateOne implementation because dataProvider expects the same payload for all resources
            // that are updated and DataService supports different payloads for each resource
            const results = await Promise.all(
                parameters.ids.map((id, index) =>
                    this.updateOne<T>(resource, { id, payload: parameters.payload[index] })
                )
            )

            return results
        }
        deleteOne<T extends Partial<TBaseResponse>>(resource: string, parameters: TDeleteOneParameters): Promise<T> {
            return this.extractDataPromise(dataProvider.delete(resource, parameters))
        }
        async deleteMany<T extends Partial<TBaseResponse>>(
            resource: string,
            parameters: TDeleteManyParameters
        ): Promise<T[]> {
            if (typeof dataProvider.deleteMany === 'function') {
                const data = await this.extractDataPromise<TBaseResponse['id'][]>(
                    dataProvider.deleteMany(resource, parameters)
                )

                return data.map(item => ({ id: item } as T))
            }

            const results = await Promise.all(parameters.ids.map(id => this.deleteOne<T>(resource, { id })))

            return results
        }
    }

    return new DataServiceFromDataProvider()
}

export { createFromDataProvider }
