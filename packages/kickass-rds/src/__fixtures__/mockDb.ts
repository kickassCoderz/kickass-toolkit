import { drop, factory, primaryKey } from '@mswjs/data'

import { BEERS_MOCK_DATA } from './consts'
import { createId } from './helpers'

const mockDatabase = factory({
    beer: {
        id: primaryKey(createId),
        name: String
    }
})

const seedMockDatabase = () => {
    for (const beer of BEERS_MOCK_DATA) {
        mockDatabase.beer.create(beer)
    }
}

const dropMockDatabase = () => {
    drop(mockDatabase)
}

export { dropMockDatabase, mockDatabase, seedMockDatabase }
