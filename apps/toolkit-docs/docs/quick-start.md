---
sidebar_position: 2
---

# Quick start

:::info

The following content is for complete **Kickass Toolkit** library. If you're interested in **[Hooks](./hooks/overview)**, **[Data service](./data-service/overview)**, **[Auth service](./auth-service/overview)** or **[Subscription service](./subscription-service/overview)** then visit their respective pages in docs.

:::

## Installation

In your react project install following dependency:

```bash npm2yarn
npm install @kickass-coderz/kickass-toolkit
```

## App setup

```mdx-code-block
<Tabs>
<TabItem value="React">
```

In classic React apps open your `App.js` file and add `KickassToolkit` wrapper:

```jsx title="/src/App.js"
import { KickassToolkit } from '@kickassCoderz/kickass-toolkit'

const App = () => {
    return (
        <KickassToolkit>
            <div>Hello from App.js</div>
        </KickassToolkit>
    )
}
```

```mdx-code-block
</TabItem>
<TabItem value="Next.js">
```

In Next.js apps open your `_app.js` file and add `KickassToolkit` wrapper:

```jsx title="/pages/_app.js"
import { KickassToolkit } from '@kickassCoderz/kickass-toolkit'

const App = () => {
    return (
        <KickassToolkit>
            <div>Hello from App.js</div>
        </KickassToolkit>
    )
}
```

```mdx-code-block
</TabItem>
</Tabs>
```
