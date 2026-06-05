FROM node:25-alpine AS build
WORKDIR /tasks

COPY package*.json ./
COPY core/package*.json ./core/

RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm install

COPY . .
RUN npm run build --workspace=app

FROM nginx:1.27-alpine
COPY app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /tasks/app/dist /usr/share/nginx/html
EXPOSE 80