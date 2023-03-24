import { assert } from '@kickass-coderz/kickass-js'
import { createContextProvider, Dynamic, Show } from '@kickass-coderz/kickass-react'
import { forwardRef, useRef } from 'react'

type TProviderProperties = {
    children: React.ReactNode
    showMessage: boolean
}

type TProviderContext = {
    message: string
}

const [Provider, useProvider] = createContextProvider<TProviderContext, TProviderProperties>(properties => {
    return {
        message: properties.showMessage ? 'Hello World' : 'No message for You!'
    }
})

type TButtonProperties = Omit<React.ComponentPropsWithRef<'button'>, 'color'> & {
    color?: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet'
    variant?: 'primary' | 'secondary'
}

const Button = forwardRef<HTMLButtonElement, TButtonProperties>((properties, reference) => {
    return <button {...properties} ref={reference} />
})

Button.displayName = 'MyButton'

const Message = () => {
    const providerContext = useProvider()
    const reference = useRef<HTMLButtonElement>(null)

    assert(providerContext?.message)

    return (
        <Dynamic component="h1">
            {providerContext.message}
            <Dynamic component={Button} ref={reference} color="green" variant="secondary">
                Click Me!
            </Dynamic>
        </Dynamic>
    )
}

function App() {
    const object = { sale: { peder: 'bome je' } }
    return (
        <Provider showMessage>
            <Message />
            <Show when={true} fallback={'hello'}>
                <div>Hello</div>
                <div>World</div>
            </Show>
            <Show when={object.sale} fallback={'bla bla'}>
                {item => {
                    return <div>{item.peder}</div>
                }}
            </Show>
        </Provider>
    )
}

export default App
