FROM node:14 AS build-env

# production mode
ENV NODE_ENV production

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


# Install app dependencies
COPY package*.json /usr/src/app/
RUN npm ci --only production
# Bundle app source
RUN npm build

# Moving necessary files and folders into docker container
COPY ./definitions /usr/src/app/definitions
COPY ./build /usr/src/app
COPY .env /usr/src/app
COPY ./node_modules /usr/src/app/node_modules
COPY ./ffmpeg/ffmpeg /usr/src/app/ffmpeg/ffmpeg

# copy all
# COPY . /usr/src/app

EXPOSE 8070
CMD ["node", "./main.js"]