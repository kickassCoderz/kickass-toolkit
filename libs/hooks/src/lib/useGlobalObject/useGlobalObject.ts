/**
 * Returns global object for current environment.
 *
 * For browser it will return Window.
 *
 * For node it will return Global object.
 *
 * @return {*}
 */
const useGlobalObject = () => {
    if (typeof window !== 'undefined') {
        return window
    }

    if (typeof global !== 'undefined') {
        return global
    }

    /* istanbul ignore next - currently there are no used environments with only globalThis */
    if (typeof globalThis !== 'undefined') {
        return globalThis
    }

    /* istanbul ignore next - currently there are no used environments without global */
    throw new Error(
        'You are running in an unsupported environment. Make sure your environment has a global object present. More info: https://developer.mozilla.org/en-US/docs/Glossary/Global_object'
    )
}

export { useGlobalObject }
