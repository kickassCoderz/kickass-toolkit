import { useEventListener } from '@kickass-coderz/hooks'
import { styled } from '@stitches/react'
import { useRef } from 'react'

const Box = styled('div', {
    width: 400,
    height: 400,
    backgroundColor: 'HotPink',
    position: 'relative',
    overflow: 'hidden'
})

const Ball = styled('div', {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: '100%',
    backgroundColor: 'Red'
})

const UseEventListenerExampleBasic = () => {
    const elementRef = useRef<HTMLDivElement>()
    const ballRef = useRef<HTMLDivElement>()

    useEventListener(elementRef, 'mousemove', ({ offsetX, offsetY }) => {
        ballRef.current.style.transform = `translate(${offsetX}px,${offsetY}px)`
    })

    return (
        <Box ref={elementRef}>
            <Ball ref={ballRef} />
        </Box>
    )
}

export { UseEventListenerExampleBasic }
