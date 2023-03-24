import fakeDataProvider from 'ra-data-fakerest'

import { ESortOrder, IGenericDataProvider } from '../../types'
import { createFromDataProvider } from './createFromDataProvider'

describe('createFromDataProvider', () => {
    it('should be defined', () => {
        expect(createFromDataProvider).toBeDefined()
    })

    it('should create a valid DataService', () => {
        const dataProvider = fakeDataProvider({
            beers: [
                { id: 1, title: 'Žuja' },
                { id: 2, title: 'Pan' },
                { id: 3, title: 'Laško' }
            ]
        })

        const dataService = createFromDataProvider(dataProvider)

        expect(dataService).toHaveProperty('getOne')
        expect(dataService).toHaveProperty('getList')
        expect(dataService).toHaveProperty('getMany')
        expect(dataService).toHaveProperty('createOne')
        expect(dataService).toHaveProperty('createMany')
        expect(dataService).toHaveProperty('updateOne')
        expect(dataService).toHaveProperty('updateMany')
        expect(dataService).toHaveProperty('deleteOne')
        expect(dataService).toHaveProperty('deleteMany')
    })

    it('should throw if constructor or function is passed', () => {
        const createDataProvider = jest.fn()

        expect(() => {
            createFromDataProvider(createDataProvider as never)
        }).toThrow(
            'Invalid dataProvider, looks like you passed the constructor/function instead of dataProvider instance'
        )

        class TestDataProvider {}

        expect(() => {
            createFromDataProvider(TestDataProvider as never)
        }).toThrow(
            'Invalid dataProvider, looks like you passed the constructor/function instead of dataProvider instance'
        )
    })

    it('should throw if non object is passed', () => {
        expect(() => {
            createFromDataProvider(undefined as never)
        }).toThrow('Invalid dataProvider, make sure you passed the dataProvider instance')

        expect(() => {
            createFromDataProvider([] as never)
        }).toThrow('Invalid dataProvider, make sure you passed the dataProvider instance')

        expect(() => {
            createFromDataProvider(null as never)
        }).toThrow('Invalid dataProvider, make sure you passed the dataProvider instance')
    })

    it('should polyfill Many methods if dataProvider does not implement them', async () => {
        const dataProvider: IGenericDataProvider = fakeDataProvider({
            beers: [
                { id: 1, title: 'Žuja' },
                { id: 2, title: 'Pan' },
                { id: 3, title: 'Laško' }
            ]
        })
        delete dataProvider.getMany
        delete dataProvider.updateMany
        delete dataProvider.deleteMany

        const dataService = createFromDataProvider(dataProvider)

        expect(
            await dataService.createMany('beers', {
                payload: [{ title: 'Karlovačko' }, { title: 'Grička' }]
            })
        ).toMatchObject([
            { id: 4, title: 'Karlovačko' },
            { id: 5, title: 'Grička' }
        ])
        expect(await dataService.getMany('beers', { ids: [1, 2] })).toMatchObject([
            { id: 1, title: 'Žuja' },
            { id: 2, title: 'Pan' }
        ])
        expect(
            await dataService.updateMany('beers', {
                ids: [1, 2],
                payload: [
                    { id: 1, title: 'Žuja' },
                    { id: 2, title: 'Pan' }
                ]
            })
        ).toMatchObject([
            { id: 1, title: 'Žuja' },
            { id: 2, title: 'Pan' }
        ])
        expect(
            await dataService.deleteMany('beers', {
                ids: [1, 2]
            })
        ).toMatchObject([{ id: 1 }, { id: 2 }])
    })

    it('should use Many methods if dataProvider does implement them', async () => {
        const dataProvider = fakeDataProvider({
            beers: [
                { id: 1, title: 'Žuja' },
                { id: 2, title: 'Pan' },
                { id: 3, title: 'Laško' }
            ]
        })

        const dataService = createFromDataProvider(dataProvider)
        const getManySpy = jest.spyOn(dataProvider, 'getMany')
        const updateManySpy = jest.spyOn(dataProvider, 'updateMany')
        const deleteManySpy = jest.spyOn(dataProvider, 'deleteMany')

        await dataService.getMany('beers', { ids: [1, 2] })
        await dataService.updateMany('beers', {
            ids: [1, 2],
            payload: [
                { id: 1, title: 'Beer 1' },
                { id: 2, title: 'Beer 2' }
            ]
        })
        await dataService.deleteMany('beers', { ids: [1, 2] })

        expect(getManySpy).toHaveBeenCalledTimes(1)
        expect(updateManySpy).toHaveBeenCalledTimes(0) // updateMany is always polyfilled
        expect(deleteManySpy).toHaveBeenCalledTimes(1)
    })

    it('should pass resource and params to dataProvider', async () => {
        const dataProvider = fakeDataProvider({
            beers: [
                { id: 1, title: 'Žuja' },
                { id: 2, title: 'Pan' },
                { id: 3, title: 'Laško' }
            ]
        })
        const dataProviderSpy = Object.keys(dataProvider).reduce((acc, key) => {
            acc[key] = jest.spyOn(dataProvider, key)

            return acc
        }, {} as typeof dataProvider)

        const dataService = createFromDataProvider(dataProvider)

        await dataService.getOne('beers', { id: 1 })
        await dataService.getMany('beers', { ids: [1, 2] })
        await dataService.getList('beers', {
            pagination: {
                page: 1,
                perPage: 20
            },
            sort: [{ field: 'test', order: ESortOrder.Asc }]
        })
        await dataService.createOne('beers', { payload: { title: 'test' } })
        await dataService.createMany('beers', { payload: [{ title: 'test' }, { title: 'test 2' }] })
        await dataService.updateOne('beers', { id: 1, payload: { title: 'test updated' } })
        await dataService.updateMany('beers', {
            ids: [1, 2],
            payload: [{ title: 'test updated' }, { title: 'test updated 2' }]
        })
        await dataService.deleteOne('beers', { id: 1 })
        await dataService.deleteMany('beers', { ids: [2, 3] })

        expect(dataProviderSpy.getOne).toHaveBeenCalledWith('beers', { id: 1 })
        expect(dataProviderSpy.getMany).toHaveBeenCalledWith('beers', { ids: [1, 2] })
        expect(dataProviderSpy.getList).toHaveBeenCalledWith('beers', {
            pagination: {
                page: 1,
                perPage: 20
            },
            sort: { field: 'test', order: ESortOrder.Asc }
        })
        expect(dataProviderSpy.create).toHaveBeenCalledWith('beers', { data: { title: 'test' } })
        expect(dataProviderSpy.create).toHaveBeenCalledWith('beers', { data: { title: 'test 2' } })
        expect(dataProviderSpy.create).toHaveBeenCalledTimes(3)
        expect(dataProviderSpy.update).toHaveBeenCalledWith('beers', { id: 1, data: { title: 'test updated' } })
        expect(dataProviderSpy.update).toHaveBeenCalledWith('beers', { id: 2, data: { title: 'test updated 2' } })
        expect(dataProviderSpy.updateMany).toHaveBeenCalledTimes(0) // we do not use updateMany from dataProvider
        expect(dataProviderSpy.update).toHaveBeenCalledTimes(3)
        expect(dataProviderSpy.delete).toHaveBeenCalledWith('beers', { id: 1 })
        expect(dataProviderSpy.deleteMany).toHaveBeenCalledWith('beers', { ids: [2, 3] })
    })

    it('should throw if data property is not returned', async () => {
        const dataProvider = {
            getOne: () => ({ test: 1 })
        }

        const dataService = createFromDataProvider(dataProvider as never)

        await expect(async () => {
            await dataService.getOne('beers', { id: 1 })
        }).rejects.toThrow('dataProvider returned invalid response, data property is missing')
    })
})
