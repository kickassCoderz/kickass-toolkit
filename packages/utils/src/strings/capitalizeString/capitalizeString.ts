function capitalizeString<T extends string>(stringToCapitalize: T): Capitalize<T> {
    return (stringToCapitalize.charAt(0).toUpperCase() + stringToCapitalize.slice(1)) as Capitalize<T>
}

export { capitalizeString }
