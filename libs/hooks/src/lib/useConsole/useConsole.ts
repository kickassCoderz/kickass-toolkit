import { useDebugValue, useEffect } from 'react'

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
 * It also automatically silences all logs if NODE_ENV is set to proudction.
 *
 * @param {TConsoleLevel} level
 * @param {...unknown[]} args any arguments to watch and log on changes
 */
const useConsole = (level: TConsoleLevel, ...args: unknown[]): void => {
    const consoleInstance = console as unknown as Record<string, (...args: unknown[]) => void> // fuck typescript
    const logger = consoleInstance[typeof level === 'string' ? level : ''] || console.log

    useDebugValue(args)

    useEffect(() => {
        logger(...args)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [level, logger, ...args])
}

export { useConsole }
