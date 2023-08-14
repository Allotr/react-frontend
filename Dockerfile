#FROM node:lts-alpine

# Create project directory (workdir)
#RUN mkdir /app
#WORKDIR /app

#RUN npm i -g pnpm
#COPY . .

#RUN pnpm i
#RUN pnpm run build


FROM nginx:1.21.1
COPY dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
# CMD ["nginx", "-g", "daemon off;"]

