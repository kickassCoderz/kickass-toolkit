import type { FirstInList, List } from '../../types'

function getFirstInArray<T extends List<unknown>>(array: T): FirstInList<T> {
    return array[0] as FirstInList<T>
}

export { getFirstInArray }
