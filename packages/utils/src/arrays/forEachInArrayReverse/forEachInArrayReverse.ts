function forEachInArrayReverse<T>(arrayToIterate: ReadonlyArray<T>, callback: (value: T, index: number) => void): void {
    for (let index = arrayToIterate.length; index--; ) {
        callback(arrayToIterate[index], index)
    }
}

export { forEachInArrayReverse }
