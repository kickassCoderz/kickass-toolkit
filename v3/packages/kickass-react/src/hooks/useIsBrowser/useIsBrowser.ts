const getIsBrowser = () => {
    return typeof window !== 'undefined'
}

/**
 * Check if current environment is browser.
 *
 * @returns boolean flag
 */
const useIsBrowser = () => {
    return getIsBrowser()
}

export { getIsBrowser, useIsBrowser }
