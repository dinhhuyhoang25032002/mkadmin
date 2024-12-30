FROM node:20
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --only=production

COPY dist ./dist