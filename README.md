# National High School Exam 2024 - GOS Test

A decoupled full-stack web application designed for analyzing and looking up the 2024 Vietnamese National High School Exam results. The system features a React-Vite frontend and an ExpressJS backend, both containerized using Docker and deployed across production cloud environments (Vercel & Koyeb).

## 📁 Project's folders
```text
.
├── backend/          # Source code NodeJS Express & Docker configuration
├── frontend/         # Source code React Vite & Vercel/Docker configuration
└── README.md         # Guide & reproducibility
```
## 🛠️ Tech Stack
- **Frontend:** ReactJS, Vite, Ant Design, Axios, Chart.js.
- **Backend:** NodeJS, ExpressJS, Sequelize (ORM).
- **Database:** PostgreSQL (Supabase Cloud).
- **DevOps:** Docker, Docker Hub, Vercel, Koyeb Cloud.

## 🚀 Quick Local Setup with Docker Compose
If you have Docker Desktop installed, you can spin up the entire local environment (Frontend, Backend, and local services if applicable) with a single command:

```bash
# Build and run all containerized services in detached mode
docker-compose up -d --build
```

Once the containers are running, the application will be accessible via:

Frontend: http://localhost:3000 or http://localhost:5173

Backend: http://localhost:5000

For individual service setup, manual configuration, and custom environment configurations, please refer to the specific documentation located inside the /backend and /frontend directories.


## 🚀 Public deployed website
This is a link to vercel app connected to Koyeb backend server: https://gos-test-five.vercel.app/search
Since the server is in free-tier of Koyeb, please take your time a bit for API response, thank you!
