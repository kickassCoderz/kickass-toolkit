import { renderHook, waitFor } from '@testing-library/react'
import { createServer } from 'miragejs'
import type { ReactNode } from 'react'
import { act } from 'react-dom/test-utils'

import { DataServiceProvider } from './DataServiceProvider'
import { RestDataService } from './RestDataService'
import { useUpdateMany } from './useUpdateMany'

describe('useUpdateMany', () => {
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
        expect(useUpdateMany).toBeDefined()
    })

    it('should render', async () => {
        server.put('/api/beers/:id', (_, request) => {
            const beer = JSON.parse(request.requestBody)

            return beer
        })
        const dataServiceSpy = jest.spyOn(dataService, 'updateMany')

        const { result } = renderHook(
            () =>
                useUpdateMany({
                    resource: 'beers'
                }),
            {
                wrapper: App
            }
        )

        act(() => {
            result.current.mutate({
                ids: [1, 2],
                payload: [
                    { id: 1, name: 'Ožujsko' },
                    { id: 2, name: 'Pan' }
                ]
            })
        })

        await waitFor(() => expect(result.current.data).toBeDefined())

        expect(result.current.data).toMatchObject([
            { id: 1, name: 'Ožujsko' },
            { id: 2, name: 'Pan' }
        ])
        expect(dataServiceSpy).toHaveBeenCalledTimes(1)
        expect(dataServiceSpy).toHaveBeenCalledWith('beers', {
            ids: [1, 2],
            payload: [
                { id: 1, name: 'Ožujsko' },
                { id: 2, name: 'Pan' }
            ]
        })
    })
})
