import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createContext, useState } from 'react'

import type { IDataService, IDataServiceProvider } from './types'

const DataServiceContext = createContext<IDataService | undefined>(undefined)

const DataServiceProvider = ({ children, dataService, queryClient }: IDataServiceProvider) => {
    const [defaultQueryClient] = useState(() => new QueryClient()) // to avoid server side cache sharing

    return (
        <QueryClientProvider client={queryClient || defaultQueryClient}>
            <DataServiceContext.Provider value={dataService}>{children}</DataServiceContext.Provider>
        </QueryClientProvider>
    )
}

export { DataServiceContext, DataServiceProvider }
