import { MOCK_API_BASE_URL } from './consts'
import { mockDb as mockDatabase } from './mockDb'

const handlers = mockDatabase.beer.toHandlers('rest', `${MOCK_API_BASE_URL}/`)

export { handlers }
