import {
    IDataService,
    TBaseResponse,
    TCreateManyParameters as TCreateManyParameters,
    TCreateOneParameters as TCreateOneParameters,
    TDeleteManyParameters as TDeleteManyParameters,
    TDeleteOneParameters as TDeleteOneParameters,
    TGetListParameters as TGetListParameters,
    TGetListResponse,
    TGetManyParameters as TGetManyParameters,
    TGetOneParameters as TGetOneParameters,
    TQueryContext,
    TUpdateManyParameters as TUpdateManyParameters,
    TUpdateOneParameters as TUpdateOneParameters
} from '../../types'

class RestDataService implements IDataService {
    readonly fetch: typeof fetch

    readonly baseUrl: string

    private readonly jsonHeaders = {
        'content-type': 'application/json',
        accept: 'application/json'
    }

    constructor(baseUrl: string, fetchInstance?: typeof fetch) {
        this.baseUrl = baseUrl

        if (fetchInstance) {
            this.fetch = fetchInstance
        } else if (typeof window === 'undefined') {
            throw new TypeError('fetch instance is required in non browser environments')
        } else {
            this.fetch = window.fetch
        }
    }

    private isValidId(value: string | number) {
        if (typeof value === 'number') {
            return true
        }

        if (typeof value === 'string') {
            return !value.includes('/')
        }

        return false
    }

    async getOne<T extends TBaseResponse>(
        resource: string,
        parameters: TGetOneParameters,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        context?: TQueryContext | undefined
    ): Promise<T> {
        if (!this.isValidId(parameters.id)) {
            throw new Error('Invalid params.id')
        }

        const response = await this.fetch(`${this.baseUrl}/${resource}/${parameters.id}`, {
            headers: this.jsonHeaders
        })
        const result = (await response.json()) as T

        return result
    }
    async getMany<T extends TBaseResponse>(
        resource: string,
        parameters: TGetManyParameters,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        context?: TQueryContext | undefined
    ): Promise<T[]> {
        const results = await Promise.all(parameters.ids.map(id => this.getOne<T>(resource, { id })))

        return results
    }
    async getList<T extends TBaseResponse>(
        resource: string,
        parameters?: TGetListParameters,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        context?: TQueryContext | undefined
    ): Promise<TGetListResponse<T[]>> {
        const url = new URL(`${this.baseUrl}/${resource}`)

        if (parameters?.pagination?.page) {
            const skip = parameters?.pagination?.perPage
                ? (parameters.pagination.page - 1) * parameters.pagination.perPage
                : 0
            url.searchParams.append('skip', skip.toString())
        } else {
            if (parameters?.pagination?.nextCursor) {
                url.searchParams.append('cursor', parameters.pagination.nextCursor.toString())
            }
        }

        if (parameters?.pagination?.perPage) {
            url.searchParams.append('take', parameters.pagination.perPage.toString())
        }

        const response = await this.fetch(url.toString(), {
            headers: this.jsonHeaders
        })
        const result = (await response.json()) as T[]

        return {
            data: result,
            total: result.length
        }
    }
    async createOne<T extends TBaseResponse>(resource: string, parameters: TCreateOneParameters): Promise<T> {
        const response = await this.fetch(`${this.baseUrl}/${resource}`, {
            method: 'POST',
            headers: this.jsonHeaders,
            body: JSON.stringify(parameters.payload)
        })
        const result = (await response.json()) as T

        return result
    }
    async createMany<T extends TBaseResponse>(resource: string, parameters: TCreateManyParameters): Promise<T[]> {
        const results = await Promise.all(parameters.payload.map(payload => this.createOne<T>(resource, { payload })))

        return results
    }
    async updateOne<T extends TBaseResponse>(resource: string, parameters: TUpdateOneParameters): Promise<T> {
        if (!this.isValidId(parameters.id)) {
            throw new Error('Invalid params.id')
        }

        const response = await this.fetch(`${this.baseUrl}/${resource}/${parameters.id}`, {
            method: 'PUT',
            headers: this.jsonHeaders,
            body: JSON.stringify(parameters.payload)
        })
        const result = (await response.json()) as T

        return result
    }
    async updateMany<T extends TBaseResponse>(resource: string, parameters: TUpdateManyParameters): Promise<T[]> {
        const results = await Promise.all(
            parameters.ids.map((id, index) => this.updateOne<T>(resource, { id, payload: parameters.payload[index] }))
        )

        return results
    }
    async deleteOne<T extends Partial<TBaseResponse>>(resource: string, parameters: TDeleteOneParameters): Promise<T> {
        if (!this.isValidId(parameters.id)) {
            throw new Error('Invalid params.id')
        }

        const response = await this.fetch(`${this.baseUrl}/${resource}/${parameters.id}`, {
            method: 'DELETE',
            headers: this.jsonHeaders
        })
        let result

        try {
            result = (await response.json()) as T
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if ((error as Error).message === 'Unexpected end of JSON input') {
                result = { id: parameters.id } as T
            } else {
                /* istanbul ignore next - no need to test this case as it is generic catch call */
                throw error
            }
        }

        return result
    }
    async deleteMany<T extends Partial<TBaseResponse>>(
        resource: string,
        parameters: TDeleteManyParameters
    ): Promise<T[]> {
        const results = await Promise.all(parameters.ids.map(id => this.deleteOne<T>(resource, { id })))

        return results
    }
}

export { RestDataService }
