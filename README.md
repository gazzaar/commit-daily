# CommitDaily

A full-stack habit tracking application with streak calculation. Built with modern TypeScript technologies and designed for scalability.

## Tech Stack

### Backend

- **NestJS** - Progressive Node.js framework
- **GraphQL** - Query language with Apollo Server
- **PostgreSQL** - Relational database
- **Prisma ORM** - Type-safe database client
- **Passport JWT** - Cookie-based authentication
- **Pino** - Structured logging

### Frontend

- **React** - UI library
- **TanStack Router** - Type-safe routing
- **TanStack Query with Codegen** - Automatic types
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server

### DevOps

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **pnpm** - Fast, disk space efficient package manager

## Features

- User authentication with JWT (cookie-based)
- Create and manage daily habits
- Automatic streak calculation
- Track habit completion history
- Responsive design with Tailwind CSS
- GraphQL API with computed field resolvers
- REST endpoints for authentication
- Production-ready error handling and logging

## Architecture

### API Design

- **REST API** - Authentication endpoints (`/auth/login`, `/auth/register`)
- **GraphQL API** - Habit management with queries and mutations
- **Hybrid approach** - Using the right tool for each use case

### Database Schema

```
Users
├── id (UUID)
├── fullName
├── email (unique)
├── password (hashed)
└── timestamps

Habits
├── id (UUID)
├── userId (FK)
├── habitName
├── description
└── timestamps

HabitEntries
├── id (UUID)
├── habitId (FK)
├── date (DATE)
├── completed (BOOLEAN)
└── timestamps
└── UNIQUE(habitId, date)
```

## API Documentation

### REST Endpoints

#### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive JWT cookie
- `POST /auth/logout` - Logout and clear cookie
- `GET /auth` - Get current authenticated user

### GraphQL API

#### Queries

```graphql
# Get all habits for authenticated user
query {
  habits {
    id
    habitName
    description
    currentStreak
    completedToday
    entries {
      date
      completed
    }
  }
}
```

#### Mutations

```graphql
# Create a new habit
mutation {
  createHabit(input: { habitName: "Exercise", description: "30 minutes daily" }) {
    id
    habitName
  }
}

# Toggle habit completion
mutation {
  toggleHabit(input: { habitId: "uuid" }) {
    completed
  }
}

# Update habit
mutation {
  updateHabit(input: { id: "uuid", habitName: "New name" }) {
    id
    habitName
  }
}

# Delete habit
mutation {
  deleteHabit(id: "uuid")
}
```

## Project Structure

```
commit-daily/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── authentication/  # Auth module (REST)
│   │   ├── habits/         # Habits module (GraphQL)
│   │   ├── users/          # Users module
│   │   ├── prisma/         # Prisma service
│   │   └── common/         # Shared utilities
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── migrations/     # Database migrations
│   ├── test/               # Tests
│   ├── Dockerfile
│   └── package.json
├── web/                    # React frontend
│   ├── src/
│   │   ├── auth/          # Authentication
│   │   ├── components/    # Reusable components
│   │   ├── routes/        # Route components
│   │   ├── queries/       # GraphQL queries
│   │   └── hooks/         # Custom hooks
│   ├── Dockerfile
│   └── package.json
├── docs/                   # Documentation
├── docker-compose.yml
└── README.md
```

## Development Guidelines

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting (run `pnpm format`)

