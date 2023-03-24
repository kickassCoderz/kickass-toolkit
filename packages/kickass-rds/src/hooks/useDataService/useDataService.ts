import { useContext } from 'react'

import { DataServiceContext } from '../../providers/DataServiceProvider/DataServiceProvider'
import type { IDataService } from '../../types'

function useDataService  <T extends IDataService = IDataService>()  {
    const context = useContext(DataServiceContext)

    if (!context) {
        throw new Error('useDataService must be used within DataServiceProvider')
    }

    return context as T
}

export { useDataService }
