const mergeClasses = (...classNames: Array<string | undefined>): string => {
    return classNames.filter(Boolean).join(' ')
}

export { mergeClasses }
