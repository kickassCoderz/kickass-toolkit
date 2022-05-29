const useGlobalObject = () => {
    if (typeof window !== 'undefined') {
        return window
    }

    if (typeof global !== 'undefined') {
        return global
    }

    if (typeof globalThis !== 'undefined') {
        return globalThis
    }

    throw new Error(
        'You are running in an unsupported environment. Make sure your environment has a global object present. More info: https://developer.mozilla.org/en-US/docs/Glossary/Global_object'
    )
}

export { useGlobalObject }
