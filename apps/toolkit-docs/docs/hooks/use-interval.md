# useInterval

Drop in replacement for setInterval as a React hook.

## Features

- Automatically schedules the interval on first render
- Clears active interval on unmount
- Gives you an option to clear interval manually before unmount or for a custom action
- Server-Side Rendering friendly
- Full TypeScript support

## Example usage

```jsx
import { useInterval } from '@kickass-coderz/hooks'

const Component = () => {
    useInterval(() => {
      console.log('ping')
    }, 1000)

    return (
        <div>
            This is a component!
        </div>
    )
}
```

## Manually stop interval

```jsx
import { useInterval } from '@kickass-coderz/hooks'

const Component = () => {
    const stop = useInterval(() => {
      console.log('ping')
    }, 1000)

    return (
        <button type="button" onClick={() => {
          stop()
        }}>Stop</button>
    )
}
```

## [API Reference](/docs/types/use-interval)

[For detailed TypeScript and API reference click here.](/docs/types/use-interval)
