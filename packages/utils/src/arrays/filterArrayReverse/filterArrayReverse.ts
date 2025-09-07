function filterArrayReverse<T, R extends T>(
    arrayToIterate: ReadonlyArray<T>,
    predicate: (value: T, index: number) => value is R
): Array<R> {
    const result: R[] = []

    for (let index = arrayToIterate.length; index--; ) {
        const value = arrayToIterate[index]

        if (predicate(value, index)) {
            result.push(value)
        }
    }

    return result
}

export { filterArrayReverse }
