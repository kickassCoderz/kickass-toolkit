function groupArray<T, K extends string>(
    arrayToGroup: ReadonlyArray<T>,
    getGroupKey: (value: T, index: number) => K
): Record<K, Array<T>> {
    const result = {} as Record<K, Array<T>>

    for (let index = 0, length = arrayToGroup.length; index < length; index += 1) {
        const value = arrayToGroup[index]
        const key = getGroupKey(value, index)

        if (result[key]) {
            result[key].push(value)
        } else {
            result[key] = [value]
        }
    }

    return result
}

export { groupArray }
