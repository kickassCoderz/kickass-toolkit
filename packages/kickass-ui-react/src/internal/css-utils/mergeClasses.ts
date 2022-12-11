const mergeClasses = (...classNames: Array<string | undefined>): string | undefined => {
    const classes = classNames.filter(className => Boolean(className) && className !== ' ')

    if (!classes.length) {
        return undefined
    }

    return classes.join(' ').trim()
}

export { mergeClasses }
