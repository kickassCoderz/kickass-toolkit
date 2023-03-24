# Hooks Overview

## Introduction

**@kickass-coderz/hooks** is a standalone library of general purpose hooks which are built with SSR compatibility and performance in mind.

## Key features

📝 **Written in Typescript**: Get all the goodies which TS provides

🔍 **Thoroughly tested**: All code meets quality standards

🧬 **Composable**: Easily combine hooks to create more advanced patterns(visit recipes for inspiration)

⚡️ **Performant**: We dont spawn listeners or observers, we reuse them where possible

📦 **Zero dependencies**: Zero dependencies, zero chances of nuking, small footprint

## Installation

Add package to your project dependencies:

```bash npm2yarn
npm install @kickass-coderz/hooks
```

No additional setup is required. You can now use hooks in your project:

```jsx
import { useRef } from 'react'
import { useEventListener } from '@kickass-coderz/hooks'

const SomeComponent = () => {
    const ref = useRef()

    useEventListener(ref, 'click', event => {
        // do something
    })

    return <div ref={ref}></div>
}
```
