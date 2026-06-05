FROM node:25-alpine AS build

WORKDIR /code

COPY .npmrc ./
COPY package*.json ./

RUN --mount=type=secret,id=GHP_TOKEN,env=GHP_TOKEN \
    npm config set //npm.pkg.github.com/:_authToken=$GHP_TOKEN && \
    npm i --include=dev
RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /code/dist /usr/share/nginx/html

EXPOSE 80