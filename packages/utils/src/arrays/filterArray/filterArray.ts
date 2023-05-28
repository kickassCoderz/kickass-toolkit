function filterArray<T, R extends T>(
    arrayToFilter: ReadonlyArray<T>,
    predicate: (value: T, index: number) => value is R
): Array<R> {
    const result: R[] = []

    for (let index = 0, length = arrayToFilter.length; index < length; index += 1) {
        const value = arrayToFilter[index]

        if (predicate(value, index)) {
            result.push(value)
        }
    }

    return result
}

export { filterArray }
