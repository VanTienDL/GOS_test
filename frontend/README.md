# GOS Frontend UI

The client-side dashboard for the GOS system, engineered using ReactJS and Vite. It provides users with lightning-fast query interfaces and highly interactive analytical visual components.

## ⚙️ Core Features
- **Score Lookup:** Allows instant student result queries filtered precisely by Examination Roll Number (Số báo danh - SBD).
- **Statistical Analysis:** Renders dynamic chart distributions mapping exam statistics per subject via Chart.js.
- **Top Performers Ranking:** Displays filtered leaderboards for top-scoring students across various exam combinations (Group A).

## 🔑 Environment Variables (`.env`)
Please create a `.env` file in this directory to connect with the backend service:
```text
VITE_API_BASE_URL=http://localhost:5000/api
```

### 1. Install dependencies
npm install

### 2. Run the local Vite development server
npm run dev

### 3. Compile and build production-ready static assets to /dist
npm run build

## 🛠️ Vercel Deployment Configuration (vercel.json)
This project leverages custom rewrites rules in vercel.json to handle two deployment edge cases natively:

API Proxy Routing (/api/*): Dynamically proxies incoming API requests to the production Koyeb instance, successfully bypassing the browser's strict Same-Origin Policy (CORS).

Client-Side Routing Patch: Rewrites all standalone vanity routes (e.g., /search, /chart) back to index.html. This natively eliminates 404 Not Found errors when users hard-refresh the page or share deep links in Incognito mode.
