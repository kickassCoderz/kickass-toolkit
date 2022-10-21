# useGlobalObject

Returns global object for current environment. Useful when you want to access global object from inside your component without checking manually which one is available.

- No more `typeof window !== 'undefined'` checks
- Works in both browser and server-side rendering
- Contains fallbacks for older browsers

## Example usage

```jsx
import { useGlobalObject } from '@kickass-coderz/hooks'

const Component = () => {
    const globalObject = useGlobalObject()

    return null
}
```

- for Browser it will return Window.
- for Node it will return Global object.


## [API Reference](/docs/types/use-global-object)

[For detailed TypeScript and API reference click here.](/docs/types/use-global-object)

