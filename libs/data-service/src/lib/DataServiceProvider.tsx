import { createContext } from 'react'

import type { IDataService, IDataServiceProvider } from './types'

const DataServiceContext = createContext<IDataService | undefined>(undefined)

const DataServiceProvider = ({ children, dataService }: IDataServiceProvider) => {
    return <DataServiceContext.Provider value={dataService}>{children}</DataServiceContext.Provider>
}

export { DataServiceContext, DataServiceProvider }
