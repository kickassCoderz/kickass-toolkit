import { forEachInArray } from '../../arrays'
import { splitString } from '../splitString'

type TransformStringOptions = {
    separator?: string
    joiner?: string
    transformer: (stringPartToTransform: string, index: number) => string
}

const DEFAULT_TRANSFORM_STRING_OPTIONS: Required<Pick<TransformStringOptions, 'separator' | 'joiner'>> = {
    separator: '',
    joiner: ''
}

function transformString<T extends string>(stringToTransform: T, options: TransformStringOptions) {
    const { separator, joiner, transformer } = { ...DEFAULT_TRANSFORM_STRING_OPTIONS, ...options }

    const stringParts = splitString(stringToTransform, separator)

    forEachInArray(stringParts, (stringPart, index) => {
        stringParts[index] = transformer(stringPart, index)
    })

    return stringParts.join(joiner)
}

export { transformString }
