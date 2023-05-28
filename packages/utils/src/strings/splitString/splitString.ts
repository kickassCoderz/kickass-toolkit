import type { SplitString } from '../../types'

function splitString<T extends string, D extends string>(stringToSplit: T, delimiter: D): SplitString<T, D> {
    return stringToSplit.split(delimiter) as SplitString<T, D>
}

export { splitString }
