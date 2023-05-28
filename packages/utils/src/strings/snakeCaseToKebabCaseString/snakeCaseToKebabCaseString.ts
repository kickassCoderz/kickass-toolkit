import type { SnakeCaseToKebabCase } from '../../types'
import { lowercaseString } from '../lowercaseString'
import { transformString } from '../transformString'

function snakeCaseToKebabCaseString<T extends string>(stringToTransform: T): SnakeCaseToKebabCase<T> {
    return transformString(stringToTransform, {
        separator: '_',
        joiner: '-',
        transformer: lowercaseString
    }) as SnakeCaseToKebabCase<T>
}

export { snakeCaseToKebabCaseString }
