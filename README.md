![](https://github.com/prisma-capacity/babel-plugin-react-display-named/workflows/CI/badge.svg)

# `@prisma-capacity/babel-plugin-react-display-name`

> Automatically add a `displayName` property to your React components.

This is usefull to get better debugging experiences in minified source code.

## Install

Using npm:

```sh
npm install --save-dev @prisma-capacity/babel-plugin-react-display-name
```

or using yarn:

```sh
yarn add @prisma-capacity/babel-plugin-react-display-name --dev
```

## How does this work?

Because React components can be simple functions it can be hard to detect, if a certain function is a component or not. Currently we cover the following cases:

Explicitly type your component:

```ts
const Hello: FC = () => null;
const Hello: FunctionalComponent = () => null;
```

Use a function which is known to return a component:

```ts
const Hello = forwardRef(() => null);
const Hello = memo(() => null);
```

Pull requests are welcome to cover more cases. ♥
