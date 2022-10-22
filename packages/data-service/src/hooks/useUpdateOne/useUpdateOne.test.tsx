import { renderHook, waitFor } from '@testing-library/react'
import { createServer } from 'miragejs'
import type { ReactNode } from 'react'
import { act } from 'react-dom/test-utils'

import { DataServiceProvider } from '../../providers'
import { RestDataService } from '../../services'
import { useUpdateOne } from './useUpdateOne'

describe('useUpdateOne', () => {
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
        expect(useUpdateOne).toBeDefined()
    })

    it('should render', async () => {
        server.put('/api/beers/:id', (_, request) => {
            const beer = JSON.parse(request.requestBody)

            return {
                ...beer,
                id: +request.params['id']
            }
        })
        const dataServiceSpy = jest.spyOn(dataService, 'updateOne')

        const { result } = renderHook(
            () =>
                useUpdateOne({
                    resource: 'beers'
                }),
            {
                wrapper: App
            }
        )

        act(() => {
            result.current.mutate({ id: 1, payload: { name: 'Ožujsko' } })
        })

        await waitFor(() => expect(result.current.data).toBeDefined())

        expect(result.current.data).toMatchObject({ id: 1, name: 'Ožujsko' })
        expect(dataServiceSpy).toHaveBeenCalledTimes(1)
        expect(dataServiceSpy).toHaveBeenCalledWith('beers', { id: 1, payload: { name: 'Ožujsko' } })
    })
})
