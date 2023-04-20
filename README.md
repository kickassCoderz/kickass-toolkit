# Kickass toolkit

**Kickass Toolkit** is a set of finely crafted and curated tools for rapid development of modern applications based on **[React](https://reactjs.org/)** and it's ecosystem.

It is a collection of multiple standalone libraries:

-   [@kickass-coderz/data-service](https://beta.kickass.codes/docs/data-service/quick-start)
-   [@kickass-coderz/react](https://beta.kickass.codes/docs/react/quick-start)
-   [@kickass-coderz/utils](https://beta.kickass.codes/docs/utils/quick-start)

## Key features

📦 **Out-of-the-box**: data fetching, authentication, subscription, low level api hooks

🔌 **Backend agnostic**: Connect to any backend (built-in pluggins planned)

📝 **Written in Typescript**: Get all the goodies which TS provides

📉 **Boilerplate-free**: Keeps your code nice and clean

🔍 **Thoroughly tested**: All code meets quality standards

🎨 **Headless**: Works with any UI

## Motivation

We have created **Kickass Toolkit** because we are scratching our own itch. Let's be real, developers are lazy. Starting a new project is a boring and repetitive task which always has to be done. This is where **Kickass Toolkit** kicks in.

By default **Kickass Toolkit** is unopinionated about your **UI** or **buissines logic** but it is strongly opinionated about three parts:

-   **Data fetching**
-   **Authentication and Authorization**
-   **Subscriptions**

It is our opinion that those are most important parts of modern web application and that should be handled in a robust way by following industry best practices.

Furthermore **Kickass Toolkit** provides you with collection React utils which expose varius hooks, components and factories which make your everyday life easier.

## What's inside?

This repository is set up as monorepo and it uses follwing tools:

-   [Turborepo](https://turborepo.org) for monorepo management
-   [PNPM](https://pnpm.io) as package manager and workspace manager
-   [Volta](https://volta.sh) as tool and node version manager
-   [TypeScript](https://www.typescriptlang.org/) for static type checking
-   [ESLint](https://eslint.org/) for code linting
-   [Prettier](https://prettier.io) for code formatting
-   [Husky](https://typicode.github.io/husky) for git hooks
-   [Commitlint](https://commitlint.js.org) and [ConfigConventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum) for commit messages check

### Apps and Packages

By default this monorepo is split in two types of workspaces:

-   `apps`: which consists of docs website and various playgrounds
-   `packages`: which consists of various libraries and shared configs
