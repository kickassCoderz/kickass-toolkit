/* eslint-disable no-undef */
import { dropMockDb, seedMockDb } from './src/mocks/mockDb'

beforeAll(() => {
    seedMockDb()
})

afterEach(() => {
    dropMockDb()

    seedMockDb()
})

afterAll(() => {
    dropMockDb()
})
