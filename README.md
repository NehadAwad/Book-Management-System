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
  - **Request Logging**: Detailed HTTP request logging with `morgan`.
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

### 4. Run Database and Redis (Optional: Using Docker)

If you have Docker installed, you can easily start PostgreSQL and Redis services:

```bash
docker-compose up -d
```
*(Note: A `docker-compose.yml` file would need to be created for this.)*

### 5. Run Database Migrations

This project uses TypeORM's `synchronize` feature for development, which automatically syncs your entities with the database. For production, a proper migration strategy is recommended.

---

## Running the Application

### Development Mode

To run the application in development mode with live-reloading:

```bash
pnpm run start:dev
```

The application will be available at `http://localhost:3000`.

### Production Mode

To build and run the application for production:

```bash
pnpm run build
pnpm run start:prod
```

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

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
