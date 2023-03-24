import { useDebugValue, useEffect } from 'react'

const isEnabled = typeof process === 'undefined' ? true : process.env['NODE_ENV'] !== 'production'

export type TConsoleLevel =
    | 'debug'
    | 'error'
    | 'info'
    | 'log'
    | 'warn'
    | 'dir'
    | 'dirxml'
    | 'table'
    | 'trace'
    | 'group'
    | 'groupCollapsed'
    | 'groupEnd'
    | 'clear'
    | 'count'
    | 'countReset'
    | 'assert'
    | 'profile'
    | 'profileEnd'
    | 'time'
    | 'timeLog'
    | 'timeEnd'
    | 'timeStamp'
    | 'context'
    | 'memory'

/**
 * Drop in replacement for console but it is reactive.
 *
 * It also automatically silences all logs if NODE_ENV is set to production.
 *
 * @param level log level like log, error, warn and others
 * @param args any arguments to watch and log on changes
 */
const useConsole = (level: TConsoleLevel, ...arguments_: unknown[]): void => {
    const consoleInstance = console as unknown as Record<string, (...arguments__: unknown[]) => void> // fuck typescript
    const logger = consoleInstance[typeof level === 'string' ? level : ''] || console.log

    useDebugValue(arguments_)

    useEffect(() => {
        if (!isEnabled) {
            return
        }

        logger(...arguments_)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [level, logger, ...arguments_])
}

const useConsoleLog = (...arguments_: unknown[]) => useConsole('log', ...arguments_)

const useConsoleWarn = (...arguments_: unknown[]) => useConsole('warn', ...arguments_)

const useConsoleError = (...arguments_: unknown[]) => useConsole('error', ...arguments_)

const useConsoleInfo = (...arguments_: unknown[]) => useConsole('info', ...arguments_)

export { useConsole, useConsoleError, useConsoleInfo, useConsoleLog, useConsoleWarn }
