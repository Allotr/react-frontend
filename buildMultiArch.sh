#!/bin/bash
npm i -g pnpm 
pnpm i
pnpm run build

docker tag allotr-react-frontend rafaelpernil/allotr-react-frontend
docker buildx build --push --platform linux/arm/v7,linux/arm64,linux/amd64  --tag rafaelpernil/allotr-react-frontend .
#docker push rafaelpernil/allotr-react-frontend

