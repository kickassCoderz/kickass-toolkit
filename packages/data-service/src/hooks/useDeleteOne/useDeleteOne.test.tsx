import { renderHook, waitFor } from '@testing-library/react'
import { createServer, Response } from 'miragejs'
import type { ReactNode } from 'react'
import { act } from 'react-dom/test-utils'

import { DataServiceProvider } from '../../providers'
import { RestDataService } from '../../services'
import { useDeleteOne } from './useDeleteOne'

describe('useDeleteOne', () => {
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
        expect(useDeleteOne).toBeDefined()
    })

    it('should render', async () => {
        server.del('/api/beers/:id', () => {
            return new Response(204, {}, '')
        })

        const dataServiceSpy = jest.spyOn(dataService, 'deleteOne')

        const { result } = renderHook(
            () =>
                useDeleteOne({
                    resource: 'beers'
                }),
            {
                wrapper: App
            }
        )

        act(() => {
            result.current.mutate({ id: 1 })
        })

        await waitFor(() => expect(result.current.data).toBeDefined())

        expect(result.current.data).toMatchObject({ id: 1 })
        expect(dataServiceSpy).toHaveBeenCalledTimes(1)
        expect(dataServiceSpy).toHaveBeenCalledWith('beers', { id: 1 })
    })
})
