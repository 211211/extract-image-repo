# Requirements
Create an Dockerized API using ExpressJs in Typescript. The purpose of the API is to use ffmpeg to extract an image at a given timestamp for a given video.

The API should have an endpoint at `GET http://localhost:8070/ffmpeg/image?timestamp=${TIMESTAMP_IN_SECONDS}&url=${VIDEO_URL}`.
A url to a video (mp4/webm) and timestamp in seconds will be provided as the url query parameters. The API must extract an image at the given timestamp without downloading the video to disk or any directory within the container. The image should be base64 encoded and returned in the response body.

A valid request is: `http://localhost:8070/ffmpeg/image?timestamp=1&url=https://public-anios-dev.s3.ap-southeast-1.amazonaws.com/jungle_3s.mp4`
Timestamp: 1 seconds
Video URL: https://public-anios-dev.s3.ap-southeast-1.amazonaws.com/jungle_3s.mp4

You can find a ffmpeg binaries at: https://johnvansickle.com/ffmpeg/
The ffmpeg command to extract the image is:
```bash
$ ffmpeg -ss <TIMESTAMPTIMESTAMP_IN_SECONDSE_IN> -i <VIDEO_URL> -vframes 1 -vcodec png -an -y %d.png
```
```bash
$ ffmpeg -ss 1 -i https://public-anios-dev.s3.ap-southeast-1.amazonaws.com/jungle_3s.mp4 -vframes 1 -vcodec png -an -y %d.png
```

There should be an npm command for me to build the docker image locally. I will run the docker image locally against my test samples to judge the correctness of your assignment. The assignment will be assessed on correctness of solution, cleanliness of code, and organisation of files/folders. Implement this API as you would normally do for your work.
This repository holds the code for extracting image from a url at given time frame.

# Introduction

This repository holds the code for extracting image from a url at given time frame.

# Setting up development environment
1. Unzip ffmpeg.zip from ./ffmpeg folder. 
* `If you're working with OSX. Please download here: https://evermeet.cx/ffmpeg/ and put the binary in ./ffmpeg`
2. Install node js for your system (14.X recommended)
3. Rename `.env.example` as `.env`
4. Clone the project and run the following commands:

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

# Run image with 8070 port exposed
$ docker run -p 8070:8070 -d exact-image-app
```

# Access swagger via /swagger path
`http://localhost:8087/swagger`

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

# Troubleshooting

> If you receive only an empty response with `ok: true` then please check the existence of ffmpeg binary file in ./ffmpeg folder


# License

> This project is not licensed as open source project. Redistribution is prohibited.
