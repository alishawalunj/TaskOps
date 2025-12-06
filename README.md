# 🌟 TaskOps

**TaskOps** is a system to manage daily tasks and track task records efficiently. It supports **Google OAuth login** and is secured with **JWT authentication**.

---

## 🛠 Tech Stack

![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Apollo Federation](https://img.shields.io/badge/Apollo%20Federation-311C87?style=for-the-badge&logo=apollo-graphql&logoColor=white)
![Google OAuth](https://img.shields.io/badge/Google%20OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)

---

## ⚙️ Features
- Manage daily tasks with ease.
- Track task completion history.
- Secure **Google OAuth login** with **JWT** authentication.
- GraphQL APIs with **Apollo Federation** for scalable architecture.

---

## 🏛️ Architecture

  ### 🏗️ System Architecture Overview
  
  ![51562AD2-621D-4BDC-AB2C-684202D99A7F](https://github.com/user-attachments/assets/c2cebc21-46e8-4edd-b9aa-a709a06051f1)
  
  
  ### 🔐 Authentication Flow

  ![C7925367-2B92-4119-BB03-D923CFE09F83](https://github.com/user-attachments/assets/c1f0c62e-f724-4b40-b97c-65b2e7e468ac)



---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node 20+
- PostgreSQL


## 🧰 Project Structure & Setup

### 🔁 Clone the repo:
---
  ```bash
  git clone https://github.com/alishawalunj/TaskOps.git
  cd TaskOps
  ````

### 📁 Project Structure
```bash
  TaskOps/
  │
  ├── frontend/                # Next.js frontend UI
  │
  ├── apollo-gateway/          # Apollo Gateway (Federation router)
  │
  ├── subgraphs/               # GraphQL Federation Subgraphs
  │   ├── auth-subgraph/       # Subgraph for auth domain
  │   └── task-subgraph/       # Subgraph for task domain
  │
  └── server/                  # Backend Microservices (REST + GraphQL)
      ├── auth/                # Spring Boot Auth service (OAuth + JWT)
      └── task/                # Spring Boot Task service
````
### 🔧 Configure Environment Variables
---
1. Auth Service
  ```bash
  server.port=8081
  
  # Google OAuth
  google.clientId=YOUR_CLIENT_ID
  google.clientSecret=YOUR_CLIENT_SECRET
  google.redirectUri=http://localhost:3000/api/auth/callback
  
  # JWT
  jwt.secret=YOUR_JWT_SECRET
  jwt.expiration=3600
  
  # Database
  spring.datasource.url=jdbc:postgresql://localhost:5432/taskops
  spring.datasource.username=postgres
  spring.datasource.password=password
  
  ````
2. Task Service
  ```bash
  server.port=8082
  
  spring.datasource.url=jdbc:postgresql://localhost:5432/taskops
  spring.datasource.username=postgres
  spring.datasource.password=password
  ````
### 📦 Install Dependencies
---

  1. Install frontend dependencies:
     ```bash
      cd frontend
      npm install
     ````
  2. Install Apollo Gateway dependencies:
      ```bash
      cd ../apollo-gateway
      npm install
     ````
  3. Install subgraph dependencies:
      ```bash
      cd ../subgraphs/auth-subgraph
      npm install
      
      cd ../task-subgraph
      npm install
     ````
  4. Build/Run Spring Boot services:
      ```bash
      cd ../../server/auth
      ./mvnw spring-boot:run
      
      cd ../task
      ./mvnw spring-boot:run
     ````
### 🚀 Run the Application

  1. Run Backend Microservices:
     ```bash
       cd server/auth
      ./mvnw spring-boot:run   # Runs on :8081
    
      cd ../task
      ./mvnw spring-boot:run   # Runs on :8082
     ````
  
  2. Run GraphQL Subgraphs:
     ```bash
      cd subgraphs/auth-subgraph
      npm start   # Runs on :4001
      
      cd ../task-subgraph
      npm start   # Runs on :4002
     ````
     
  3. Run Apollo Gateway:
     ```bash
     cd apollo-gateway
     npm start   # Runs on :4000
     ````
    
  4. Run Frontend:
     ```bash
     cd frontend
     npm run dev   # Runs on :3000
     ````
---

## 🎥 Demo


---
