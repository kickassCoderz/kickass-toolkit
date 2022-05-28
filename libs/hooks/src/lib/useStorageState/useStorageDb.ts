import type { SetStateAction } from 'react'
import { useMemo } from 'react'

import { useEvent } from '../useEvent'
import { useGlobalObject } from '../useGlobalObject'
import { useStorageState } from './useStorageState'

type UseStorageDb = Record<string, Array<UseStorageDbRecord>>

type UseStorageDbPrimaryKey = string | number

type UseStorageDbRecord = {
    id: UseStorageDbPrimaryKey
    [property: string]: unknown
}

type Params = {
    id: UseStorageDbPrimaryKey
    payload: UseStorageDbRecord
}

const useStorageDb = (key: string, storage: Storage) => {
    const [value, setValue] = useStorageState(key, storage)

    const db: Record<string, Array<UseStorageDbRecord>> = useMemo(() => {
        return value ? JSON.parse(value) : {}
    }, [value])

    const setDb = useEvent((valueOrSetter: SetStateAction<UseStorageDb>) => {
        const newValue = typeof valueOrSetter === 'function' ? valueOrSetter(db) : valueOrSetter

        setValue(JSON.stringify(newValue))
    })

    return useMemo(
        () => ({
            createOne: (resource: string, params: Params) => {
                setDb(current => ({
                    ...current,
                    [resource]: [
                        ...(current[resource] || []),
                        {
                            ...params.payload
                        }
                    ]
                }))
            },
            getList: (resource: string, params: Params) => db[resource] || [],
            getOne: (resource: string, params: Params) =>
                db[resource]?.find((item: UseStorageDbRecord) => item.id === params.id),
            updateOne: (resource: string, params: Params) => {
                setDb(current => ({
                    ...current,
                    [resource]: (current[resource] || []).map((itemToUpdate: UseStorageDbRecord) => {
                        if (itemToUpdate.id === params.id) {
                            return {
                                ...itemToUpdate,
                                ...params.payload,
                                id: itemToUpdate.id
                            }
                        }

                        return itemToUpdate
                    })
                }))
            },
            deleteOne: (resource: string, params: Params) => {
                setDb(current => ({
                    ...current,
                    [resource]: (current[resource] || []).filter((itemToUpdate: UseStorageDbRecord) => {
                        return itemToUpdate.id !== params.id
                    })
                }))
            }
        }),
        [db, setDb]
    )
}

const useLocalStorageDb = (key: string) => useStorageDb(key, useGlobalObject().localStorage)

const useSessionStorageDb = (key: string) => useStorageDb(key, useGlobalObject().sessionStorage)

export { useLocalStorageDb, useSessionStorageDb, useStorageDb }
