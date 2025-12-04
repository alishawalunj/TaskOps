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

## 📂 Project Structure
```


                                            Frontend (Next.js) - Port 4000
                                                       |
                                                       v
                                               Apollo Gateway - Port 4000
                                                 /                 \
                                                v                   v
                                            Auth Subgraph       Task Subgraph
                                               4001                4002
                                               |                     |
                                               v                     v
                                            Backend Services(Spring Boot)
                                               |                     |
                                             Auth Service 8081     Task Service 8082
                                            (GraphQL APIs)        (GraphQL APIs)


````
---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node 20+
- PostgreSQL

### Setup & Run
1. Clone the repo:
```bash
git clone https://github.com/alishawalunj/TaskOps.git
cd TaskOps
````

2. Configure environment variables:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
JWT_SECRET=
DB_URL=
```

3. Start backend:

```bash
./mvnw spring-boot:run
```

4. Start frontend:

```bash
npm install
npm run dev
```

---

## 🎥 Demo


---
