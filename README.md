# Eventpass API

Production-inspired REST API built with Fastify and TypeScript for the EventPass mobile application. Showcases JWT authentication, request validation, clean architecture, testing, and scalable backend design.

![LICENSE](https://img.shields.io/badge/license-MIT-green)  
[![TYPESCRIPT](https://img.shields.io/badge/language-typescript-informational)](https://docs.expo.dev/guides/typescript/)  
[![FASTIFY](https://img.shields.io/badge/tech-fastify-white)](https://fastify.dev/)
[![JSONWEBTOKEN](https://img.shields.io/badge/jsonwebtoken-white)](https://www.jwt.io/)
[![ZOD](https://img.shields.io/badge/zod-white)](https://zod.dev/)

# Features

- Login endpoint with JSON Web Token authentication.
- Public event listing for the React Native app home/feed screen.
- Protected ticket lookup by ticket ID.
- Ticket ownership check based on the authenticated user.
- Request body validation with Zod.
- JSON-backed data layer for lightweight local development.
- Integration tests using Fastify `inject` and Vitest.

# Tech Stack

1. Runtime

- Node.js

2. Language

- TypeScript

3. HTTP Framework

- Fastify

4. Authentication

- JSON Web Token with `jsonwebtoken`

5. Validation

- Zod

6. Testing

- Vitest

7. Development Runner

- TSX

8. Data Source

- Local JSON files in `src/data`

# Architecture

The project keeps each responsibility in a small layer so the API stays easy to change as the mobile app grows.

src  
├── app.ts  
├── server.ts  
├── types.ts  
├── app.test.ts  
├── data  
│ ├── users.json  
│ ├── events.json  
│ └── tickets.json  
├── repositories  
├── routes  
├── schemas  
└── services

# Layer Responsibilities

- **Routes** handle HTTP details: params, status codes, request/response shape.
- **Services** hold application behavior and business rules.
- **Repositories** isolate the data source.
- **Schemas** validate incoming request payloads.
- **Data files** act as a temporary local database for demo/development.

This makes it straightforward to replace the JSON repository with SQLite, PostgreSQL, Prisma, or another real database later without rewriting the route handlers.

# Endpoints

### `POST /login`

Authenticates a user and returns a token.

Request:

```json
{
  "email": "demo@eventpass.com",
  "password": "password123"
}
```

Response:

```json
{
  "token": "...",
  "user": {
    "id": "1",
    "email": "demo@eventpass.com",
    "name": "John Doe"
  }
}
```

### `GET /events`

Returns the available events.

```bash
curl http://localhost:3333/events
```

### `GET /tickets/:id`

Returns a ticket owned by the authenticated user.

```bash
curl http://localhost:3333/tickets/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

# React Native Usage

Start the backend:

```bash
npm run dev
```

The server listens on `0.0.0.0:3333`, which allows access from a physical device on the same Wi-Fi network.

Common base URLs:

```ts
// Physical device on the same Wi-Fi
const API_URL = "http://YOUR_LOCAL_IP:3333";

// Android emulator
const API_URL = "http://10.0.2.2:3333";

// iOS simulator
const API_URL = "http://localhost:3333";
```

# Scripts

Start the development server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Build the project:

```bash
npm run build
```

# VS Code Tasks

Run the test task from VS Code with `Terminal > Run Task > Run tests`.
