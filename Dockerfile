#FROM node:lts-alpine

# Create project directory (workdir)
#RUN mkdir /app
#WORKDIR /app

#RUN npm i -g pnpm
#COPY . .

#RUN pnpm i
#RUN pnpm run build


FROM nginx:1.25.1-alpine3.17-slim
COPY dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
# CMD ["nginx", "-g", "daemon off;"]

