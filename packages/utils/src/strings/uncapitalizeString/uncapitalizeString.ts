function uncapitalizeString<T extends string>(stringToLowerize: T): Uncapitalize<T> {
    return (stringToLowerize.charAt(0).toLowerCase() + stringToLowerize.slice(1)) as Uncapitalize<T>
}

export { uncapitalizeString }
