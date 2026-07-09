# GOS Backend API

The core backend service for the GOS system, built with NodeJS and ExpressJS. 
It handles heavy analytical calculations for grade distribution, manages examinee profiles, and communicates directly with the PostgreSQL data layer.

## ⚙️ Core Setup & Configuration
- **Database Management:** Seamless schema synchronization with PostgreSQL utilizing Sequelize ORM.
- **Smart Data Seeding:** Integrates an automated data seeder that populates exam records instantly upon detecting an empty database.
- **Dynamic CORS Policy:** Environment-driven CORS configuration allowing safe and authorized resource sharing with the production frontend domain.

## ⚙️ Core API Feature
- Check score from registration number input
- Report of the number of students with scores in the above 4 levels by subjects.
- List top 10 students of group A including (math, physics, chemistry).

## 🔑 Environment Variables (.env)
Please create a `.env` file in this directory with the following variables:
```text
PORT=5000
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<dbname>
FRONTEND_URL=http://localhost:3000
```

### 1. Install dependencies
npm install

### 2. Run the server in Development mode
npm run dev

### 3. Start the server in Production mode
npm start

### 4. Build the production-ready Docker Image
docker build -t <username_dockerhub>/gos-backend:latest .

### 5. Push the built image to Docker Hub Registry
docker push <username_dockerhub>/gos-backend:latest
