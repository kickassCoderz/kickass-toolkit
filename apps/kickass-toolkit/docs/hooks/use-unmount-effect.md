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

## API Reference

### Properties

| Property     | Type               | Default | Description                                           |
| :----------- | :----------------- | :------ | :---------------------------------------------------- |
| `callbackFn` | `CallableFunction` | `none`  | A function which will be called on component unmount. |

### Return value

| Property    | Type   | Default | Description                        |
| :---------- | :----- | :------ | :--------------------------------- |
| `undefined` | `void` | `void`  | `useUnmountEffect` returns nothing |
