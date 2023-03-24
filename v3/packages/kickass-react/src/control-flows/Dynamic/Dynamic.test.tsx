import { render, screen } from '@testing-library/react'
import { createRef, forwardRef } from 'react'

import { Dynamic } from '.'

describe('Dynamic', () => {
    it('should be defined', () => {
        expect(Dynamic).toBeDefined()
    })

    it("should not render if 'component' property is not provided", () => {
        render(<Dynamic>Kickass Coderz</Dynamic>)

        expect(screen.queryByText('Kickass Coderz')).toBeNull()
    })
    it('should render', () => {
        render(<Dynamic component="div">Kickass Coderz</Dynamic>)

        expect(screen.getByText('Kickass Coderz')).toBeDefined()

        expect(screen.getByText('Kickass Coderz').textContent).toBe('Kickass Coderz')
    })

    it("should render different elements when 'component' property changes", () => {
        const { rerender, container } = render(<Dynamic component="div">Kickass Coderz</Dynamic>)

        expect(container.innerHTML).toBe('<div>Kickass Coderz</div>')

        rerender(<Dynamic component="h1">Kickass Coderz</Dynamic>)

        expect(container.innerHTML).toBe('<h1>Kickass Coderz</h1>')

        rerender(<Dynamic component="button">Kickass Coderz</Dynamic>)

        expect(container.innerHTML).toBe('<button>Kickass Coderz</button>')

        const MySpan = () => {
            return <span>Kickass Coderz</span>
        }

        rerender(<Dynamic component={MySpan} />)

        expect(container.innerHTML).toBe('<span>Kickass Coderz</span>')

        rerender(
            <Dynamic component="svg">
                <Dynamic component="path" />
            </Dynamic>
        )

        expect(container.innerHTML).toBe('<svg><path></path></svg>')
    })

    it('should pass properties to rendered element', () => {
        const { rerender, container } = render(
            <Dynamic component="div" id="capJavert">
                Kickass Coderz
            </Dynamic>
        )

        expect(container.innerHTML).toBe('<div id="capJavert">Kickass Coderz</div>')

        rerender(
            <Dynamic component="section" id="Fazla_GroM">
                Kickass Coderz
            </Dynamic>
        )

        expect(container.innerHTML).toBe('<section id="Fazla_GroM">Kickass Coderz</section>')

        rerender(
            <Dynamic component="button" type="button">
                Kickass Coderz
            </Dynamic>
        )

        expect(container.innerHTML).toBe('<button type="button">Kickass Coderz</button>')

        const MySpan = (properties: React.ComponentPropsWithoutRef<'span'>) => {
            return <span {...properties} />
        }

        rerender(
            <Dynamic component={MySpan} id="span" data-state="rendered">
                Kickass Coderz
            </Dynamic>
        )

        expect(container.innerHTML).toBe('<span id="span" data-state="rendered">Kickass Coderz</span>')
    })

    it("should pass 'ref' to underlying element", () => {
        const divReference = createRef<HTMLDivElement>()
        const buttonReference = createRef<HTMLButtonElement>()
        const mySpanReference = createRef<HTMLSpanElement>()

        const MySpan = forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>((properties, reference) => {
            return <span ref={reference} {...properties} />
        })

        MySpan.displayName = 'MySpan'

        render(
            <Dynamic component="div" ref={divReference}>
                <Dynamic component="button" ref={buttonReference}>
                    <Dynamic component={MySpan} ref={mySpanReference}>
                        Kickass Coderz
                    </Dynamic>
                </Dynamic>
            </Dynamic>
        )

        expect(divReference.current).toBeInstanceOf(HTMLDivElement)

        expect(buttonReference.current).toBeInstanceOf(HTMLButtonElement)

        expect(mySpanReference.current).toBeInstanceOf(HTMLSpanElement)
    })
})
