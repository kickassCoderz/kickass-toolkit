function lowercaseString<T extends string>(stringToLowercase: T): Lowercase<T> {
    return stringToLowercase.toLowerCase() as Lowercase<T>
}

export { lowercaseString }
