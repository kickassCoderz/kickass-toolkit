# useRequestAnimationFrame

Drop in replacement for requestAnimationFrame as a React hook

- Cancels pending animation frame callback on unmount
- Avoids memory leaks and invalid set state calls 
- Gives you an option to cancel animation frame callback manually for a custom action
- Server-Side Rendering friendly
- Full TypeScript support

## Example usage

```jsx
import { useRequestAnimationFrame, useInterval } from '@kickass-coderz/hooks'

const startTime = Date.now()

const Component = () => {
    const ref = useRef()
    const [execute] = useRequestAnimationFrame()

    useInterval(() => {
      execute(() => {
        // some dynamic calculation to apply animation
        // to the div element
        const diff = (Date.now() - startTime) / 1000
        element.style.transform = `translateX(${window.innerWidth * diff}px)`;
      })
    }, 1000)

    return (
        <div ref={ref} />
    )
}
```

## Manually clear animation frame callback

The hook will automatically cancel any pending animation frame callback when component unmounts. If you want to manually clear the animation frame callback you can use the `clear` function. For example if you want to ignore the callbacks pending after navigating back from the page.

```jsx
import { useRequestAnimationFrame, useInterval } from '@kickass-coderz/hooks'

const startTime = Date.now()

const Component = ({ goBack }) => {
    const ref = useRef()
    const [execute, clear] = useRequestAnimationFrame()

    useInterval(() => {
      execute(() => {
        // some dynamic calculation to apply animation
        // to the div element
        const diff = (Date.now() - startTime) / 1000
        element.style.transform = `translateX(${window.innerWidth * diff}px)`;
      })
    }, 1000)

    return (
        <div ref={ref} />
        <button type="button" onClick={() => {
            clear()
            goBack()
        }}>Go Back</button>
    )
}
```

## Re-render optimizations

There is no need to `useCallback` the function that `execute` returns because is has a stable reference.

```jsx
import { useRequestAnimationFrame } from '@kickass-coderz/hooks'

const startTime = Date.now()

const Component = ({ handleMove }) => {
    const ref = useRef()
    const [execute] = useRequestAnimationFrame()

    // Modal will not re-render because of the onMove prop
    // because execute will always return the same reference even
    // though handleMove reference changes
    return (
        <Modal onMove={execute(handleMove)} />
    )
}
```

## [API Reference](/docs/types/use-request-animation-frame)

[For detailed TypeScript and API reference click here.](/docs/types/use-request-animation-frame)

