import {
    IDataService,
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
        } else if (typeof window !== 'undefined') {
            this.fetch = window.fetch
        } else {
            throw new Error('fetch instance is required in non browser environments')
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
        params: TGetOneParams,
        context?: TQueryContext | undefined
    ): Promise<T> {
        if (!this.isValidId(params.id)) {
            throw new Error('Invalid params.id')
        }

        const response = await this.fetch(`${this.baseUrl}/${resource}/${params.id}`, {
            headers: this.jsonHeaders
        })
        const result = await response.json()

        return result
    }
    async getMany<T extends TBaseResponse>(
        resource: string,
        params: TGetManyParams,
        context?: TQueryContext | undefined
    ): Promise<T[]> {
        const results = await Promise.all(params.ids.map(id => this.getOne<T>(resource, { id })))

        return results
    }
    async getList<T extends TBaseResponse>(
        resource: string,
        params?: TGetListParams,
        context?: TQueryContext | undefined
    ): Promise<TGetListResponse<T[]>> {
        const url = new URL(`${this.baseUrl}/${resource}`)

        if (params?.pagination?.page) {
            const skip = params?.pagination?.perPage ? (params.pagination.page - 1) * params.pagination.perPage : 0
            url.searchParams.append('skip', skip.toString())
        } else {
            if (params?.pagination?.nextCursor) {
                url.searchParams.append('cursor', params.pagination.nextCursor.toString())
            }
        }

        if (params?.pagination?.perPage) {
            url.searchParams.append('take', params.pagination.perPage.toString())
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
    async createOne<T extends TBaseResponse>(resource: string, params: TCreateOneParams): Promise<T> {
        const response = await this.fetch(`${this.baseUrl}/${resource}`, {
            method: 'POST',
            headers: this.jsonHeaders,
            body: JSON.stringify(params.payload)
        })
        const result = await response.json()

        return result
    }
    async createMany<T extends TBaseResponse>(resource: string, params: TCreateManyParams): Promise<T[]> {
        const results = await Promise.all(params.payload.map(payload => this.createOne<T>(resource, { payload })))

        return results
    }
    async updateOne<T extends TBaseResponse>(resource: string, params: TUpdateOneParams): Promise<T> {
        if (!this.isValidId(params.id)) {
            throw new Error('Invalid params.id')
        }

        const response = await this.fetch(`${this.baseUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            headers: this.jsonHeaders,
            body: JSON.stringify(params.payload)
        })
        const result = await response.json()

        return result
    }
    async updateMany<T extends TBaseResponse>(resource: string, params: TUpdateManyParams): Promise<T[]> {
        const results = await Promise.all(
            params.ids.map((id, index) => this.updateOne<T>(resource, { id, payload: params.payload[index] }))
        )

        return results
    }
    async deleteOne<T extends Partial<TBaseResponse>>(resource: string, params: TDeleteOneParams): Promise<T> {
        if (!this.isValidId(params.id)) {
            throw new Error('Invalid params.id')
        }

        const response = await this.fetch(`${this.baseUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
            headers: this.jsonHeaders
        })
        let result

        try {
            result = await response.json()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.message === 'Unexpected end of JSON input') {
                result = { id: params.id }
            } else {
                /* istanbul ignore next - no need to test this case as it is generic catch call */
                throw error
            }
        }

        return result
    }
    async deleteMany<T extends Partial<TBaseResponse>>(resource: string, params: TDeleteManyParams): Promise<T[]> {
        const results = await Promise.all(params.ids.map(id => this.deleteOne<T>(resource, { id })))

        return results
    }
}

export { RestDataService }
