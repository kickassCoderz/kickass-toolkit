# useLocalStorageState

Just like React's useState but persits into browser local storage API to keep state between page reloads.

## Features

- Familiar React API
- Familiar browser API
- Server-Side Rendering friendly
- Full TypeScript support

## Basic usage

```jsx
import { useLocalStorageState } from '@kickass-coderz/hooks'

const Component = () => {
    // this will now persist in localStorage under the key 'count'
    const [count, setCount] = useLocalStorageState('count', 0)

    return (
        <button type="button" onClick={() => {
          setCount(count + 1)
        }}>Increment</button>
    )
}
```

## API Reference

### Properties

| Property       | Type                          | Default | Required | Description                                                     |
| :------------- | :---------------------------- | :------ | :------- | :-------------------------------------------------------------- |
| `initialState` | <code>string\|function</code> | `null`  | `false`  | Initial value for the state. It can also be a creator function. |

### Return value

| Property | Type    | Description                                                    |
| :------- | :------ | :------------------------------------------------------------- |
| Array    | `array` | Return value and setter function for updating the state value. |
