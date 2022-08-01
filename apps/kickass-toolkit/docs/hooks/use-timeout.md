# useTimeout

Drop in replacement for setTimeout as a React hook.

## Features

- Automatically schedules the timeout on first render
- Clears active timeout on unmount
- Gives you an option to clear timeout manually before it executes or for a custom action
- Server-Side Rendering friendly
- Full TypeScript support

## Basic usage

```jsx
import { useTimeout } from '@kickass-coderz/hooks'

const Component = () => {
    useTimeout(() => {
      console.log('ping')
    }, 1000)

    return (
        <div>
            This is a component!
        </div>
    )
}
```

## Manually cancel timeout

```jsx
import { useTimeout } from '@kickass-coderz/hooks'

const Component = () => {
    const cancel = useTimeout(() => {
      console.log('Wake up!!!!')
    }, 3600)

    return (
        <button type="button" onClick={() => {
          cancel()
        }}>Cancel</button>
    )
}
```

## API Reference

### Properties

| Property   | Type       | Default     | Required | Description                                                          |
| :--------- | :--------- | :---------- | :------- | :------------------------------------------------------------------- |
| `callback` | `function` |             | true     | Callback funtion to execute after timeout.                           |
| `ms`       | `number`   | `0`         | false    | Timeout in miliseconds.                                              |
| `args`     | `any[]`    | `undefined` | false    | Arguments to be passed to `callback` function when timeout executes. |

### Return value

| Property | Type       | Description             |
| :------- | :--------- | :---------------------- |
| clear    | `function` | Clears running timeout. |
