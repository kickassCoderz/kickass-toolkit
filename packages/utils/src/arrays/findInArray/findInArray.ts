function findInArray<T, R extends T>(
    arrayToIterate: ReadonlyArray<T>,
    predicate: (value: T, index: number) => value is R
): R | undefined {
    let result: R | undefined

    for (let index = 0, length = arrayToIterate.length; index < length; index += 1) {
        const value = arrayToIterate[index]

        if (predicate(value, index)) {
            result = value
            break
        }
    }

    return result
}

export { findInArray }
