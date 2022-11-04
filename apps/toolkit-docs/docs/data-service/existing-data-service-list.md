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

DataService as a concept took a lot of ideas from our fellow developers at [Marmelab](https://marmelab.com/) and their `react-admin` library which uses data provider concept. It is a great library for creating ready made CMS application and they have a long history of maintainers and community (we are part of this community too). As DataService has a similar interface to any data provider you can actually use any of the premade data providers made for `react-admin`.

### Using data provider as DataService

You can find the list of providers [below](/docs/data-service/existing-data-service-list#data-provider-list) but let's take a look of how you can use them as your DataService. We will take [ra-supabase](https://github.com/marmelab/ra-supabase) data provider as an example. Supabase is a open source alternative to Google's firebase.


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

For other data providers you should check their Docs/README to see the necessary parameters.

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

const supabaseDataService = createFromDataProvider(supabaseDataProvider)

const App = () => {
    return (
        <DataServiceProvider dataService={supabaseDataService}>
            <Component />
        </DataServiceProvider>
    )
}
```

### Data provider list

Check the list below for open-source packages developed and maintained by developers from the react-admin community. You can use any of those as your DataService by [using the `createFromDataProvider` helper](/docs/data-service/existing-data-service-list#using-data-provider-as-dataservice).

* **[AWS Amplify](https://docs.amplify.aws)**: [MrHertal/react-admin-amplify](https://github.com/MrHertal/react-admin-amplify)
* **[Blitz-js](https://blitzjs.com/docs)**: [theapexlab/ra-data-blitz](https://github.com/theapexlab/ra-data-blitz)
* **[Configurable Identity Property REST Client](https://github.com/zachrybaker/ra-data-rest-client)**: [zachrybaker/ra-data-rest-client](https://github.com/zachrybaker/ra-data-rest-client)
* **[coreBOS](https://corebos.com/)**: [React-Admin coreBOS Integration](https://github.com/coreBOS/reactadminportal)
* **[Django Rest Framework](https://www.django-rest-framework.org/)**: [bmihelac/ra-data-django-rest-framework](https://github.com/bmihelac/ra-data-django-rest-framework)
* **[Eve](https://docs.python-eve.org/en/stable/)**: [smeng9/ra-data-eve](https://github.com/smeng9/ra-data-eve)
* **[Express & Mongoose](https://github.com/NathanAdhitya/express-mongoose-ra-json-server)**: [NathanAdhitya/express-mongoose-ra-json-server](https://github.com/NathanAdhitya/express-mongoose-ra-json-server)
* **[Express & Sequelize](https://github.com/lalalilo/express-sequelize-crud)**: [express-sequelize-crud](https://github.com/lalalilo/express-sequelize-crud)
* **[FakeRest](https://github.com/marmelab/FakeRest)**: [marmelab/ra-data-fakerest](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-fakerest)
* **[Feathersjs](https://www.feathersjs.com/)**: [josx/ra-data-feathers](https://github.com/josx/ra-data-feathers)
* **[Firebase Firestore](https://firebase.google.com/docs/firestore)**: [benwinding/react-admin-firebase](https://github.com/benwinding/react-admin-firebase).
* **[Firebase Realtime Database](https://firebase.google.com/docs/database)**: [aymendhaya/ra-data-firebase-client](https://github.com/aymendhaya/ra-data-firebase-client).
* **[GeoServer](http://geoserver.org/)**: [sergioedo/ra-data-geoserver](https://github.com/sergioedo/ra-data-geoserver)
* **[Google Sheets](https://www.google.com/sheets/about/)**: [marmelab/ra-data-google-sheets](https://github.com/marmelab/ra-data-google-sheets)
* **[GraphQL (generic)](https://graphql.org/)**: [marmelab/ra-data-graphql](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-graphql) (uses [Apollo](https://www.apollodata.com/))
* **[GraphQL (simple)](https://graphql.org/)**: [marmelab/ra-data-graphql-simple](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-graphql-simple).
* **[HAL](http://stateless.co/hal_specification.html)**: [b-social/ra-data-hal](https://github.com/b-social/ra-data-hal)
* **[Hasura](https://github.com/hasura/graphql-engine)**: [hasura/ra-data-hasura](https://github.com/hasura/ra-data-hasura), auto generates valid GraphQL queries based on the properties exposed by the Hasura API.
* **[Hydra](https://www.hydra-cg.com/) / [JSON-LD](https://json-ld.org/)**: [api-platform/admin/hydra](https://github.com/api-platform/admin/blob/master/src/hydra/dataProvider.ts)
* **[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)**: [tykoth/ra-data-dexie](https://github.com/tykoth/ra-data-dexie)
* **[JSON API](https://jsonapi.org/)**: [henvo/ra-jsonapi-client](https://github.com/henvo/ra-jsonapi-client)
* **[JSON HAL](https://tools.ietf.org/html/draft-kelly-json-hal-08)**: [ra-data-json-hal](https://www.npmjs.com/package/ra-data-json-hal)
* **[JSON server](https://github.com/typicode/json-server)**: [marmelab/ra-data-json-server](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-json-server)
* **[LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)**: [marmelab/ra-data-localstorage](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-localstorage)
* **[Loopback3](https://loopback.io/lb3)**: [darthwesker/react-admin-loopback](https://github.com/darthwesker/react-admin-loopback)
* **[Loopback4](https://loopback.io/)**: [elmaistrenko/react-admin-lb4](https://github.com/elmaistrenko/react-admin-lb4)
* **[Loopback4 CRUD](https://github.com/loopback4/loopback-component-crud)**: [loopback4/ra-data-lb4](https://github.com/loopback4/ra-data-lb4)
* **[Mixer](https://github.com/ckoliber/ra-data-mixer)**: [ckoliber/ra-data-mixer](https://github.com/ckoliber/ra-data-mixer)
* **[Moleculer Microservices](https://github.com/RancaguaInnova/moleculer-data-provider)**: [RancaguaInnova/moleculer-data-provider](https://github.com/RancaguaInnova/moleculer-data-provider)
* **[NestJS CRUD](https://github.com/nestjsx/crud)**: [rayman1104/ra-data-nestjsx-crud](https://github.com/rayman1104/ra-data-nestjsx-crud)
* **[OData](https://www.odata.org/)**: [Groopit/ra-data-odata-server](https://github.com/Groopit/ra-data-odata-server)
* **[OpenCRUD](https://www.opencrud.org/)**: [weakky/ra-data-opencrud](https://github.com/Weakky/ra-data-opencrud)
* **[Parse](https://parseplatform.org/)**: [almahdi/ra-data-parse](https://github.com/almahdi/ra-data-parse)
* **[PostGraphile](https://www.graphile.org/postgraphile/)**: [bowlingx/ra-postgraphile](https://github.com/BowlingX/ra-postgraphile)
* **[PostgREST](https://postgrest.org/)**: [raphiniert-com/ra-data-postgrest](https://github.com/raphiniert-com/ra-data-postgrest)
* **[Prisma v1](https://v1.prisma.io/docs/1.34)**: [weakky/ra-data-prisma](https://github.com/weakky/ra-data-prisma)
* **[Prisma v2 (GraphQL)](https://www.prisma.io/)**: [panter/ra-data-prisma](https://github.com/panter/ra-data-prisma)
* **[Prisma v2 (REST)](https://www.npmjs.com/package/ra-data-simple-prisma)**: [codeledge/ra-data-simple-prisma](https://github.com/codeledge/ra-data-simple-prisma)
* **[ProcessMaker3](https://www.processmaker.com/)**: [ckoliber/ra-data-processmaker3](https://github.com/ckoliber/ra-data-processmaker3)
* **[REST-HAPI](https://github.com/JKHeadley/rest-hapi)**: [ra-data-rest-hapi](https://github.com/mkg20001/ra-data-rest-hapi)
* **[Sails.js](https://sailsjs.com/)**: [mpampin/ra-data-json-sails](https://github.com/mpampin/ra-data-json-sails)
* **[SQLite](https://www.sqlite.org/index.html)**: [marmelab/ra-sqlite-dataprovider](https://github.com/marmelab/ra-sqlite-dataprovider)
* **[REST](https://en.wikipedia.org/wiki/Representational_state_transfer)**: [marmelab/ra-data-simple-rest](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-simple-rest)
* **[Spring Boot](https://spring.io/projects/spring-boot)**: [vishpat/ra-data-springboot-rest](https://github.com/vishpat/ra-data-springboot-rest) 
* **[Strapi](https://strapi.io/)**: [nazirov91/ra-strapi-rest](https://github.com/nazirov91/ra-strapi-rest)
* **[Supabase](https://supabase.io/)**: [marmelab/ra-supabase](https://github.com/marmelab/ra-supabase)
* **[TreeQL / PHP-CRUD-API](https://treeql.org/)**: [nkappler/ra-data-treeql](https://github.com/nkappler/ra-data-treeql)
* **[WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs)**: [zackha/ra-data-woocommerce](https://github.com/zackha/ra-data-woocommerce)

Referenced from [Link](https://marmelab.com/react-admin/DataProviderList.html)
