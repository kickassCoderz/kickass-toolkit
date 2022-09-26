---
sidebar_position: 2.5
---

# CRUD operations

In addition fetching data with `get` calls there are also hooks for other CRUD actions. We will go through those in the examples below.

:::note

Make sure you have your DataService setup. If not check our [quick start](/docs/data-service/quick-start#using-dataservice).

:::

## Creating new record

You can create new records through the `useCreateOne` hook, for example if we want to upload and create a new image to our API.

```ts
const createOne = useCreateOne({
    resource: 'images'
})

// calling this method would call POST /api/images
const onCreate = (image: { title: string; blob: File }) => {
    createOne.mutate({ payload: image })
}
```

Nice and easy, but it is important to note another cool thing about this hook. As DataService knows how the records and relations operate in context of CRUD operations cache is managed automatically under the hood.

For example after the above `onCreate` function resolves, two things happen:
- all cache for `useGetList` calls that was valid for `images` resources is cleared - this is to make sure that when that data is needed again the DataService goes to API for the fresh data eg. list should now contain the newly created image
- cache for `useGetOne` hook is automatically prefilled with result of `createOne` - there will be no additional API call as the result is cached automatically

## Updating record

With `useUpdateOne` hook you can update existing records, for example if we want to update a image.

```ts
const updateOne = useUpdateOne({
    resource: 'images'
})

// calling this method would call PUT /api/images/:id
const onUpdate = (image: { id: number; title: string; blob: File }) => {
    updateOne.mutate({ 
        id: image.id,
        payload: image
    })
}
```

Same as for `useCreateOne` hook the cache is also managed automatically so after `onUpdate` function above resolves these things will happen:
- all cache for `useGetList` calls that was valid for `images` resources is cleared - this is to make sure that when that data is needed again the DataService goes to API for the fresh data eg. list should now show updated image
- cache for `useGetOne` hook is automatically prefilled with result of `updateOne` - there will be no additional API call as the result is cached automatically
- all cache for `useGetMany` calls that was valid for `images` resources is cleared - this is to make sure that when that data is needed again the DataService goes to API for the fresh data (you can read more in our [Fetching multiple resources](/docs/data-service/fetching-multiple-resources) guide)

## Deleting record

In similar manner, we can also delete a image.

```ts
const deleteOne = useDeleteOne({
    resource: 'images'
})

// calling this method would call DELETE /api/images/:id
const onDelete = (images: { id: number; title: string; blob: File }) => {
    deleteOne.mutate({ 
        id: image.id
    })
}
```

`useDeleteOne` hook also automatically manages cache so after `onDelete` function above resolves these things will happen:
- all cache for `useGetList` calls that was valid for `images` resources is cleared - this is to make sure that when that data is needed again the DataService goes to API for the fresh data eg. list should not show deleted image
- cache for `useGetOne` hook is automatically cleared eg. that hook should now show no data and optionally (depending on your API) return HTTP `404` status
- all cache for `useGetMany` calls that was valid for `images` resources is cleared - this is to make sure that when that data is needed again the DataService goes to API for the fresh data (you can read more in our [Fetching multiple resources](/docs/data-service/fetching-multiple-resources) guide)
