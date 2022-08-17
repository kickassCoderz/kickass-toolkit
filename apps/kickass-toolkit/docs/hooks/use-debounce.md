# useDebounce

Returns a function that can be used to debounce events, callbacks and function calls for specific delay.

- Clears hanging debounce calls on unmount
- Avoids memory leaks and invalid set state calls 
- Gives you an option to clear debounce manually for a custom action
- Server-Side Rendering friendly
- Full TypeScript support

## Example usage

Let's say you have an Upvote button on your page and you want to avoid users spamming the upvote button and your
your API endpoint. For this example `handleUpvote` is a function that upvotes by doing the API call to the server.

```jsx
import { useDebounce } from '@kickass-coderz/hooks'

const Component = ({ handleUpvote }) => {
    const [execute] = useDebounce(1000)

    return (
        <button type="button" onClick={execute(handleUpvote)}>Upvote</button>
    )
}
```

## What is debouncing?

Debouncing will truncate a series of sequential calls to a function into a single call to that function.
For example it ensures that one notification is made for an event that fires multiple times.


## Manually clear debounce

The hook will automatically clear any pending debounce calls when component unmounts. If you want to manually clear the debounce call you can use the `clear` function. For example if you want to ignore the calls pending after navigating back from the page.

```jsx
import { useDebounce } from '@kickass-coderz/hooks'

const Component = ({ handleUpvote, goBack }) => {
    const [execute, clear] = useDebounce(1000)

    return (
        <button type="button" onClick={execute(handleUpvote)}>Upvote</button>
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
import { useDebounce } from '@kickass-coderz/hooks'

const Component = ({ handleUpvote, goBack }) => {
    const [execute, clear] = useDebounce(1000)

    // UpVoteButton will not re-render because of the onClick prop
    // because execute will always return the same reference even
    // though handleUpvote reference changes
    return (
        <UpVoteButton onClick={execute(handleUpvote)} />
    )
}
```



## [API Reference](/docs/types/use-debounce)

[For detailed TypeScript and API reference click here.](/docs/types/use-debounce)

