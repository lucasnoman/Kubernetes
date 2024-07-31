FROM node:20.14.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install
RUN apk update && apk upgrade && apk add curl

COPY . .

EXPOSE 5173

CMD ["pnpm", "run", "dev"]
