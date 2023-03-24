# useUnmountEffect

**useUnmountEffect** is a simple wrapper around `useEffect` hook. It executes provided callback function on component unmount.

## Example usage

```jsx
import { useUnmountEffect } from '@kickass-coderz/hooks'

const MyPage = () => {
    useUnmountEffect(() => {
        //send some analyitics on unmount

        analyitics.send({ title: 'My page' })
    })

    return <main></main>
}
```

## [API Reference](/docs/types/use-unmount-effect)

[For detailed TypeScript and API reference click here.](/docs/types/use-unmount-effect)
