import type { SnakeCaseToConstantCase } from '../../types'
import { transformString } from '../transformString'
import { uppercaseString } from '../uppercaseString'

function snakeCaseToConstantCaseString<T extends string>(stringToTransform: T): SnakeCaseToConstantCase<T> {
    return transformString(stringToTransform, {
        separator: '_',
        joiner: '_',
        transformer: uppercaseString
    }) as SnakeCaseToConstantCase<T>
}

export { snakeCaseToConstantCaseString }
