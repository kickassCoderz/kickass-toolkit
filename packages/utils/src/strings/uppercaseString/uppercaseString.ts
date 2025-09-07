function uppercaseString<T extends string>(stringToUppercase: T): Uppercase<T> {
    return stringToUppercase.toUpperCase() as Uppercase<T>
}

export { uppercaseString }
