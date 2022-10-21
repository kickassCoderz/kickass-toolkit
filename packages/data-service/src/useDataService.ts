import { useContext } from 'react'

import { DataServiceContext } from './DataServiceProvider'
import type { IDataService } from './types'

const useDataService = <T extends IDataService = IDataService>() => {
    const context = useContext(DataServiceContext)

    if (!context) {
        throw new Error('useDataService must be used within DataServiceProvider')
    }

    return context as T
}

export { useDataService }
