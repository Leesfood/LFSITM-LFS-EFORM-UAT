# Dashboard

Dashboard starter template built with Vite, Vue 3, Tailwind CSS and TypeScript.

Copied from https://github.com/tailwindcomponents/dashboard and converted to Vue.

## Demo


Note if you have access to [Tailwind UI](https://tailwindui.com), you can follow the following steps to add it:

1. Install `@tailwindcss/ui`:

```sh
pnpm add @tailwindcss/ui
```

2. Add the plugin in `tailwind.config.js` without changing anything else:

```js
// tailwind.config.js
module.exports = {
  // ...
  // rest of the config
  plugins: [require('@tailwindcss/ui')],
}
```

## Project setup

```
1.donwload Node Js
2.setup Enviroment 
3.download NVM https://github.com/coreybutler/nvm-windows/releases
4.nvm install 18
5.nvm use 18
-------------
Deploy Firebase
1.Open your terminal and run:
  npm install -g firebase-tools
2.Verify the installation:
  firebase --version
3.firebase login
  firebase login
4.firebase create configuration
  Firebase init
5.Firebase deploy
  Firebase deploy
```

### Compiles and hot-reloads for development

```
pnpm dev
```

### Compiles and minifies for production

```
pnpm build
```

