function reverseArray<T>(arrayToReverse: ReadonlyArray<T>): Array<T> {
    return [...arrayToReverse].reverse()
}

export { reverseArray }
