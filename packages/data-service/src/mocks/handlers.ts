import { MOCK_API_BASE_URL } from './consts'
import { mockDb } from './mockDb'

const handlers = mockDb.beer.toHandlers('rest', `${MOCK_API_BASE_URL}/`)

export { handlers }
