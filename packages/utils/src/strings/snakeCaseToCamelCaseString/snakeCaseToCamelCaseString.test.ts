import { snakeCaseToCamelCaseString } from './snakeCaseToCamelCaseString'

describe('snakeCaseToCamelCaseString', () => {
    it('should convert snake_case to camelCase', () => {
        expect(snakeCaseToCamelCaseString('')).toBe('')

        expect(snakeCaseToCamelCaseString('snake')).toBe('snake')

        expect(snakeCaseToCamelCaseString('snake_case')).toBe('snakeCase')

        expect(snakeCaseToCamelCaseString('snake_case_string')).toBe('snakeCaseString')
    })
})
