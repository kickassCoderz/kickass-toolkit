import { renderHook, waitFor } from '@testing-library/react'
import { createServer } from 'miragejs'
import type { ReactNode } from 'react'
import { act } from 'react-dom/test-utils'

import { DataServiceProvider } from '../../providers/DataServiceProvider/DataServiceProvider'
import { RestDataService } from './RestDataService'
import { useCreateMany } from './useCreateMany'

describe('useCreateMany', () => {
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
        expect(useCreateMany).toBeDefined()
    })

    it('should render', async () => {
        let id = 0

        server.post('/api/beers', (_, request) => {
            const beer = JSON.parse(request.requestBody)
            id += 1

            return {
                id,
                ...beer
            }
        })
        const dataServiceSpy = jest.spyOn(dataService, 'createMany')

        const { result } = renderHook(
            () =>
                useCreateMany({
                    resource: 'beers'
                }),
            {
                wrapper: App
            }
        )

        act(() => {
            result.current.mutate({ payload: [{ name: 'Ožujsko' }, { name: 'Pan' }] })
        })

        await waitFor(() => expect(result.current.data).toBeDefined())

        expect(result.current.data).toMatchObject([
            { id: 1, name: 'Ožujsko' },
            { id: 2, name: 'Pan' }
        ])
        expect(dataServiceSpy).toHaveBeenCalledTimes(1)
        expect(dataServiceSpy).toHaveBeenCalledWith('beers', { payload: [{ name: 'Ožujsko' }, { name: 'Pan' }] })
    })
})
