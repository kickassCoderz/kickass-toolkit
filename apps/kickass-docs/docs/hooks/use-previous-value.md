# usePreviousValue

Hook that returns the previous value of the given value. In React terms that would be a value during previous render.

:::info

Hook return value is always undefined on the first render.

:::info


## Example usage

```jsx
import { useState } from 'react'
import { usePreviousValue } from '@kickass-coderz/hooks'

const Component = ({ handleUpvote }) => {
    const [value, setValue] = useState(1)

    // after each increment this will return the previous value
    // if value becomes 2, previousValue will be 1
    // if value becomes 3, previousValue will be 2
    // ...
    const previousValue = usePreviousValue(value)

    return (
        <button type="button" onClick={() => {
          setValue(count + 1)
        }}>Increment</button>
    )
}
```


## [API Reference](/docs/types/use-previous-value)

[For detailed TypeScript and API reference click here.](/docs/types/use-previous-value)

