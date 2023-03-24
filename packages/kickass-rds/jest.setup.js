/* eslint-disable no-undef */
// Polyfill "window.fetch"
import 'whatwg-fetch'

import { dropMockDb, seedMockDb } from './src/mocks/mockDb'
import { server } from './src/mocks/server'

beforeAll(() => {
    seedMockDb()

    server.listen()
})

afterEach(() => {
    dropMockDb()

    seedMockDb()

    server.resetHandlers()
})

afterAll(() => {
    dropMockDb()

    server.close()
})
