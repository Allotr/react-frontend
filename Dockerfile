# Build stage
FROM node:18.17.1-alpine3.18 as build
RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

# Execution stage
FROM nginx:1.25.1-alpine3.17-slim as execution
COPY dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

