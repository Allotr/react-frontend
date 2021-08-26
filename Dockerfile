FROM node:lts-alpine
RUN npm i -g pnpm
COPY . .
RUN pnpm i
RUN pnpm run build

FROM nginx:1.21.1
COPY build/ /usr/share/nginx/html
