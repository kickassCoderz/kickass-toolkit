import { render, screen } from '@testing-library/react'

import { Show } from '.'

describe('Show', () => {
    it('should be defined', () => {
        expect(Show).toBeDefined()
    })

    it("should render children when the 'when' condition is truthy", () => {
        const { rerender, container } = render(
            <Show when={true}>
                <div>Kickass Coderz</div>
            </Show>
        )

        expect(screen.getByText('Kickass Coderz')).toBeDefined()

        expect(screen.getByText('Kickass Coderz').textContent).toBe('Kickass Coderz')

        expect(container.innerHTML).toBe('<div>Kickass Coderz</div>')

        rerender(
            <Show when={false}>
                <div>Kickass Coderz</div>
            </Show>
        )

        expect(screen.queryByText('Kickass Coderz')).toBeNull()
    })

    it('should render fallback when condition is falsey and is provided', () => {
        const { rerender, container } = render(
            <Show when={true} fallback={<div>This Sucks</div>}>
                <div>Kickass Coderz</div>
            </Show>
        )

        expect(screen.getByText('Kickass Coderz')).toBeDefined()

        expect(screen.getByText('Kickass Coderz').textContent).toBe('Kickass Coderz')

        expect(container.innerHTML).toBe('<div>Kickass Coderz</div>')

        expect(screen.queryByText('This Sucks')).toBeNull()

        rerender(
            <Show when={false} fallback={<div>This Sucks</div>}>
                <div>Kickass Coderz</div>
            </Show>
        )

        expect(screen.getByText('This Sucks')).toBeDefined()

        expect(screen.getByText('This Sucks').textContent).toBe('This Sucks')

        expect(container.innerHTML).toBe('<div>This Sucks</div>')

        expect(screen.queryByText('Kickass Coderz')).toBeNull()
    })
})
