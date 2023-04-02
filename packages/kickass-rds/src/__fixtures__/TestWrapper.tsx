import { QueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { DataServiceProvider } from '../providers'
import { RestDataService } from '../services'
import { MOCK_API_BASE_URL } from './consts'
import { createTestQueryClient } from './createTestQueryClient'

const TestWrapper = ({
    children,
    queryClient: injectedQueryClient
}: {
    children?: React.ReactNode
    queryClient?: QueryClient
}) => {
    const [dataService] = useState(() => new RestDataService(MOCK_API_BASE_URL))
    const [queryClient] = useState(() => injectedQueryClient || createTestQueryClient())

    return (
        <DataServiceProvider dataService={dataService} queryClient={queryClient}>
            {children}
        </DataServiceProvider>
    )
}

export { TestWrapper }
