const getIsBrowser = () => {
    return typeof window !== 'undefined'
}

const useIsBrowser = () => {
    return getIsBrowser()
}

export { getIsBrowser, useIsBrowser }
