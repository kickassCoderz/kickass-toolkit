# useIsBrowser

Check if current environment is browser. Useful during SSR.

- No more `typeof window !== 'undefined'` checks
- Server-side rendering friendly

## Example usage

```jsx
import { useIsBrowser } from '@kickass-coderz/hooks'

const Component = () => {
    const isBrowser = useIsBrowser()

    return null
}
```

- for Browser it will return `true`.
- for Node it will return `false`

## Server-Side Rendering (SSR) and outside of React usage

For SSR and outside of React you can use `getIsBrowser` helper, even though `useIsBrowser` will also work because it does not use any of the React APIs so for Node environment it is just a function. 

```js
import { getIsBrowser } from '@kickass-coderz/hooks'
```

## [API Reference](/docs/types/use-is-browser)

[For detailed TypeScript and API reference click here.](/docs/types/use-is-browser)

