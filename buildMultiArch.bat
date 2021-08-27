@ECHO OFF
@REM npm i -g pnpm 
CALL pnpm i
CALL pnpm run build
CALL docker tag allotr-react-frontend rafaelpernil/allotr-react-frontend
CALL docker buildx build --push --platform linux/arm/v7,linux/arm64,linux/amd64  --tag rafaelpernil/allotr-react-frontend .
@REM #docker push rafaelpernil/allotr-react-frontend

