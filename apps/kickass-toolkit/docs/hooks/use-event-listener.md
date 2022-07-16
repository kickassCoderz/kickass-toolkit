# useEventListener

**useEventListener** is a wrapper around `addEventListener`

## Features

-   Subscribes event listener to target on mount
-   Unsubscribes event listener on unmount
-   Handles event listener objects
-   Full TS support for most targets (feel free to contact us if something is missing)
-   No need to wrap callback with `useCallback`, because hook manages callback mutation internally.

## Example usage

```jsx
import { useEventListener } from '@kickass-coderz/hooks'
import { useRef } from 'react'

const boxStyles = {
    width: 400,
    height: 400,
    backgroundColor: 'hotpink'
}

const MyComponent = () => {
    const boxRef = useRef()

    useEventListener(boxRef, 'mousemove', ({ offsetX, offsetY }) => {
        console.log({ offsetX, offsetY })
    })

    return <div ref={boxRef} style={boxStyles} />
}
```

## Api Reference

### Properties

| Property    | Type                                 | Default | Description                                                                                                                                                        |
| :---------- | :----------------------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `target`    | `EventTarget`                        | `none`  | Any valid `EventTarget`, be it `element`, `elementref`, `window`, `document` or for example `fileReader` instance.                                                 |
| `eventType` | `string`                             | `none`  | Any valid `EventType` for targeted reference. Types will be inferred based on target.                                                                              |
| `listener`  | `EventListenerOrEventListenerObject` | `none`  | A `function` or `EventListenerObject`. See more [here](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#the_event_listener_callback). |

### Return value

| Property    | Type   | Default | Description                        |
| :---------- | :----- | :------ | :--------------------------------- |
| `undefined` | `void` | `void`  | `useEventListener` returns nothing |
