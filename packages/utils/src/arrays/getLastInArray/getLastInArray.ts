import type { LastInList, List } from '../../types'

function lastInArray<T extends List<unknown>>(array: T): LastInList<T> {
    return array[array.length - 1] as LastInList<T>
}

export { lastInArray }
