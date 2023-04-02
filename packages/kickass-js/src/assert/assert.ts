const DEFAULT_PREFIX = 'AssertionError'

export type TAssertMessageFunction = () => string

export type TAssertMessage = string | TAssertMessageFunction

const errorMessage = (message?: TAssertMessage, messagePrefix: string = DEFAULT_PREFIX): string => {
    if (!message) {
        return `[${messagePrefix}]`
    }
    const resolvedMessage = typeof message === 'function' ? message() : message

    return `[${messagePrefix}]: ${resolvedMessage}`
}

function assert(
    condition: unknown,
    message?: TAssertMessage,
    messagePrefix: string = DEFAULT_PREFIX
): asserts condition {
    if (!condition) {
        throw new Error(errorMessage(message, messagePrefix))
    }
}

export { assert }
