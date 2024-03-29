import type {
    QueryClient,
    QueryKey as TQueryKey,
    QueryMeta as TQueryMeta,
    UseMutationOptions as TUseMutationOptions,
    UseMutationResult as TUseMutationResult,
    UseQueryOptions as TUseQueryOptions,
    UseQueryResult as TUseQueryResult
} from '@tanstack/react-query'

export enum ESortOrder {
    Asc = 'asc',
    Desc = 'desc'
}

export type TSort = {
    field: string
    order: ESortOrder
}

export type TOffsetPagination = {
    page?: number
    perPage?: number
}

export type TCursorPagination = {
    perPage?: number
    nextCursor?: string | number
    previousCursor?: string | number
}

export type TPagination = TOffsetPagination & TCursorPagination

export type TFilterValueSingle = string | number | boolean

export type TFilterValueList = string[] | number[] | boolean[]

export type TFilter = {
    operator?: string
    field: string
    value: TFilterValueSingle | TFilterValueList //string | number
}

export type TQueryContext = {
    meta?: TQueryMeta
    signal?: AbortSignal
}

export type TGetOneParameters = {
    id: string | number
}

export type TGetManyParameters = {
    ids: string[] | number[]
}

export type TGetListParameters = {
    pagination?: TPagination
    sort?: TSort[]
    filter?: TFilter[]
}

export type TCreateOneParameters = {
    payload: Record<string, unknown>
}

export type TCreateManyParameters = {
    payload: Record<string, unknown>[]
}

export type TUpdateOneParameters = {
    id: string | number
    payload: Record<string, unknown>
}

export type TUpdateManyParameters = {
    ids: string[] | number[]
    payload: Record<string, unknown>[]
}

export type TDeleteOneParameters = {
    id: string | number
    payload?: Record<string, unknown>
}

export type TDeleteManyParameters = {
    ids: string[] | number[]
    payload?: Record<string, unknown>
}

export type TBaseResponse = {
    id: string | number
    [key: string]: unknown
}

export type TGetListResponse<T> = {
    data: T
    total: number
}

export interface IDataService {
    getOne<T extends TBaseResponse>(
        resource: string,
        parameters: TGetOneParameters,
        context?: TQueryContext
    ): Promise<T>
    getMany<T extends TBaseResponse>(
        resource: string,
        parameters: TGetManyParameters,
        context?: TQueryContext
    ): Promise<T[]>
    getList<T extends TBaseResponse>(
        resource: string,
        parameters?: TGetListParameters,
        context?: TQueryContext
    ): Promise<TGetListResponse<T[]>>
    createOne<T extends TBaseResponse>(resource: string, parameters: TCreateOneParameters): Promise<T>
    createMany<T extends TBaseResponse>(resource: string, parameters: TCreateManyParameters): Promise<T[]>
    updateOne<T extends TBaseResponse>(resource: string, parameters: TUpdateOneParameters): Promise<T>
    updateMany<T extends TBaseResponse>(resource: string, parameters: TUpdateManyParameters): Promise<T[]>
    deleteOne<T extends Partial<TBaseResponse>>(resource: string, parameters: TDeleteOneParameters): Promise<T>
    deleteMany<T extends Partial<TBaseResponse>>(resource: string, parameters: TDeleteManyParameters): Promise<T[]>
}

export interface IDataServiceProvider {
    children?: React.ReactNode
    dataService?: IDataService
    queryClient?: QueryClient
}

//QUERY KEYS
export type TQueryKeyIdentifier = 'getOne' | 'getMany' | 'getList'

//HOOKS
export type TQueryOptions<TData, TError> = Omit<
    TUseQueryOptions<TData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn' | 'initialData'
> & {
    initialData?: () => undefined
}

export type TUseGetOneVariables = {
    resource: string
    params: TGetOneParameters
}

export type TUseGetOneResult<TData, TError> = TUseQueryResult<TData, TError>

export type TUseGetManyVariables = {
    resource: string
    params: TGetManyParameters
}

export type TUseGetManyResult<TData, TError> = TUseQueryResult<TData, TError>

export type TUseGetListVariables = {
    resource: string
    params?: TGetListParameters
}

export type TUseGetListResult<TData, TError> = TUseQueryResult<TGetListResponse<TData>, TError>

export type TUseCreateOneVariables = {
    resource: string
}

export type TUseCreateOnePayload<T extends Record<string, unknown>> = {
    payload: T
}

export type TUseCreateOneResult<TData, TError, TPayload, TContext> = TUseMutationResult<
    TData,
    TError,
    TPayload,
    TContext
>

export type TMutationOptions<TData, TError, TVariables = unknown, TContext = unknown> = Omit<
    TUseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationFn'
>

export type TUseCreateManyVariables = {
    resource: string
}

export type TUseCreateManyPayload<T extends Record<string, unknown>> = {
    payload: T[]
}

export type TUseCreateManyResult<TData, TError, TPayload, TContext> = TUseMutationResult<
    TData,
    TError,
    TPayload,
    TContext
>

export type TUseUpdateOneVariables = {
    resource: string
}

export type TUseUpdateOnePayload<T extends Record<string, unknown>> = {
    id: string | number
    payload: T
}

export type TUseUpdateOneResult<TData, TError, TPayload, TContext> = TUseMutationResult<
    TData,
    TError,
    TPayload,
    TContext
>

export type TUseUpdateManyVariables = {
    resource: string
}

export type TUseUpdateManyPayload<T extends Record<string, unknown>> = {
    ids: string[] | number[]
    payload: T[]
}

export type TUseUpdateManyResult<TData, TError, TPayload, TContext> = TUseMutationResult<
    TData,
    TError,
    TPayload,
    TContext
>

export type TUseDeleteOneVariables = {
    resource: string
}

export type TUseDeleteOnePayload<T extends Record<string, unknown>> = {
    id: string | number
    payload?: T
}

export type TUseDeleteOneResult<TData, TError, TPayload, TContext> = TUseMutationResult<
    TData,
    TError,
    TPayload,
    TContext
>

export type TUseDeleteManyVariables = {
    resource: string
}

export type TUseDeleteManyPayload<T extends Record<string, unknown>> = {
    ids: string[] | number[]
    payload?: T
}

export type TUseDeleteManyResult<TData, TError, TPayload, TContext> = TUseMutationResult<
    TData,
    TError,
    TPayload,
    TContext
>

export interface IGenericDataProvider {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    getOne(resource: string, parameters: any): Promise<any>
    getMany?(resource: string, parameters: any): Promise<any>
    getList(resource: string, parameters?: any): Promise<any>
    create(resource: string, parameters: any): Promise<any>
    update(resource: string, parameters: any): Promise<any>
    updateMany?(resource: string, parameters: any): Promise<any>
    delete(resource: string, parameters: any): Promise<any>
    deleteMany?(resource: string, parameters: any): Promise<any>
    /* eslint-enable @typescript-eslint/no-explicit-any */
}
