# Phaser Wallet

Just the simplest implementation of Web3Modal using PhaserIO libraries.

## Phaser 3 Webpack Project Template with a built in Web3Modal wallet

This project is based on the upsteam "phaser3-template", which is a Phaser 3 project template
with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/) 
that includes hot-reloading for development and production-ready builds.

This has been updated for Phaser 3.50.0 version and above.

Loading images via JavaScript module `import` is also supported, although not recommended.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install project dependencies |
| `pnpm start` | Build project and open web server running project |
| `pnpm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Writing Code

## Building

I prefer the PNPM tool these days, so:

```
pnpm install
pnpm start
```

## Deploying Code

After you run the `pnpm run build` command, your code will be built into a single bundle located at `dist/bundle.min.js` along with any other assets you project depended. 

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`), you should be able to open `http://mycoolserver.com/index.html` and play your game.
