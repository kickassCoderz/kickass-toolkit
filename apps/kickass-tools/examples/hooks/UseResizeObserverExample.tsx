import { useResizeObserver } from '@kickass-coderz/hooks'
import { useRef } from 'react'

const UseResizeObserverExampleBasic = () => {
    const elementRef = useRef()

    useResizeObserver({
        target: elementRef.current,
        onResize(entry) {
            console.log(entry)
        }
    })

    return (
        <div
            ref={elementRef}
            style={{ width: 200, height: 200, background: 'blue', resize: 'both', overflow: 'hidden' }}
        ></div>
    )
}

export { UseResizeObserverExampleBasic }
