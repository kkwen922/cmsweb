### Dockerfile in docker-vue-test
FROM node:8-alpine
# make the 'app' folder the current working directory
WORKDIR /app
# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./
# install project dependencies
RUN npm install
EXPOSE 8090
#容器建立後，其預設開啟 8080 對外
