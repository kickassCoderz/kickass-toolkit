/* eslint-disable func-names */
import { act, renderHook } from '@testing-library/react'

import { useStorageState } from './useStorageState'

class StorageMock implements Storage {
    length = 0
    store: Record<string, string> = {}

    key(index: number): string | null {
        return 'test'
    }

    clear() {
        this.store = {}
    }

    getItem(key: string): string | null {
        return this.store[key] || null
    }

    setItem(key: string, value: string) {
        this.store[key] = value
    }

    removeItem(key: string) {
        delete this.store[key]
    }
}

const storageMock = new StorageMock()
const storageMock2 = new StorageMock()
const spyGetItem = jest.spyOn(storageMock, 'getItem')
const spyGetItem2 = jest.spyOn(storageMock2, 'getItem')
const spySetItem = jest.spyOn(storageMock, 'setItem')

const useTestStorageState = (key: string, initialState: string | null | (() => string | null) = null) =>
    useStorageState(key, storageMock, initialState)

describe('useStorageState', () => {
    afterEach(() => {
        storageMock.clear()
        storageMock2.clear()
        spyGetItem.mockClear()
        spyGetItem2.mockClear()
        spySetItem.mockClear()
    })

    it('should be defined', () => {
        expect(useStorageState).toBeDefined()
    })

    it('should render', () => {
        const { result } = renderHook(() => useTestStorageState('sausage'))
        const value = result.current[0]

        expect(value).toBeNull()
        expect(spyGetItem).toHaveBeenCalledWith('sausage')
        expect(spyGetItem).toHaveBeenCalledTimes(1)
    })

    it('should render when no storage is available', () => {
        const { result } = renderHook(() => useStorageState('sausage', undefined as unknown as Storage))
        const value = result.current[0]

        expect(value).toBeNull()
    })

    it('should set value', () => {
        const { result, rerender } = renderHook(() => useTestStorageState('sausage'))
        let value = result.current[0]
        const setValue = result.current[1]

        expect(value).toBeNull()

        act(() => {
            setValue('DDDD')
        })

        rerender()
        value = result.current[0]

        expect(value).toBe('DDDD')
        expect(spyGetItem).toHaveBeenCalledTimes(1)
        expect(spySetItem).toHaveBeenCalledWith('sausage', 'DDDD')
        expect(spySetItem).toHaveBeenCalledTimes(1)
        expect(storageMock.getItem('sausage')).toBe('DDDD')
    })

    it('should set value through setter', () => {
        const { result, rerender } = renderHook(() => useTestStorageState('sausage'))
        let value = result.current[0]
        const setValue = result.current[1]

        expect(value).toBeNull()

        act(() => {
            setValue(current => (current ? current + 'D' : 'D'))
        })
        rerender()
        value = result.current[0]

        expect(value).toBe('D')

        act(() => {
            setValue(current => (current ? current + 'D' : 'D'))
        })
        rerender()
        value = result.current[0]

        expect(value).toBe('DD')
    })

    it('should return initial value', () => {
        const { result } = renderHook(() => useTestStorageState('sausage', 'DDDD'))
        const value = result.current[0]

        expect(value).toBe('DDDD')
    })

    it('should update value after key change', () => {
        storageMock.setItem('sausage', 'DDDDD')
        storageMock.setItem('cake', 'BBBBB')

        const { result, rerender } = renderHook(({ key }) => useTestStorageState(key), {
            initialProps: { key: 'sausage' }
        })
        let value = result.current[0]

        expect(value).toBe('DDDDD')

        rerender({ key: 'cake' })
        value = result.current[0]
        expect(value).toBe('BBBBB')
        expect(spyGetItem).toHaveBeenCalledTimes(2)
    })

    it('should update value after storage change', () => {
        storageMock.setItem('sausage', 'DDDDD')
        storageMock2.setItem('sausage', 'DD')

        const { result, rerender } = renderHook(({ storage }) => useStorageState('sausage', storage), {
            initialProps: { storage: storageMock }
        })
        let value = result.current[0]

        expect(value).toBe('DDDDD')

        rerender({ storage: storageMock2 })
        value = result.current[0]
        expect(value).toBe('DD')
        expect(spyGetItem).toHaveBeenCalledTimes(1)
        expect(spyGetItem2).toHaveBeenCalledTimes(1)
    })
})
