/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react'

import { TConsoleLevel, useConsole, useConsoleError, useConsoleInfo, useConsoleLog, useConsoleWarn } from './useConsole'

describe('useConsole', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
    const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation()

    afterEach(() => {
        consoleLogSpy.mockClear()
        consoleInfoSpy.mockClear()
    })

    it('should be defined', () => {
        expect(useConsole).toBeDefined()
    })

    it('should log to console when value changes', () => {
        const { rerender } = renderHook(({ a }) => useConsole('log', a), { initialProps: { a: 0 } })

        expect(consoleLogSpy).toHaveBeenCalledWith(0)
        expect(consoleLogSpy).toHaveBeenCalledTimes(1)

        rerender({ a: 1 })
        expect(consoleLogSpy).toHaveBeenCalledWith(1)
        expect(consoleLogSpy).toHaveBeenCalledTimes(2)

        rerender({ a: 2 })
        expect(consoleLogSpy).toHaveBeenCalledWith(2)
        expect(consoleLogSpy).toHaveBeenCalledTimes(3)
    })

    it('should not log to console when value stays the same', () => {
        const { rerender } = renderHook(({ a }) => useConsole('log', a), { initialProps: { a: 0 } })

        expect(consoleLogSpy).toHaveBeenCalledWith(0)
        expect(consoleLogSpy).toHaveBeenCalledTimes(1)

        rerender({ a: 0 })
        expect(consoleLogSpy).toHaveBeenCalledTimes(1)

        rerender({ a: 0 })
        expect(consoleLogSpy).toHaveBeenCalledTimes(1)
    })

    it('should use different underlying console method when level is provided', () => {
        renderHook(({ a, level }: { a: number; level: TConsoleLevel }) => useConsole(level, a), {
            initialProps: { a: 0, level: 'info' }
        })

        expect(consoleInfoSpy).toHaveBeenCalledWith(0)
        expect(consoleInfoSpy).toHaveBeenCalledTimes(1)
    })

    it('should log to console when level changes', () => {
        const { rerender } = renderHook(({ a, level }: { a: number; level: TConsoleLevel }) => useConsole(level, a), {
            initialProps: { a: 0, level: 'log' }
        })

        expect(consoleLogSpy).toHaveBeenCalledWith(0)
        expect(consoleLogSpy).toHaveBeenCalledTimes(1)

        rerender({ a: 0, level: 'info' })
        expect(consoleInfoSpy).toHaveBeenCalledWith(0)
        expect(consoleInfoSpy).toHaveBeenCalledTimes(1)

        rerender({ a: 1, level: 'info' })
        expect(consoleInfoSpy).toHaveBeenCalledWith(1)
        expect(consoleInfoSpy).toHaveBeenCalledTimes(2)
    })

    it('should fallback to console.log method if invalid level is provided', () => {
        renderHook(() => useConsole('wrong' as TConsoleLevel, 1))

        expect(consoleLogSpy).toHaveBeenCalledWith(1)
        expect(consoleLogSpy).toHaveBeenCalledTimes(1)
    })

    it('should fallback to console.log method if level is not a string', () => {
        renderHook(() => useConsole(undefined as unknown as TConsoleLevel, 1))

        expect(consoleLogSpy).toHaveBeenCalledWith(1)
        expect(consoleLogSpy).toHaveBeenCalledTimes(1)
    })

    it('useConsoleLog should log to console with level log', () => {
        renderHook(() => useConsoleLog(1))

        expect(consoleLogSpy).toHaveBeenCalledWith(1)
        expect(consoleLogSpy).toHaveBeenCalledTimes(1)
    })

    it('useConsoleWarn should log to console with level warn', () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()
        renderHook(() => useConsoleWarn(1))

        expect(consoleWarnSpy).toHaveBeenCalledWith(1)
        expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
    })

    it('useConsoleError should log to console with level error', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
        renderHook(() => useConsoleError(1))

        expect(consoleErrorSpy).toHaveBeenCalledWith(1)
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
    })

    it('useConsoleInfo should log to console with level info', () => {
        const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation()
        renderHook(() => useConsoleInfo(1))

        expect(consoleInfoSpy).toHaveBeenCalledWith(1)
        expect(consoleInfoSpy).toHaveBeenCalledTimes(1)
    })
})
