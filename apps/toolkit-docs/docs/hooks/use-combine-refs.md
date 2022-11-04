# useCombineRefs

Utility hook to combine multiple refs into a single one. 

## Example usage

```jsx
import { useRef } from 'react'
import { useCombineRefs } from '@kickass-coderz/hooks'

const Component = () => {
    const ref1 = useRef()
    const ref2 = useRef()
    const refCallback = useCombineRefs(ref1, ref2)

    return <div ref={refCallback} />
}
```

## When to use?

Usually when you want to get a reference to the DOM element of a component you would use `ref` prop on the element on React component to bind it to the reference like in the following example:

```jsx
const Component = () => {
    const ref = useRef()

    return <div ref={ref} />
}
```

Problem starts when you wish to apply multiple refs to the same element. For example together with your own ref you have a ref from 3party library that you also need to bind to the element.

```jsx
const Component = () => {
    const ref = useRef()
    const { ref: sliderRef } = useSlider()

    return <div ref={ref} /> // here you can not assing sliderRef because you already passed your own ref
}
```

`useCombineRefs` fixes this be giving you the single callback that you can pass to the `ref` prop and it will make sure the element reference is passed to all the refs you passed to the hook.


```jsx
const Component = () => {
    const ref = useRef()
    const { ref: sliderRef } = useSlider()
    const refCallback = useCombineRefs(ref, sliderRef)

    // now you can access ref.current or sliderRef.current
    // and they will both have the reference to the element
    return <div ref={refCallback} />
}
```


## [API Reference](/docs/types/use-callback-ref)

[For detailed TypeScript and API reference click here.](/docs/types/use-callback-ref)

