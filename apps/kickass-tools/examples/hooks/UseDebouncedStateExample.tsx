import { useDebouncedState } from '@kickass-coderz/hooks'

const UseDebouncedStateExampleBasic = () => {
    const [state, setState] = useDebouncedState('', 500)

    return (
        <div>
            <div>value:{state}</div>
            <input type="text" onChange={e => setState(e.target.value)} />
        </div>
    )
}

export { UseDebouncedStateExampleBasic }
