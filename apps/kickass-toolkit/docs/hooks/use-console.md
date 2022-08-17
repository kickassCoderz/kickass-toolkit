# useConsole

Drop in replacement for console but it is reactive. Never again use console.log in your codebase.

## Features

- Supports all log methods as native browser logger
- Keep you console clean and only log when data you are logging changes
- It also automatically silences all logs if NODE_ENV is set to production
- Works with react devtools
- Server-Side Rendering friendly
- Full TypeScript support


## Example usage

We all do it... logging component props and doing infamous "Console Debugging"

```jsx
import { useConsole } from '@kickass-coderz/hooks'

const Component = (props) => {
    useConsole('log', 'Component props', props)

    return (
        <div>
            This is a component!
        </div>
    )
}
```

## Keep your console clean

useConsole (just like useEffect) executes only when some of its dependencies change. That means that new logs will appear in your console only when some data that you are logging changes. Keep in mind that hook is using [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) for equality check same as React.

```jsx
import { useConsole } from '@kickass-coderz/hooks'

const Component = (props) => {
    const [count, setCount] = useState(0)

    useConsole('warn', 'render', count) // this will only log when count changes

    return (
        <button type="button" onClick={() => {
          setCount(count + 1)
        }}>Increment</button>
    )
}
```

## Other console methods

Supports all the console methods that console inside your environment supports. List of methods for browser is [here](https://developer.mozilla.org/en-US/docs/Web/API/console#methods). This is `console.warn` equivalent example:

```jsx
import { useConsole } from '@kickass-coderz/hooks'

const Component = (props) => {
    useConsole('warn', 'render') // this will log warn level

    return (
        <div>
            This is a component!
        </div>
    )
}
```

Or `console.table` example:


```jsx
import { useConsole } from '@kickass-coderz/hooks'

const Component = ({ users }) => {
    useConsole('table', users, ['firstName']) //  this will log table level

    return (
        <div>
            This is a component!
        </div>
    )
}
```

## Watch for equality check

Be mindful of the example above. Even though it looks correct at first, the last dependency `['firstName']` will cause the hook to log on every render. To prevent this you would need to `useMemo` as you would with React `useEffect` or make  that argument a constant.

```jsx
import { useConsole } from '@kickass-coderz/hooks'

const columns = ['firstName'] // making columns constant to prevent rerender

const Component = ({ users }) => {
    useConsole('table', users, columns)

    return (
        <div>
            This is a component!
        </div>
    )
}
```

## Shortcut hooks

We also export few shortcut hooks that automatically log with specified log level. Depending on the usage we may in the future export more shortcuts for other log levels

```jsx
import { useConsoleLog, useConsoleWarn, useConsoleError, useConsoleInfo } from '@kickass-coderz/hooks'

useConsoleLog('render')

useConsoleWarn('memory leak detected') // this will log warn level

useConsoleError(error) // this will log error level

useConsoleInfo('mounted') // this will log info level
```

## API Reference

### Properties

| Property | Type            | Default | Required | Description                                                            |
| :------- | :-------------- | :------ | :------- | :--------------------------------------------------------------------- |
| `level`  | `TConsoleLevel` |         | true     | Define log level/method for the underlying     console implementation. |
| `args`   | `any[]`         | `[]`    | false    | Series of values you wish to log and watch for changes.                |

### Return value

| Property | Type   | Description                     |
| :------- | :----- | :------------------------------ |
|          | `void` | Hook does not return any value. |
