import type { SnakeCaseToCamelCase } from '../../types'
import { capitalizeString } from '../capitalizeString'
import { transformString } from '../transformString'

function snakeCaseToCamelCaseString<T extends string>(stringToToTransform: T): SnakeCaseToCamelCase<T> {
    return transformString(stringToToTransform, {
        separator: '_',
        joiner: '',
        transformer: (stringPartToTransform, index) =>
            index === 0 ? stringPartToTransform : capitalizeString(stringPartToTransform)
    }) as SnakeCaseToCamelCase<T>
}
export { snakeCaseToCamelCaseString }
