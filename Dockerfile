# Build stage
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/server/package.json ./packages/server/
COPY packages/client/package.json ./packages/client/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY tsconfig.base.json ./
COPY packages/shared ./packages/shared
COPY packages/server ./packages/server
COPY packages/client ./packages/client

# Build shared package first
WORKDIR /app/packages/shared
RUN pnpm build

# Build server
WORKDIR /app/packages/server
RUN pnpm build

# Build client
WORKDIR /app/packages/client
RUN pnpm build

# Production stage
FROM node:22-alpine AS production

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files for production install
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/server/package.json ./packages/server/

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy built artifacts
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/server/dist ./packages/server/dist
COPY --from=builder /app/packages/client/dist/client/browser ./packages/server/public

# Create data directory
RUN mkdir -p /app/data

# Set environment
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_PATH=/app/data/jirakli.db

EXPOSE 3000

WORKDIR /app/packages/server

CMD ["node", "dist/main.js"]
