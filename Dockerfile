#FROM node:lts-alpine

# Create project directory (workdir)
#RUN mkdir /app
#WORKDIR /app

#RUN npm i -g pnpm
#COPY . .

#RUN pnpm i
#RUN pnpm run build


FROM nginx:1.21.1
COPY build/ /usr/share/nginx/html
