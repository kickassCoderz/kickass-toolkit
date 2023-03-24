import { drop, factory, primaryKey } from '@mswjs/data'

import { BEERS_MOCK_DATA } from './consts'
import { createId } from './helpers'

const mockDb = factory({
    beer: {
        id: primaryKey(createId),
        name: String
    }
})

const seedMockDb = () => {
    BEERS_MOCK_DATA.forEach(beer => {
        mockDb.beer.create(beer)
    })
}

const dropMockDb = () => {
    drop(mockDb)
}

export { dropMockDb, mockDb, seedMockDb }
