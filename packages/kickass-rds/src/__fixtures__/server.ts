import { setupServer } from 'msw/node'

import { handlers } from './handlers'

// Setup requests interception using the given handlers and preseed mock database.
const server = setupServer(...handlers)

export { server }
