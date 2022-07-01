/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react'

import { TConsoleLevel, useConsole } from './useConsole'

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
})
