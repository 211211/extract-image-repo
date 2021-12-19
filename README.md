# Introduction

This repository holds the code for extracting image from a url at given time frame.

# Setting up development environment

1. Install node js for your system (14.X recommended)
2. Clone the project

```bash
$ git clone git@github.com:211211/extract-image-repo.git
$ cd extract-image-repo
$ npm i

# Builds the entire application with routes and everything
$ npm run build

# Starts the service in development mode.
# Recompiles on every save.
# Changes that were made to the controllers like
# * new routes
# * change of parameters
# could not be detected automatically. You have
# to run npm run build in such cases
$ npm start
```

# To build and start the service with docker
```bash
# Build image
$ docker build . -t exact-image-app

# Run image with 4000 port exposed
$ docker run -p 4000:4000 -d exact-image-app
```

# Use built in mechanics

The used service template offers some built in mechanics that can be used to speed app service development.

## Create REST controller

REST Controllers must be created in `./src/1 - REST Interface/Controllers/*Controller.ts`. Otherwise they will not be found by the system. Every Controller must extends the `Controller` class of the `tsoa` package.

Every Controller must be registered by the DI Container. The used DI Container by the template is `inversify.js`. You can register a controller as follows (in `./src/Modules/ioc-container.js`)

```ts
iocContainer
  .bind<ExtractImageController>(ExtractImageController)
  .to(ExtractImageController)
  .inTransientScope();
```

# License

> This project is not licensed as open source project. Redistribution is prohibited.
