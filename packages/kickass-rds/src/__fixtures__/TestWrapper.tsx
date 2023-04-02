import { QueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { DataServiceProvider } from '../providers'
import { RestDataService } from '../services'
import { MOCK_API_BASE_URL } from './consts'

const TestWrapper = ({ children }: { children?: React.ReactNode }) => {
    const [dataService] = useState(new RestDataService(MOCK_API_BASE_URL))
    const [queryClient] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false
                }
            },
            logger: {
                log: console.log,
                warn: console.warn,
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                error: () => {}
            }
        })
    )
    // const dataService = new RestDataService(MOCK_API_BASE_URL)

    // const queryClient = new QueryClient({
    //     defaultOptions: {
    //         queries: {
    //             retry: false
    //         }
    //     },
    //     logger: {
    //         log: console.log,
    //         warn: console.warn,
    //         // eslint-disable-next-line @typescript-eslint/no-empty-function
    //         error: () => {}
    //     }
    // })

    return (
        <DataServiceProvider dataService={dataService} queryClient={queryClient}>
            {children}
        </DataServiceProvider>
    )
}

export { TestWrapper }
