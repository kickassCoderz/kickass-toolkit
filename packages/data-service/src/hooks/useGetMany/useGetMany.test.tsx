import { renderHook, waitFor } from '@testing-library/react'
import { createServer } from 'miragejs'
import type { ReactNode } from 'react'

import { DataServiceProvider } from '../../providers'
import { RestDataService } from '../../services'
import { useGetMany } from './useGetMany'

describe('useGetMany', () => {
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
    const App = ({ children }: { children?: ReactNode }) => (
        <DataServiceProvider dataService={dataService}>{children}</DataServiceProvider>
    )

    it('should be defined', () => {
        expect(useGetMany).toBeDefined()
    })

    it('should render', async () => {
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
        const dataServiceSpy = jest.spyOn(dataService, 'getMany')

        const { result } = renderHook(
            () =>
                useGetMany({
                    resource: 'beers',
                    params: {
                        ids: [1, 2]
                    }
                }),
            {
                wrapper: App
            }
        )

        await waitFor(() => expect(result.current.data).toBeDefined())

        expect(result.current.data).toMatchObject([
            { id: 1, name: 'Ožujsko' },
            { id: 2, name: 'Pan' }
        ])
        expect(dataServiceSpy).toHaveBeenCalledTimes(1)
        expect(dataServiceSpy).toHaveBeenCalledWith(
            'beers',
            { ids: [1, 2] },
            expect.objectContaining({
                meta: undefined,
                signal: expect.any(AbortSignal)
            })
        )
    })
})
