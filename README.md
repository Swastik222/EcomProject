# EcomProject

Full-stack ecommerce demo with a Spring Boot backend, MySQL database, JWT authentication, and a React/Vite frontend.

## Tech Stack

- Backend: Java 21, Spring Boot, Spring Security, Spring Data JPA, MySQL
- Frontend: React, Vite, Axios, React Router

## Backend Setup

Create environment variables from `.env.example`, then run:

```bash
mvn spring-boot:run
```

The backend defaults to `http://localhost:8080`.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend defaults to `http://localhost:5173`.

## Production Build

Backend:

```bash
mvn -DskipTests package
java -jar target/EcomProject-0.0.1-SNAPSHOT.jar
```

Frontend:

```bash
cd frontend
npm run build
```

## Environment Variables

Backend:

- `PORT`
- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET`
- `CORS_ALLOWED_ORIGINS`

Frontend:

- `VITE_API_BASE_URL`
