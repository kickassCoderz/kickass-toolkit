function getIsBrowser() {
    return typeof window !== 'undefined'
}

/**
 * Check if current environment is browser.
 *
 * @returns boolean flag
 */
function useIsBrowser() {
    return getIsBrowser()
}

export { getIsBrowser, useIsBrowser }
