# Kickass toolkit

A set of kickass tools for rapid development.

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

#### Apps

Current apps are:

-   `toolkit-docs`: A [Docusaurus](https://docusaurus.io/) app which holds the docs for publishable libraries
-   `next-playground`: A [Next](https://nextjs.org/) app which is used as playground for libraries and various ideas.

#### Packages

Current packages are:

-   `data-service`: A publishable library for data fetching
-   `hooks`: A publishable library with set of utility hooks
-   `react-widgets`: A publishable lib with unstyled ui widgets
-   `kickass-ui-react`: A publishable library with kickass design system which utilizes both hooks and widgets
-   `eslint-config-custom`: A collection of `eslint` configs used in `packages` and `apps`
-   `tsconfig`: A collection of `tsconfigs` which are used across workspaces
