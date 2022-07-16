# useMountEffect

**useMountEffect** is a simple wrapper around `useEffect` hook. It executes provided callback function when component is first mounted.

## Example usage

```jsx
import { useMountEffect } from '@kickass-coderz/hooks'

const MyPage = () => {
    useMountEffect(() => {
        //send some analyitics on mount

        analyitics.send({ title: 'My page' })
    })

    return <main></main>
}
```

## API Reference

### Properties

| Property     | Type               | Default | Description                                         |
| :----------- | :----------------- | :------ | :-------------------------------------------------- |
| `callbackFn` | `CallableFunction` | `none`  | A function which will be called on component mount. |

### Return value

| Property    | Type   | Default | Description                      |
| :---------- | :----- | :------ | :------------------------------- |
| `undefined` | `void` | `void`  | `useMountEffect` returns nothing |
