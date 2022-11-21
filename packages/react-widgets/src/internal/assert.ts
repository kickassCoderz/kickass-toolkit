const DEFAULT_PREFIX = 'AssertionError'

export type TAssertMessageFn = () => string

export type TAssertMessage = string | TAssertMessageFn

const errorMessage = (messagePrefix: string = DEFAULT_PREFIX, message?: TAssertMessage): string => {
    if (!message) {
        return `[${messagePrefix}]`
    }
    const resolvedMessage = typeof message === 'function' ? message() : message

    return `[${messagePrefix}]:${resolvedMessage}`
}

function assert(condition: unknown, messagePrefix?: string, message?: TAssertMessage): asserts condition {
    if (condition) {
        return
    }

    throw new Error(errorMessage(messagePrefix, message))
}

export { assert }
