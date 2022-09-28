---
sidebar_position: 7
---

# Existing DataService list

While creating a DataService is pretty easy sometimes you just wish to plug and play. Fortunately there are plenty official and 3party data services that you can use:

## Official data services

- RestDataService
- GraphQLDataService
- RpcDataService

You can use any of those by importing them from our library and using directly inside of your app. Follow [quick start](/docs/data-service/quick-start#using-dataservice) to learn more.

```js
import { RestDataService, GraphQLDataService, RpcDataService } from '@kickass-coderz/data-service'
```

## 3party data services

DataService as a concept took a lot of ideas from our friends at [Marmelab](https://marmelab.com/) and their `react-admin` library which uses data provider concept. It is a great library for creating ready made CMS application and they have a long history of maintainers and community (we are part of this community too). As DataService has a similar interface to any data provider you can actually use any of the premade data providers made for `react-admin`.

You can find the list of providers below but let's take a look of how you can use them as your DataService. We will take [ra-supabase](https://github.com/marmelab/ra-supabase) data provider as an example. Supabase is a open source alternative to Google's firebase.

### Install the data provider library

```bash npm2yarn
npm install ra-supabase # or any other data provider
```

### Create the data provider instance

```js
// dataProvider.js

import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

import { supabaseDataProvider } from 'ra-supabase';
import { supabase } from './supabase';

const resources = {
    posts: ['id', 'title', 'body', 'author_id', 'date'],
    authors: ['id', 'full_name'],
};

const dataProvider = supabaseDataProvider(supabase, resources);

export default dataProvider
```

### Create the DataService

```js
import { createFromDataProvider } from '@kickass-coderz/data-service'
import supabaseDataProvider from './dataProvider'

// this will create a DataService intance from exiting data provider
const supabaseDataService = createFromDataProvider(supabaseDataProvider)
```

### Use the DataService

```jsx
import { DataServiceProvider } from '@kickass-coderz/data-service'
import supabaseDataProvider from './dataProvider'

// this will create a DataService intance from exiting data provider
const supabaseDataService = createFromDataProvider(supabaseDataProvider)

const App = () => {
    return (
        <DataServiceProvider dataService={supabaseDataService}>
            <Component />
        </DataServiceProvider>
    )
}
```


