FROM node:21 as build

WORKDIR /quartux-challenge

COPY package*.json ./
RUN rm -rf node_modules
RUN rm -rf build
COPY . .
RUN npm install
RUN npm run build

FROM node:21 as run

WORKDIR /quartux-challenge
COPY --from=build /quartux-challenge/package.json ./package.json
COPY --from=build /quartux-challenge/build ./build
RUN npm install --production

EXPOSE 3000

CMD ["node", "build"]
