# Jirakli

A lightweight, self-hosted ticket tracking system for software development teams.

## Features

- **Self-hosted first**: Single `docker run` command to deploy
- **Lightweight**: Runs on Raspberry Pi 3+, 1GB VPS, or local machine
- **Simple**: Easy to use, minimal configuration
- **Modern**: Built with Angular 17+, NestJS, and SQLite

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Angular 17+ (Standalone Components, Signals) |
| Backend | NestJS (TypeScript) |
| Database | SQLite (with Drizzle ORM) |
| Validation | Zod + drizzle-zod |
| API Docs | Swagger |

## Project Structure

```
jirakli/
├── packages/
│   ├── client/        # Angular application
│   ├── server/        # NestJS API
│   └── shared/        # Shared types, schemas, constants
├── docker-compose.yml
├── Dockerfile
└── data/              # SQLite database (gitignored)
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/jirakli.git
cd jirakli

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env
# Edit .env and set JWT_SECRET to a secure value

# Build shared package
pnpm build:shared

# Generate and run database migrations (first time setup)
pnpm db:generate
pnpm db:migrate

# Start development servers
pnpm dev
```

The application will be available at:
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000
- API Documentation: http://localhost:3000/api/docs

### Running individual packages

```bash
# Start only the server
pnpm dev:server

# Start only the client
pnpm dev:client
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| JWT_SECRET | Yes | - | Secret key for JWT tokens (min 32 chars) |
| PORT | No | 3000 | Server port |
| DATABASE_PATH | No | ./data/jirakli.db | SQLite database path |

## Docker Deployment

### Using Docker Compose

```bash
# Build and run
docker compose up -d

# View logs
docker compose logs -f
```

### Using Docker directly

```bash
# Build the image
docker build -t jirakli .

# Run the container
docker run -d \
  -p 3000:3000 \
  -v jirakli-data:/app/data \
  -e JWT_SECRET=your-secret-key-min-32-chars \
  jirakli
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and get JWT token

### Projects
- `GET /api/v1/projects` - List all projects
- `POST /api/v1/projects` - Create a project
- `GET /api/v1/projects/:id` - Get a project
- `PATCH /api/v1/projects/:id` - Update a project
- `DELETE /api/v1/projects/:id` - Delete a project

### Tickets
- `GET /api/v1/projects/:projectId/tickets` - List tickets
- `POST /api/v1/projects/:projectId/tickets` - Create a ticket
- `GET /api/v1/tickets/:id` - Get a ticket
- `PATCH /api/v1/tickets/:id` - Update a ticket
- `DELETE /api/v1/tickets/:id` - Delete a ticket

### Comments
- `GET /api/v1/tickets/:ticketId/comments` - List comments
- `POST /api/v1/tickets/:ticketId/comments` - Add a comment
- `PATCH /api/v1/comments/:id` - Edit a comment
- `DELETE /api/v1/comments/:id` - Delete a comment

## Development

### Scripts

```bash
pnpm dev           # Start all dev servers
pnpm build         # Build all packages
pnpm test          # Run all tests
pnpm lint          # Run linting
pnpm db:generate   # Generate database migrations
pnpm db:migrate    # Run database migrations
```

### Database Migrations

```bash
# Generate a migration after schema changes
pnpm db:generate

# Apply migrations
pnpm db:migrate
```

## License

MIT
