FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY nx.json .
COPY tsconfig*.json .
COPY workspace.json .

RUN npm ci

COPY . .

RUN npx nx build frontend --prod

FROM nginx:alpine

COPY --from=builder /app/dist/apps/frontend /usr/share/nginx/html
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]