import { RestDataService } from '@kickass-coderz/rest-data-service'
import { QueryClient } from '@tanstack/react-query'

import { DataServiceProvider } from '../providers'
import { MOCK_API_BASE_URL } from './consts'

const TestWrapper = ({ children }: { children?: React.ReactNode }) => {
    const dataService = new RestDataService(MOCK_API_BASE_URL)

    const queryClient = new QueryClient({
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

    return (
        <DataServiceProvider dataService={dataService} queryClient={queryClient}>
            {children}
        </DataServiceProvider>
    )
}

export { TestWrapper }
