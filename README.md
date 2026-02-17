# ⭐ TaskOps
TaskOps is a full-stack task management application designed to streamline productivity and collaboration. It enables users to create, update, and manage tasks efficiently while supporting OAuth login, JWT authentication, and real-time GraphQL APIs via Apollo Federation.

## 🚀 Tech Stack

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Apollo Federation](https://img.shields.io/badge/Apollo_Federation-311C87?style=for-the-badge&logo=apollographql&logoColor=white)
![OAuth 2.0](https://img.shields.io/badge/OAuth_2.0-3C3C3C?style=for-the-badge&logo=oauth&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

## ✨ Features

- User registration and login (Local + Google OAuth)
- Create, update, and delete tasks
- View user profiles and task details
- GraphQL API with Apollo Federation for modular architecture
- Responsive frontend built with Next.js
- Secure authentication using JWT and OAuth 2.0
- PostgreSQL database integration for persistent storage
- Real-time data fetching with GraphQL queries and mutations

## 🏗️ Architecture

- Microservices architecture with Spring Boot services
- Apollo Federation for modular GraphQL subgraphs
- Next.js frontend for server-side rendering and React hooks
- JWT + OAuth for authentication and authorization
- PostgreSQL as relational database

- Architectre Diagram
  
![Architecture Diagram](https://github.com/user-attachments/assets/114985bd-2b21-4041-b6bf-51db15ba8b1c)

- Service Diagram
  
![Service Diagram](https://github.com/user-attachments/assets/1a2e115c-b748-4a5c-93a7-a4d45559112f)

## 🔐 Authentication & Authorization
- Local login with email/password
- Google OAuth login
- JWT-based token authentication for API access

## 📊 Database Schema
- `users` table: stores user information, OAuth provider, and credentials
- `tasks` table: stores tasks, owner reference, and status
- Relationships:
  - One-to-many: User → Tasks
 

## 📁 Project Structure

```
server/                 # Spring Boot backend services
├── auth-service        # Authentication service
├── task-service        # Task management service

frontend/               # Next.js frontend

apollo-gateway/         # GraphQL gateway, typeDefs & resolvers

subgraphs/              # GraphQL subgraphs for modular architecture
├── auth-subgraph       # Auth subgraph
└── task-subgraph       # Task subgraph
```


## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL 14+
- Yarn or npm
- Git

### Backend Setup
1. Navigate to backend services:
   - `auth-service`
   - `task-service`
2. Build and run each service:
```bash
./mvnw clean install
./mvnw spring-boot:run
```

### Frontend Setup
1. Navigate to frontend:
```bash
npm install
npm run dev
```

### Middleware Setup
- Subgraphs: auth-subgraph, task-subgraph
- Apollo Gateway:
```bash
node index.js
```
