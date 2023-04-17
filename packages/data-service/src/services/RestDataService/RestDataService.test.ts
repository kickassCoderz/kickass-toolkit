import { BEERS_MOCK_DATA, MOCK_API_BASE_URL } from '../../__fixtures__'
import { RestDataService } from './RestDataService'

describe('RestDataService', () => {
    const dataService = new RestDataService(MOCK_API_BASE_URL)

    it('should be defined', () => {
        expect(RestDataService).toBeDefined()
    })

    it('should getOne', async () => {
        const result = await dataService.getOne('beers', { id: BEERS_MOCK_DATA[0].id })

        expect(result).toBeDefined()

        expect(result).toMatchObject(BEERS_MOCK_DATA[0])
    })

    it('getOne should throw on id containing slashes', async () => {
        await expect(dataService.getOne('beers', { id: '/id/1' })).rejects.toThrow()
    })

    it('should getMany', async () => {
        const result = await dataService.getMany('beers', { ids: [BEERS_MOCK_DATA[0].id, BEERS_MOCK_DATA[1].id] })

        expect(result).toBeDefined()

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining(BEERS_MOCK_DATA[0]),
                expect.objectContaining(BEERS_MOCK_DATA[1])
            ])
        )
    })

    it('should getList', async () => {
        const result = await dataService.getList('beers')

        expect(result).toBeDefined()

        expect(result).toMatchObject({
            data: BEERS_MOCK_DATA,
            total: 4
        })
    })

    it('should getList with page pagination', async () => {
        const result = await dataService.getList('beers')
        const result2 = await dataService.getList('beers', {
            pagination: {
                page: 2
            }
        })
        const result3 = await dataService.getList('beers', {
            pagination: {
                page: 1,
                perPage: 2
            }
        })

        expect(result).toBeDefined()

        expect(result2).toBeDefined()

        expect(result3).toBeDefined()

        expect(result).toMatchObject({
            data: BEERS_MOCK_DATA,
            total: 4
        })
        expect(result2).toMatchObject({
            data: BEERS_MOCK_DATA,
            total: 4
        })
        expect(result3).toMatchObject({
            data: [BEERS_MOCK_DATA[0], BEERS_MOCK_DATA[1]],
            total: 2
        })
    })

    it('should getList with cursor pagination', async () => {
        const result = await dataService.getList('beers')
        const result2 = await dataService.getList('beers', {
            pagination: {
                nextCursor: BEERS_MOCK_DATA[1].id
            }
        })
        const result3 = await dataService.getList('beers', {
            pagination: {
                nextCursor: BEERS_MOCK_DATA[1].id,
                perPage: 1
            }
        })

        expect(result).toBeDefined()

        expect(result2).toBeDefined()

        expect(result3).toBeDefined()

        expect(result).toMatchObject({
            data: BEERS_MOCK_DATA,
            total: 4
        })
        expect(result2).toMatchObject({
            data: [BEERS_MOCK_DATA[2], BEERS_MOCK_DATA[3]],
            total: 2
        })
        expect(result3).toMatchObject({
            data: [BEERS_MOCK_DATA[2]],
            total: 1
        })
    })

    it('should createOne', async () => {
        const payload = { name: 'Vukovarsko' }

        const result = await dataService.createOne('beers', { payload })

        expect(result).toBeDefined()

        expect(result).toEqual(expect.objectContaining(payload))

        expect(result.id).toBeDefined()
    })

    it('should createMany', async () => {
        const payload = [{ name: 'Vukovarsko' }, { name: 'Kozel' }]

        const result = await dataService.createMany('beers', { payload })

        expect(result).toBeDefined()

        expect(result).toMatchObject(payload)

        result.forEach(item => {
            expect(item.id).toBeDefined()
        })
    })

    it('should updateOne', async () => {
        const payload = { name: 'Imperial Stout' }

        const result = await dataService.updateOne('beers', {
            id: BEERS_MOCK_DATA[0].id,
            payload
        })

        expect(result).toBeDefined()

        expect(result).toEqual(
            expect.objectContaining({
                id: BEERS_MOCK_DATA[0].id,
                name: payload.name
            })
        )
    })

    it('updateOne should throw on id containing slashes', async () => {
        await expect(dataService.updateOne('beers', { id: '/id/1', payload: { name: 'Ožujsko' } })).rejects.toThrow()
    })

    it('should updateMany', async () => {
        const ids = [BEERS_MOCK_DATA[0].id, BEERS_MOCK_DATA[1].id]
        const payload = [{ name: 'Velebitsko' }, { name: 'Daruvarsko' }]

        const result = await dataService.updateMany('beers', {
            ids,
            payload
        })

        expect(result).toBeDefined()

        expect(result).toMatchObject(payload)

        result.forEach(item => {
            expect(item.id).toBeDefined()
        })
    })

    it('should deleteOne', async () => {
        const id = BEERS_MOCK_DATA[0].id

        const result = await dataService.deleteOne('beers', { id })

        expect(result).toBeDefined()

        expect(result).toMatchObject({
            id
        })
    })

    it('deleteOne should throw on id containing slashes', async () => {
        await expect(dataService.deleteOne('beers', { id: '/id/1' })).rejects.toThrow()
    })

    it('should deleteMany', async () => {
        const ids = [BEERS_MOCK_DATA[0].id, BEERS_MOCK_DATA[1].id]

        const result = await dataService.deleteMany('beers', { ids })

        expect(result).toBeDefined()

        expect(result).toMatchObject(ids.map(id => ({ id })))
    })

    it('should throw if id is invalid type', async () => {
        // force invalid id type for this test
        await expect(dataService.getOne('beers', { id: { id: 1 } as unknown as string })).rejects.toThrow()
    })
})
