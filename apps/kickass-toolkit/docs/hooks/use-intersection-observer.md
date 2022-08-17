# useIntersectionObserver

Drop in replacement for IntersectionObserver as a React hook.

## Features

- Subscribe to intersection changes for the given target
- Full TypeScript support
- Cleans up observer subscription on unmount
- Reuses observer - calling the same hook multiple times will reuse the same observer instance saving memory

## Example usage

Do not render the video if it is not visible on the screen.

```jsx
import { useIntersectionObserver } from '@kickass-coderz/hooks'

const Component = () => {
    const videoContainerRef = useRef()
    const [isVideoVisible, setVideoVisible] = useState(false)
    useIntersectionObserver(([entry]) => {
      setVideoVisible(entry.isIntersecting)
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.99
    })

    return (
      <div ref={videoContainerRef}>
        {isVideoVisible && (
          <video width="1920" height="1080" controls>
            <source src="movie.mp4" type="video/mp4">
          </video>
        )}
      </div>
    )
}
```

## Memory optimization

As said above, `useIntersectionObserver` reuses observer instance to save memory. So calling the hook multiple times will not create new IntersectionObserver instance. It achives this by attaching callbacks for different targets and options inside the observer pool `Array`. Before adding any new observers this `Array` is check if the matching observer already exists, and if it does it will reuse it. This `Array` is also checked when change is detected for the target and each registered callback for the observer is called sequentially.

## [API Reference](/docs/types/use-intersection-observer)

[For detailed TypeScript and API reference click here.](/docs/types/use-intersection-observer)
