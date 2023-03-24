/**
 * @jest-environment node
 */
import { useGlobalObject } from './useGlobalObject'

describe('useGlobalObject', () => {
    it('should be defined', () => {
        expect(useGlobalObject).toBeDefined()
    })

    it('should render', () => {
        const result = useGlobalObject()

        expect(result).toBe(global)
    })
})
