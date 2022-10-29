const getIsBrowser = () => {
    return typeof window !== 'undefined'
}

/**
 * Check if current environment is browser.
 *
 * @return {*}
 */
const useIsBrowser = () => {
    return getIsBrowser()
}

export { getIsBrowser, useIsBrowser }
