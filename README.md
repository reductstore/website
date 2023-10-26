# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

We use GitHub Actions to automatically deploy the website to GitHub Pages on every push to the `main` branch.

To deploy manually, run the following command:

```
$ USE_SSH=true yarn deploy
```

This command will build the website and push to the `gh-pages` branch.
