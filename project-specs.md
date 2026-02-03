# Jirakli

A lightweight, self-hosted ticket tracking system for software development teams.

## Project Goals

- **Self-hosted first**: Single `docker run` command to deploy
- **Lightweight**: Runs on Raspberry Pi 3+, 1GB VPS, or local machine
- **Simple**: Easy to use, minimal configuration
- **Free**: Open source alternative to heavyweight tools

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Frontend | Angular | SPA with TypeScript |
| Backend | NestJS | TypeScript, dependency injection |
| Database | SQLite | Single file, zero-config, WAL mode |
| ORM | Drizzle | Type-safe, no binary dependencies |
| Validation | Zod + drizzle-zod | Shared schemas between client/server |
| Monorepo | pnpm workspaces | Simple workspace management |
| API Docs | Swagger | Auto-generated via @nestjs/swagger |
| Testing | Jest | Unified test runner across packages |
| Deployment | Docker | Single container + volume mount |

## Project Structure

```
jirakli/
├── package.json              # pnpm workspace root
├── pnpm-workspace.yaml
├── docker-compose.yml
├── Dockerfile
├── .gitignore
├── README.md
├── packages/
│   ├── client/               # Angular application
│   │   ├── src/
│   │   ├── package.json
│   │   └── ...
│   ├── server/               # NestJS application
│   │   ├── src/
│   │   ├── package.json
│   │   └── ...
│   └── shared/               # Shared types, schemas, constants
│       ├── src/
│       │   ├── schemas/      # Zod schemas (source of truth)
│       │   ├── types/        # Inferred TypeScript types
│       │   └── constants/    # Shared enums, config values
│       └── package.json
└── data/                     # SQLite database location (gitignored)
```

## MVP Scope

### Authentication
- Local auth only (email/password)
- JWT-based sessions
- Password reset via email token
- Auth abstraction layer for future OIDC support

### Core Entities
- **Users**: Basic user management
- **Projects**: Group tickets by project
- **Tickets**: The core unit of work
- **Comments**: Discussion on tickets

### Ticket Features
- Create, read, update, delete
- Assign to users
- Status workflow (configurable per project)
- Priority levels
- Comments and activity history
- Search and filters

### Not in MVP (Deferred)
- OIDC/LDAP authentication
- Multi-tenancy
- Postgres support
- Sprints/iterations
- Time tracking
- Custom fields
- Webhooks/integrations
- File attachments

## Data Model (Draft)

```typescript
// packages/shared/src/schemas/user.ts
export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // uuid
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  displayName: text('display_name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

// packages/shared/src/schemas/project.ts
export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  key: text('key').notNull().unique(), // e.g., "JIR" for ticket prefixes
  name: text('name').notNull(),
  description: text('description'),
  createdBy: text('created_by').references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

// packages/shared/src/schemas/ticket.ts
export const tickets = sqliteTable('tickets', {
  id: text('id').primaryKey(),
  projectId: text('project_id').references(() => projects.id).notNull(),
  number: integer('number').notNull(), // auto-increment per project
  title: text('title').notNull(),
  description: text('description'),
  status: text('status').notNull(), // todo, in_progress, done, etc.
  priority: text('priority').notNull(), // low, medium, high, critical
  assigneeId: text('assignee_id').references(() => users.id),
  reporterId: text('reporter_id').references(() => users.id).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

// packages/shared/src/schemas/comment.ts
export const comments = sqliteTable('comments', {
  id: text('id').primaryKey(),
  ticketId: text('ticket_id').references(() => tickets.id).notNull(),
  authorId: text('author_id').references(() => users.id).notNull(),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});
```

## API Endpoints (Draft)

### Auth
- `POST /auth/register` - Create account
- `POST /auth/login` - Get JWT token
- `POST /auth/logout` - Invalidate token
- `POST /auth/forgot-password` - Request reset email
- `POST /auth/reset-password` - Set new password

### Users
- `GET /users` - List users
- `GET /users/:id` - Get user
- `PATCH /users/:id` - Update user

### Projects
- `GET /projects` - List projects
- `POST /projects` - Create project
- `GET /projects/:id` - Get project
- `PATCH /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Tickets
- `GET /projects/:projectId/tickets` - List tickets (with filters)
- `POST /projects/:projectId/tickets` - Create ticket
- `GET /tickets/:id` - Get ticket
- `PATCH /tickets/:id` - Update ticket
- `DELETE /tickets/:id` - Delete ticket

### Comments
- `GET /tickets/:ticketId/comments` - List comments
- `POST /tickets/:ticketId/comments` - Add comment
- `PATCH /comments/:id` - Edit comment
- `DELETE /comments/:id` - Delete comment

## Testing Strategy

### Unit Tests
- Business logic (ticket state transitions, validation)
- Services in isolation with mocked dependencies

### Integration Tests
- API endpoints via Supertest
- Database operations with test SQLite instance

### Frontend Tests
- Component behavior via Angular Testing Library
- Critical user flows

### Not Prioritized for MVP
- E2E tests (Playwright/Cypress)
- Visual regression tests

## Deployment

### Development
```bash
pnpm install
pnpm dev  # Runs both client and server
```

### Production (Docker)
```bash
docker build -t jirakli .
docker run -d -p 3000:3000 -v jirakli-data:/app/data jirakli
```

### Environment Variables
```env
# Required
JWT_SECRET=your-secret-key

# Optional
PORT=3000
DATABASE_PATH=./data/jirakli.db
```

## Future Considerations

### Postgres Support
Design Drizzle schemas to be driver-agnostic where possible. Add `DATABASE_TYPE` env var to switch drivers.

### OIDC/LDAP
Auth service uses provider interface. Local auth is default provider. OIDC provider can be added without changing consumers.

### Performance
- SQLite WAL mode for better concurrency
- Pagination on all list endpoints
- Index frequently filtered columns

## Development Principles

- Ship MVP first, iterate based on feedback
- Keep dependencies minimal
- Optimize for self-hosting simplicity
- Write tests for business logic, not boilerplate
- Document as you build
