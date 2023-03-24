import { useDebugValue, useEffect } from 'react'

const isEnabled = typeof process !== 'undefined' ? process.env['NODE_ENV'] !== 'production' : true

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
const useConsole = (level: TConsoleLevel, ...args: unknown[]): void => {
    const consoleInstance = console as unknown as Record<string, (...args: unknown[]) => void> // fuck typescript
    const logger = consoleInstance[typeof level === 'string' ? level : ''] || console.log

    useDebugValue(args)

    useEffect(() => {
        if (!isEnabled) {
            return
        }

        logger(...args)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [level, logger, ...args])
}

const useConsoleLog = (...args: unknown[]) => useConsole('log', ...args)

const useConsoleWarn = (...args: unknown[]) => useConsole('warn', ...args)

const useConsoleError = (...args: unknown[]) => useConsole('error', ...args)

const useConsoleInfo = (...args: unknown[]) => useConsole('info', ...args)

export { useConsole, useConsoleError, useConsoleInfo, useConsoleLog, useConsoleWarn }
