import { createServer, Response } from 'miragejs'

import { RestDataService } from './RestDataService'

describe('RestDataService', () => {
    let server: ReturnType<typeof createServer>

    beforeEach(() => {
        server = createServer({
            environment: 'test',
            urlPrefix: 'http://localhost'
        })
    })

    afterEach(() => {
        server.shutdown()
    })

    const dataService = new RestDataService('http://localhost/api')

    it('should be defined', () => {
        expect(RestDataService).toBeDefined()
    })

    it('should getOne', async () => {
        server.get('/api/beers/:id', () => {
            return { id: 1, name: 'Ožujsko' }
        })

        const result = await dataService.getOne('beers', { id: 1 })

        expect(result).toMatchObject({ id: 1, name: 'Ožujsko' })
    })

    it('getOne should throw on id containing slashes', async () => {
        server.get('/api/beers/:id', () => {
            return { id: 1, name: 'Ožujsko' }
        })

        expect(dataService.getOne('beers', { id: '/id/1' })).rejects.toThrowError()
    })

    it('should getMany', async () => {
        server.get('/api/beers/:id', (_, request) => {
            const beers = [
                { id: 1, name: 'Ožujsko' },
                { id: 2, name: 'Pan' }
            ]
            const beer = beers.find(item => item.id === +request.params['id'])

            if (!beer) {
                throw new Error('not found')
            }

            return beer
        })

        const result = await dataService.getMany('beers', { ids: [1, 2] })

        expect(result).toMatchObject([
            { id: 1, name: 'Ožujsko' },
            { id: 2, name: 'Pan' }
        ])
    })

    it('should getList', async () => {
        server.get('/api/beers', () => {
            return [
                { id: 1, name: 'Ožujsko' },
                { id: 2, name: 'Pan' }
            ]
        })

        const result = await dataService.getList('beers')

        expect(result).toMatchObject({
            data: [
                { id: 1, name: 'Ožujsko' },
                { id: 2, name: 'Pan' }
            ],
            total: 2
        })
    })

    it('should createOne', async () => {
        server.post('/api/beers', (_, request) => {
            const beer = JSON.parse(request.requestBody)

            return {
                id: 1,
                ...beer
            }
        })

        const result = await dataService.createOne('beers', { payload: { name: 'Ožujsko' } })

        expect(result).toMatchObject({ id: 1, name: 'Ožujsko' })
    })

    it('should createOne', async () => {
        let id = 0

        server.post('/api/beers', (_, request) => {
            const beer = JSON.parse(request.requestBody)
            id += 1

            return {
                id,
                ...beer
            }
        })

        const result = await dataService.createOne('beers', { payload: { name: 'Ožujsko' } })

        expect(result).toMatchObject({ id: 1, name: 'Ožujsko' })
    })

    it('should createMany', async () => {
        let id = 0

        server.post('/api/beers', (_, request) => {
            const beer = JSON.parse(request.requestBody)
            id += 1

            return {
                id,
                ...beer
            }
        })

        const result = await dataService.createMany('beers', { payload: [{ name: 'Ožujsko' }, { name: 'Pan' }] })

        expect(result).toMatchObject([
            { id: 1, name: 'Ožujsko' },
            { id: 2, name: 'Pan' }
        ])
    })

    it('should updateOne', async () => {
        server.put('/api/beers/:id', (_, request) => {
            const beer = JSON.parse(request.requestBody)

            return beer
        })

        const result = await dataService.updateOne('beers', { id: 1, payload: { id: 1, name: 'Ožujsko' } })

        expect(result).toMatchObject({ id: 1, name: 'Ožujsko' })
    })

    it('updateOne should throw on id containing slashes', async () => {
        server.put('/api/beers/:id', (_, request) => {
            const beer = JSON.parse(request.requestBody)

            return beer
        })

        expect(
            dataService.updateOne('beers', { id: '/id/1', payload: { id: '/id/1', name: 'Ožujsko' } })
        ).rejects.toThrowError()
    })

    it('should updateMany', async () => {
        server.put('/api/beers/:id', (_, request) => {
            const beer = JSON.parse(request.requestBody)

            return beer
        })

        const result = await dataService.updateMany('beers', {
            ids: [1, 2],
            payload: [
                { id: 1, name: 'Ožujsko' },
                { id: 2, name: 'Pan' }
            ]
        })

        expect(result).toMatchObject([
            { id: 1, name: 'Ožujsko' },
            { id: 2, name: 'Pan' }
        ])
    })

    it('should deleteOne', async () => {
        server.del('/api/beers/:id', () => {
            return new Response(204, {}, '')
        })

        const result = await dataService.deleteOne('beers', { id: 1 })

        expect(result).toMatchObject({ id: 1 })
    })

    it('deleteOne should throw on id containing slashes', async () => {
        server.del('/api/beers/:id', () => {
            return new Response(204, {}, '')
        })

        expect(dataService.deleteOne('beers', { id: '/id/1' })).rejects.toThrowError()
    })

    it('should deleteMany', async () => {
        server.del('/api/beers/:id', () => {
            return new Response(204, {}, '')
        })

        const result = await dataService.deleteMany('beers', { ids: [1, 2] })

        expect(result).toMatchObject([{ id: 1 }, { id: 2 }])
    })

    it('should throw if id is invalid type', async () => {
        server.get('/api/beers/:id', () => {
            return { id: 1, name: 'Ožujsko' }
        })

        // force invalid id type for this test
        expect(dataService.getOne('beers', { id: { id: 1 } as unknown as string })).rejects.toThrowError()
    })
})
