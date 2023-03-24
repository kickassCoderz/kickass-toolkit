# useMountEffect

**useMountEffect** is a simple wrapper around `useEffect` hook. It executes provided callback function when component is first mounted.

## Example usage

```jsx
import { useMountEffect } from '@kickass-coderz/hooks'

const MyPage = () => {
    useMountEffect(() => {
        //send some analyitics on mount

        analyitics.send({ title: 'My page' })
    })

    return <main></main>
}
```

## [API Reference](/docs/types/use-mount-effect)

[For detailed TypeScript and API reference click here.](/docs/types/use-mount-effect)
