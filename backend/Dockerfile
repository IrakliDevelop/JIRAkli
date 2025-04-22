FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY nx.json .
COPY tsconfig*.json .
COPY workspace.json .

RUN npm ci

COPY . .

RUN npx nx build api

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/api .
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3333

CMD ["node", "main.js"]