import { useDebouncedCallback } from '@kickass-coderz/hooks'
import { ChangeEvent, useState } from 'react'

const UseDebouncedCallbackExampleBasic = () => {
    const [state, setState] = useState('')

    const [handleChange] = useDebouncedCallback((event: ChangeEvent<HTMLInputElement>) => {
        console.log(event)
        setState(event.target.value)
    }, 1000)

    return (
        <div>
            <div>value:{state}</div>
            <input type="text" onChange={handleChange} />
        </div>
    )
}

export { UseDebouncedCallbackExampleBasic }
