import { assert } from '@kickass-coderz/kickass-js'
import { useDebugValue, useEffect, useMemo } from 'react'

const isEnabled = typeof process === 'undefined' ? true : process.env['NODE_ENV'] !== 'production'

export type TUseConsoleConsole = Omit<Console, 'Console'>

export type TUseConsoleConsoleLevel = keyof TUseConsoleConsole

export type TUseConsoleParameters<T extends TUseConsoleConsoleLevel> = Parameters<TUseConsoleConsole[T]>

/**
 * Drop in replacement for console but it is reactive.
 * It also automatically silences all logs if NODE_ENV is set to production.
 * @beta - this is still in development and may change in the future
 * @param level - log level like log, error, warn and others
 * @param args - any arguments to watch and log on changes
 */
const useConsole = <T extends TUseConsoleConsoleLevel>(level: T, ...arguments_: TUseConsoleParameters<T>): void => {
    assert(console[level], 'useConsole', `Invalid level: ${level} provided!`)

    const logger = useMemo(() => {
        return console[level]
    }, [level])

    useDebugValue(arguments_)

    useEffect(() => {
        if (!isEnabled) {
            return
        }

        Reflect.apply(logger, logger, arguments_)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logger, ...arguments_])
}

const useConsoleLog = (...arguments_: TUseConsoleParameters<'log'>) => useConsole('log', ...arguments_)

const useConsoleWarn = (...arguments_: TUseConsoleParameters<'warn'>) => useConsole('warn', ...arguments_)

const useConsoleError = (...arguments_: TUseConsoleParameters<'error'>) => useConsole('error', ...arguments_)

const useConsoleInfo = (...arguments_: TUseConsoleParameters<'info'>) => useConsole('info', ...arguments_)

export { useConsole, useConsoleError, useConsoleInfo, useConsoleLog, useConsoleWarn }
