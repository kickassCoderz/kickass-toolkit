# useMediaQuery

Drop in replacement for media query detection and browser matchMedia as a React hook.

## Features

- Subscribes event listener to document media query status - weather or not the document matches the media
- Full TypeScript support
- Server-Side Rendering ready (check examples below)
- Cleans up event listener on unmount
- Reuses event listeners - calling the same hook twice will save memory and listener will be reused


## Basic usage

```jsx
import { useMediaQuery } from '@kickass-coderz/hooks'
import { MobileNav, DesktopNav } from './components'

const Layout = () => {
    const { matches } = useMediaQuery('max-width: 600px')

    return (
        <div>
            {matches ? <MobileNav> : <DesktopNav>}
        </div>
    )
}
```

## Server-Side Rendering (SSR)

On the server side you can not know document media like resolution or document size, so for that case `useMediaQuery` exposes `options.initialValue` option. You can use it to set the value of the `mediaQuery.matches` during SSR and initial render, then after hydration the value will be updated depending on the document. 

```jsx
import { useMediaQuery } from '@kickass-coderz/hooks'
import { MobileNav, DesktopNav } from './components'

const Layout = () => {
    const { matches } = useMediaQuery('max-width: 600px', {
        initialValue: true // by default render mobile navigation
    })

    return (
        <div>
            {matches ? <MobileNav> : <DesktopNav>}
        </div>
    )
}
```

This fixes server vs client [mismatches during hydration](https://nextjs.org/docs/messages/react-hydration-error). The `options.initialValue` is not required and if not provided the hook will return `false` for `mediaQuery.matches` during SSR and initial render.

Also, if you have some kind of document or viewport detection on the server side, here is an example how to pass it to our hook:

```jsx
import { useMediaQuery } from '@kickass-coderz/hooks'
import { MobileNav, DesktopNav } from './components'

export const getServerSideProps = ({ req }) => {
  return {
    props: {
      // render mobile navigation if mobile user-agent
      matches: req.headers['user-agent'].includes('Mobile')
    }
  }
}

const Layout = ({ matches: matchesSSR }) => {
    const { matches } = useMediaQuery('max-width: 600px', {
        initialValue: matchesSSR
    })

    return (
        <div>
            {matches ? <MobileNav> : <DesktopNav>}
        </div>
    )
}
```

## API Reference

### Properties

| Property               | Type                    | Default     | Required | Description                                                                                                                                                                                                                                          |
| :--------------------- | :---------------------- | :---------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `query`                | `string`                |             | true     | A string specifying the media query to parse into a MediaQueryList.                                                                                                                                                                                  |
| `options`              | `TUseMediaQueryOptions` | `{}`        | false    | Additional options.                                                                                                                                                                                                                                  |
| `options.initialValue` | `boolean`               | `undefined` | false    | Value that will be used for the initial render, use when evironment does not support matchMedia eg. during SSR (Server Side Rendering). If not provided it will default to `matchMedia.matches` in browser and to `false` in all other environments. |

### Return value

| Property             | Type      | Description                                                                                                |
| :------------------- | :-------- | :--------------------------------------------------------------------------------------------------------- |
| `mediaQuery`         | `object`  | Media query properties.                                                                                    |
| `mediaQuery.matches` | `boolean` | A boolean value that returns true if the document currently matches the media query list, or false if not. |
