FROM node:18.17.0

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . /app

RUN yarn build

CMD ["yarn", "start"]