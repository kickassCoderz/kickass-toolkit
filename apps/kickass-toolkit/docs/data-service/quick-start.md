---
sidebar_position: 2
---

# Quick Start

Through the next few examples we will teach you have to fetch data from [Punk API](https://punkapi.com/documentation/v2). This is a JSON based REST API. You will get familiar with all the basic concepts so you can take it away working on your own project.

## Installation

```bash npm2yarn
npm install @kickass-coderz/data-service
```

## Using DataService

To start working with our hooks first you need a DataService instance which will actually make underlying API calls. You can create your own by implementing our `IDataService` interface or by using one of our premade classes.

We provide following data services as part of the library:
- RestDataService
- GraphQLDataService
- RpcDataService

```ts
import { RestDataService } from '@kickass-coderz/data-service'
```

To implement your own DataService you can check out the [following example](/docs/data-service/creating-custom-service).

## Adding a provider to your app

Now that you have your DataService ready you need to hook it up inside your app. Best place for that is inside the root file of your application. We will also use our `RestDataService` for the examples. As mentioned before we will be fetching some beers from [Punk API](https://punkapi.com/documentation/v2).

### Create React App

For CRA (Create React App) that would be `src/index.js` or `src/index.tsx` (for Typescript) file.

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { RestDataService, DataServiceProvider } from '@kickass-coderz/data-service'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
const dataService = new RestDataService('https://api.punkapi.com/v2')

root.render(
    <React.StrictMode>
        <DataServiceProvider dataService={dataService}>
          <App />
        </DataServiceProvider>
    </React.StrictMode>
)
```

### Next.js

For Next you whould add the provider to your `_app.js` or `_app.tsx` file. If you do not have this file already you can create it from the example below.

```tsx
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { RestDataService, DataServiceProvider } from '@kickass-coderz/data-service'

const dataService = new RestDataService('https://api.punkapi.com/v2')

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>My Next App</title>
            </Head>
            <DataServiceProvider dataService={dataService}>
                <Component {...pageProps} />
            </DataServiceProvider>
        </>
    )
}

export default MyApp
```

Now you can start using the hooks to fetch and use data inside your components.

## Fetching data

We provide the hooks that match `IDataService` interface. So for example if you wish to fetch a list of items from your API you would use `useGetList` hook that will call `DataService.getList` method under the hood.

```tsx
import { useGetList } from '@kickass-coderz/data-service'

const Component = () => {
    const { data, isLoading } = useGetList({
        resource: 'beers' // this calls https://api.punkapi.com/v2/beers
    })

    if (isLoading) {
        // show loading indicator until data is loaded
        // data will be undefined until fetched for the first time
        return <div>Loading</div>
    }

    return (
        <ul>
            {data.map(item => {
                return <li>{item.name}</li>
            })}
        </ul>
    )
}
```

To fetch data for single beer we just need `useGetOne` hook that will call `DataService.getOne` method under the hood.

```tsx
const { data, isLoading } = useGetOne({
    resource: 'beers',
    params: {
        id: 1 // this calls https://api.punkapi.com/v2/beers/1
    }
})
```

We also provide hook for other REST methods and CRUD actions:
- useCreateOne (and useCreateMany)
- useUpdateOne (and useUpdateMany)
- useDeleteOne (and useDeleteMany)

The methods ending with `Many` are special methods that can get, create, update or delete multiple records in the same time. You can read more in our [Fetching multiple resources](/docs/data-service/fetching-multiple-resources) guide.

### Error handling

If any kind of error occurs during data fetching you will get it through `error` property.

```tsx
const { error, isError } = useGetOne({
    resource: 'beers',
    params: {
        id: 1 // this calls https://api.punkapi.com/v2/beers/1
    }
})

if (isError) {
  return <ErrorMessage error={error}>
}
```

You can also detect if the hook is in error state with `isError` property.

## Bonus features

:::info

Remember that we handle caching, background updates, retries and stale data out of the box with zero-configuration. **In case you don't know what that means or are interested in more details you can find concrete examples below**.

:::

### Caching

All of the data you fetch from your API is automatically cached on the client side. Which means that if you fetch some data from your API in component A and call the same hook inside component B, there will be no additional network call. The component B will just reuse the cached data. If you wish to know more check out our [Caching topic](/docs/data-service/data-client#caching).

### Background updates and stale data

If any of the data becomes stale (cache is no longer valid) our hooks will automatically fetch the data again. If multiple instaces of the same hook are active there will be only one network call and other hooks will just reuse the newly fetched data. 

### Automatic retrys

If any of the calls to your API fail for some reason (promise gets rejected) our hooks will automatically retry for a chance to get the data. If that fails multiple times you will get an `error` object which you can then use to show error state inside your app. You can find more about this from our [DataClient page](/docs/data-service/data-client).
