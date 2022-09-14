import { renderHook, waitFor } from '@testing-library/react'
import { createServer } from 'miragejs'
import type { ReactNode } from 'react'

import { DataServiceProvider } from './DataServiceProvider'
import { RestDataService } from './RestDataService'
import { useGetList } from './useGetList'

describe('useGetList', () => {
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
        expect(useGetList).toBeDefined()
    })

    it('should render', async () => {
        server.get('/api/beers', () => {
            return [
                { id: 1, name: 'Ožujsko' },
                { id: 2, name: 'Pan' }
            ]
        })
        const getOneSpy = jest.spyOn(dataService, 'getList')

        const { result } = renderHook(
            () =>
                useGetList({
                    resource: 'beers'
                }),

            {
                wrapper: App
            }
        )

        await waitFor(() => expect(result.current.data).toBeDefined())

        expect(result.current.data).toMatchObject({
            data: [
                { id: 1, name: 'Ožujsko' },
                { id: 2, name: 'Pan' }
            ],
            total: 2
        })
        expect(getOneSpy).toHaveBeenCalledTimes(1)
        expect(getOneSpy).toHaveBeenCalledWith(
            'beers',
            undefined,
            expect.objectContaining({
                meta: undefined,
                signal: expect.any(AbortSignal)
            })
        )
    })
})
