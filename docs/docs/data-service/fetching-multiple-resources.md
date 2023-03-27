---
sidebar_position: 5
---

# Fetching multiple resources

In addition to usual CRUD API calls DataService is capable of doing those on the many records at once. Continuing from our previous examples we will again fetch some data (beers) from [Punk API](https://punkapi.com/documentation/v2).

:::note

Make sure you have your DataService setup. If not check our [quick start](/docs/data-service/quick-start#using-dataservice).

:::

## Fetching many records

For example if you wish to fetch 3 featured beers for your homepage you would do it like this:

```tsx
import { useGetMany } from '@kickass-coderz/data-service'

const Component = () => {
    const { data, isLoading } = useGetMany({
        ids: [1, 2, 3]
        // this calls:
        // https://api.punkapi.com/v2/beers/1
        // https://api.punkapi.com/v2/beers/2
        // https://api.punkapi.com/v2/beers/3
    })

    if (isLoading) {
        // show loading indicator until data is loaded
        // data will be undefined until fetched for the first time
        return <div>Loading</div>
    }

    return (
        <>
            <h3>Featured</h3>
            <ul>
                {data.map(item => {
                    return <li>{item.name}</li>
                })}
            </ul>
        </>
    )
}
```

To understand how this works we need to take a look at our `getMany` method from our `RestDataService`.

```ts
class RestDataService implements IDataService {
    // rest of the methods

    async getMany<T extends TBaseResponse>(
        resource: string,
        params: TGetManyParameters,
        context?: TQueryContext | undefined
    ): Promise<T[]> {
        const results = await Promise.all(params.ids.map(id => this.getOne<T>(resource, { id })))

        return results
    }

    // rest of the methods
}
```

As you can see the implementation basically calls `getOne` method for each of the provided `params.ids` and then merges the results and returns them in the same array. This is useful because:

-   you do not need to worry about doing that yourself
-   you can decide how you wish to do paralization (if creating a custom DataService)

## Creating many records

Fetching multiple records together is useful but sometiems you also want to create many in the same time. For example if we want to upload and create multiple images.

```ts
const createMany = useCreateMany({
    resource: 'images'
})

// calling this method would call POST /api/images for each image
const onCreate = (images: { title: string; blob: File }[]) => {
    createMany.mutate({ payload: images })
}
```

## Updating many records

Fetching multiple records together is useful but sometiems you also want to update many in the same time. For example if we want to update multiple images.

```ts
const updateMany = useUpdateMany({
    resource: 'images'
})

// calling this method would call PUT /api/images/:id for each image
const onUpdate = (images: { id: number; title: string; blob: File }[]) => {
    updateMany.mutate({
        ids: images.map(image => image.id),
        payload: images
    })
}
```

## Deleting many records

In similar manner, we can also delete multiple images.

```ts
const deleteMany = useDeleteMany({
    resource: 'images'
})

// calling this method would call DELETE /api/images/:id for each image
const onDelete = (images: { id: number; title: string; blob: File }[]) => {
    deleteMany.mutate({
        ids: images.map(image => image.id)
    })
}
```

## Cache management

`Many` hooks also manage cache automatically same as their `One` counterparts. You can read more about that in our [CRUD operations](/docs/data-service/crud-operations) section.
