import type { SnakeCaseToPascalCase } from '../../types'
import { capitalizeString } from '../capitalizeString'
import { transformString } from '../transformString'

function snakeCaseToPascalCaseString<T extends string>(stringToTransform: T): SnakeCaseToPascalCase<T> {
    return transformString(stringToTransform, {
        separator: '_',
        joiner: '',
        transformer: capitalizeString
    }) as SnakeCaseToPascalCase<T>
}

export { snakeCaseToPascalCaseString }
