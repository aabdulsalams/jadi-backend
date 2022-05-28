FROM node:lts-alpine3.15

WORKDIR /app

COPY . /app

RUN npm install
# If building code for production
# RUN npm ci --only=production

EXPOSE 8080
CMD [ "node", "server.js" ]