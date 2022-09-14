import { renderHook, waitFor } from '@testing-library/react'
import { createServer } from 'miragejs'
import type { ReactNode } from 'react'

import { DataServiceProvider } from './DataServiceProvider'
import { RestDataService } from './RestDataService'
import { useGetOne } from './useGetOne'

describe('useGetOne', () => {
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
        expect(useGetOne).toBeDefined()
    })

    it('should render', async () => {
        server.get('/api/beers/:id', () => {
            return { id: 1, name: 'Ožujsko' }
        })
        const getOneSpy = jest.spyOn(dataService, 'getOne')

        const { result } = renderHook(
            () =>
                useGetOne({
                    resource: 'beers',
                    params: {
                        id: 1
                    }
                }),
            {
                wrapper: App
            }
        )

        await waitFor(() => expect(result.current.data).toBeDefined())

        expect(result.current.data).toMatchObject({ id: 1, name: 'Ožujsko' })
        expect(getOneSpy).toHaveBeenCalledTimes(1)
        expect(getOneSpy).toHaveBeenCalledWith(
            'beers',
            { id: 1 },
            expect.objectContaining({
                meta: undefined,
                signal: expect.any(AbortSignal)
            })
        )
    })
})
