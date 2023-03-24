// Polyfill "window.fetch"
import 'whatwg-fetch'

import { dropMockDb as dropMockDatabase, seedMockDb as seedMockDatabase, server } from './src/__fixtures__'

beforeAll(() => {
    seedMockDatabase()

    server.listen()
})

afterEach(() => {
    dropMockDatabase()

    seedMockDatabase()

    server.resetHandlers()
})

afterAll(() => {
    dropMockDatabase()

    server.close()
})
