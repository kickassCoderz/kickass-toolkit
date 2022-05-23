import { useCallbackRef, useResizeObserver } from '@kickass-coderz/hooks'
import React, { useRef, useState } from 'react'

const nes = e => {
    console.log('RED', e)
}
const nes1 = e => {
    console.log('BLUE', e)
}

const nes2 = e => {
    console.log('YELLOW', e)
}

const UseResizeObserverPage = () => {
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(true)

    const ref3 = useRef<HTMLDivElement>()
    const [ref, refCallback] = useCallbackRef<HTMLDivElement>()
    const [ref1, refCallback1] = useCallbackRef<HTMLDivElement>()

    useResizeObserver({ onResize: nes, target: ref })
    useResizeObserver({ onResize: nes1, target: ref1 })
    useResizeObserver({ onResize: nes2, target: ref3.current })

    return (
        <div>
            <h1>useResizeObserver</h1>
            <button onClick={() => setOpen(p => !p)}>OPEN</button>
            <button onClick={() => setOpen1(p => !p)}>OPEN1</button>
            {open && (
                <div ref={refCallback} style={{ width: '100%', height: '400px', backgroundColor: 'red' }}>
                    Teest div1
                </div>
            )}
            {open1 && (
                <div ref={refCallback1} style={{ width: '100%', height: '400px', backgroundColor: 'blue' }}>
                    Teest div2
                </div>
            )}
            <div ref={ref3} style={{ width: '100%', height: '400px', backgroundColor: 'yellow' }}>
                Teest div3
            </div>
        </div>
    )
}

export default UseResizeObserverPage
