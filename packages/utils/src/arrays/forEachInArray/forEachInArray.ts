function forEachInArray<T>(arrayToIterate: ReadonlyArray<T>, callback: (value: T, index: number) => void): void {
    for (let index = 0, length = arrayToIterate.length; index < length; index += 1) {
        callback(arrayToIterate[index], index)
    }
}

export { forEachInArray }
