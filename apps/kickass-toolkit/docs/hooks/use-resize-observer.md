# useResizeObserver

Drop in replacement for ResizeObserver as a React hook.

## Features

- Subscribe to size changes for the given target
- Full TypeScript support
- Cleans up observer subscription on unmount
- Reuses observer - calling the same hook multiple times will reuse the same observer instance saving memory

## Example usage

Detect window width changes and show modal that spans full screen.

```jsx
import { useResizeObserver } from '@kickass-coderz/hooks'

const Component = () => {
    const [width, setWidth] = useState(0)
    useResizeObserver(document.body, ([entry]) => {
      setWidth(entry.borderBoxSize.inlineSize)
    })

    return (
        {width > 0 && (
          <div style={{ position: 'absolute', width }} />
        )}
    )
}
```

## Usage with React ref

As this is a React hook we also support passing React ref as a target directly.

```jsx
import { useResizeObserver } from '@kickass-coderz/hooks'

const Component = () => {
    const [width, setWidth] = useState(0)
    const ref = useRef()

    useResizeObserver(ref, ([entry]) => {
      setWidth(entry.borderBoxSize.inlineSize)
    })

    return (
        <div ref={ref} />
    )
}
```

## Memory optimization

As said above, `useResizeObserver` reuses observer instance to save memory. So calling the hook multiple times will not create new ResizeObserver instance. It achives this by attaching callbacks for different targets inside the callbacks `Map`. This `Map` is then checked when change is detected for the target and each registered callback is called sequentially.

## [API Reference](/docs/types/use-resize-observer)

[For detailed TypeScript and API reference click here.](/docs/types/use-resize-observer)
