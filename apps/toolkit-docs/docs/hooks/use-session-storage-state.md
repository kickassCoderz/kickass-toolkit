# useSessionStorageState

Just like React's useState but persits into browser session storage API to keep state between page reloads.

## Features

- Familiar React API
- Familiar browser API
- Server-Side Rendering friendly
- Full TypeScript support

## Example usage

```jsx
import { useSessionStorageState } from '@kickass-coderz/hooks'

const Component = () => {
    // this will now persist in sessionStorage under the key 'count'
    const [count, setCount] = useSessionStorageState('count', 0)

    return (
        <button type="button" onClick={() => {
          setCount(count + 1)
        }}>Increment</button>
    )
}
```

## Setter function

You can also use a setter function to update the state.

```jsx
const [count, setCount] = useSessionStorageState('count', 0)

const onClick = () => {
  setCount(currentCount => currentCount + 1)
}
```

It is also useful when you want to memoize event handler without changing the reference
after each state update.

The example below will cause unecessary re-renders for any component that gets onClick handler through props.

```jsx
const [count, setCount] = useSessionStorageState('count', 0)

const onClick = useCallback(() => {
  setCount(count + 1)
}, [count]) // onClick reference will change after each state update
```

The example below will fix that keeping the onClick reference the same.

```jsx
const [count, setCount] = useSessionStorageState('count', 0)

const onClick = useCallback(() => {
  // we get the current state as an argument for our setter function
  setCount(currentCount => currentCount + 1)
}, []) // onClick reference will stay the same avoiding re-renders
```

## [API Reference](/docs/types/use-storage-state#usesessionstoragestate)

[For detailed TypeScript and API reference click here.](/docs/types/use-storage-state#usesessionstoragestate)
