# Book Management API

A robust and scalable REST API for managing books and authors, built with NestJS. This project is configured with industry best practices for security, performance, and developer experience.

---

## Features

- **CRUD Operations**: Full support for creating, reading, updating, and deleting books and authors.
- **API Documentation**: Interactive API documentation powered by **Swagger (OpenAPI)**.
- **Validation**: Request validation using `class-validator` and `class-transformer`.
- **Security**:
  - **Helmet**: Secures the app by setting various HTTP headers.
  - **CORS**: Configured for cross-origin requests.
  - **Rate Limiting**: Protects against brute-force attacks.
  - **Input Sanitization**: Protects against XSS attacks.
- **Performance**:
  - **Response Compression**: Gzip compression for faster responses.
  - **Caching**: **Redis**-based caching for frequently requested data.
  - **Database Indexing**: Optimized database queries with indexes.
- **Observability**:
  - **Request Logging**: Structured HTTP request logging with **Winston** (all requests are logged with method, URL, status, and response time).
  - **Error Tracking**: Integrated with **Sentry** for real-time error monitoring.
- **Health Checks**: `/health` endpoint for monitoring application status.

---

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/) (optional, for running services)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd book-management-project
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project by copying the example file:

```bash
cp .env.example .env
```

Now, open the `.env` file and fill in your database credentials, Redis connection info, and other environment-specific variables.

---

## Running the Application

### Development Mode

To run the application in development mode with live-reloading:

```bash
pnpm run start:dev
```

The application will be available at `http://localhost:3000`.

---

## Running Tests

To run the test suite:

```bash
# Run all unit and integration tests
pnpm run test

# Run end-to-end (e2e) tests
pnpm run test:e2e

# Get a test coverage report
pnpm run test:cov
```

---

## API Documentation

Once the application is running, you can access the interactive Swagger API documentation at:

**`http://localhost:3000/docs`**

This UI allows you to view all available endpoints, see their request/response formats, and execute API calls directly from your browser.

### API Endpoints

All endpoints are prefixed with `/api/v1`.

- **Authors**
  - `GET /authors` - Get all authors (with pagination and search)
  - `GET /authors/:id` - Get a single author by ID
  - `POST /authors` - Create a new author
  - `PATCH /authors/:id` - Update an author
  - `DELETE /authors/:id` - Delete an author

- **Books**
  - `GET /books` - Get all books (with pagination, search, and author filter)
  - `GET /books/:id` - Get a single book by ID
  - `POST /books` - Create a new book
  - `PATCH /books/:id` - Update a book
  - `DELETE /books/:id` - Delete a book

- **Health**
  - `GET /health` - Check the health status of the application and its database connection.

---

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [TypeORM](https://typeorm.io/)
- **Caching**: [Redis](https://redis.io/)
- **API Specification**: [Swagger (OpenAPI)](https://swagger.io/)
- **Error Tracking**: [Sentry](https://sentry.io/)
- **Validation**: `class-validator`, `class-transformer`
- **Security**: `helmet`, `express-rate-limit`

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Database Migrations

This project uses TypeORM migrations for safe and versioned schema changes. For development, you may use TypeORM's `synchronize` feature, but for production, always use migrations.

### Migration Commands

- **Generate a migration:**
  ```bash
  pnpm run migration:generate src/migrations/YourMigrationName
  ```
- **Run migrations:**
  ```bash
  pnpm run migration:run
  ```
- **Revert last migration:**
  ```bash
  pnpm run migration:revert
  ```

See `data-source.ts` for configuration details.

## Logging

This project uses **Winston** for all application and request logging. Every HTTP request is logged with method, URL, status, and response time using a custom middleware. Logs are output in a structured format and can be easily extended to log to files or external services.

**Note:** The `morgan` logger is no longer used; all logging is handled by Winston.

