import { useResizeObserver } from '@kickass-coderz/hooks'
import { styled } from '@stitches/react'
import { useRef } from 'react'

const Box = styled('div', {
    width: 200,
    height: 200,
    background: 'hotpink',
    resize: 'both',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})

const UseResizeObserverExampleBasic = () => {
    const elementRef = useRef<HTMLDivElement>()

    useResizeObserver({
        target: elementRef,
        onResize({ contentRect }) {
            elementRef.current.innerHTML = `
             width: ${contentRect.width}
             height: ${contentRect.height}
             `
        }
    })

    return <Box ref={elementRef} />
}

export { UseResizeObserverExampleBasic }
