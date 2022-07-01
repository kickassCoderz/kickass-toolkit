import { TConsoleLevel, useConsole as useConsoleDev } from './useConsole'

const isProduction = typeof process !== 'undefined' ? process.env['NODE_ENV'] === 'production' : false

const useConsole = isProduction ? (_level: TConsoleLevel, ..._args: unknown[]): void => undefined : useConsoleDev

export { useConsole }
