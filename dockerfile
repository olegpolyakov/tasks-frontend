FROM node:25-alpine AS build

WORKDIR /code

ARG VITE_DOMAIN
ARG VITE_APP_DOMAIN
ARG VITE_API_URL
ARG VITE_AUTH_URL

ENV VITE_DOMAIN=$VITE_DOMAIN
ENV VITE_APP_DOMAIN=$VITE_APP_DOMAIN
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_AUTH_URL=$VITE_AUTH_URL

COPY .npmrc ./
COPY package*.json ./

RUN --mount=type=secret,id=GHP_TOKEN,env=GHP_TOKEN \
    npm config set //npm.pkg.github.com/:_authToken=$GHP_TOKEN && \
    npm i --include=dev

COPY . .

RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /code/dist /usr/share/nginx/html

EXPOSE 80