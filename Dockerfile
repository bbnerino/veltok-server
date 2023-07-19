FROM node:18-alpine as builder

# RUN,CMD 등의 명령어를 실행할 디렉토리를 지정한다.
WORKDIR /app 

# package.json, package-lock.json을 COPY하여 /app 디렉토리에 복사한다.
COPY package*.json ./

# npm install을 실행한다.
RUN npm install

# 현재 디렉토리의 모든 파일을 /app 디렉토리에 복사한다.
# 복사를 하는 이유는 소스코드를 변경할 때마다 npm install을 실행하지 않기 위함이다.
COPY . .

# npm run build를 실행한다.
RUN npm run build

# Path: Dockerfile
FROM node:18-alpine as production
WORKDIR /app

# ARG를 통해 NODE_ENV를 지정한다.
# NODE_ENV의 역할은 프로젝트의 환경을 지정하는 것이다.
ARG NODE_ENV=production

# NODE_ENV를 production으로 설정한다.
ENV NODE_ENV=${NODE_ENV}  

# package.json, package-lock.json을 COPY하여 /app 디렉토리에 복사한다.
COPY package*.json ./

# 빌드된 파일을 /app/dist 디렉토리에 복사한다.
COPY --from=builder /app/dist ./dist

# npm install을 실행한다. 
# --only=production 옵션을 통해 devDependencies를 설치하지 않는다.
RUN npm install --only=production

# 9888번 포트를 개방한다.
EXPOSE 9888

# npm start를 실행한다. 
CMD ["npm", "run start:prod"]
