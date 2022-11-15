# useStorageState

useStorageState is a hook which helps persist data in chosen storage API to keep state between page
reloads. Both [useSessionStorageState](/docs/use-session-storage-state) and [useLocalStorageState](/docs/use-local-storage-state) use it internally.

## Features

-   Familiar React API
-   Familiar browser API
-   Server-Side Rendering friendly
-   Full TypeScript support

## Example usage

Let's recreate [useLocalStorageState]("/docs/use-local-storage-state") with help of [useGlobalObject](/docs/use-global-object):

```jsx
import { useGlobalObject } from '@kickass-coderz/hooks'

const useLocalStorageState = (key: string, initialState: TUseStorageStateInitalState = null) => {
    return useStorageState(key, useGlobalObject().localStorage, initialState)
}
```

## [API Reference](/docs/types/use-storage-state#uselocalstoragestate)

[For detailed TypeScript and API reference click here.](/docs/types/use-storage-state#uselocalstoragestate)
