function groupToMapArray<T, K>(arrayToGroup: ReadonlyArray<T>, getGroupKey: (value: T, index: number) => K) {
    const result = new Map<K, T[]>()

    for (let index = 0, length = arrayToGroup.length; index < length; index += 1) {
        const value = arrayToGroup[index]
        const key = getGroupKey(value, index)
        const valueFromResult = result.get(key)

        if (valueFromResult) {
            valueFromResult.push(value)
        } else {
            result.set(key, [value])
        }
    }

    return result
}

export { groupToMapArray }
