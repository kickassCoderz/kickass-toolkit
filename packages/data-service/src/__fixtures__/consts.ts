import { createId } from './helpers'

const MOCK_API_BASE_URL = 'http://localhost:3000/api'

const BEERS_MOCK_DATA = [
    { id: createId(), name: 'Ožujsko' },
    { id: createId(), name: 'Pan' },
    { id: createId(), name: 'Karlovačko' },
    { id: createId(), name: 'Laško' }
]

export { BEERS_MOCK_DATA, MOCK_API_BASE_URL }
