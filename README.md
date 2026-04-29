# Kaching Bundles 🛍️

A smart product bundling app for Shopify — built with React + Vite (frontend) and Express + MongoDB (backend) in an npm monorepo.

---

## 📁 Project Structure

```
Kaching-Bundles/
├── apps/
│   ├── frontend/         # React 19 + Vite + Shopify Polaris
│   └── backend/          # Express 5 + Mongoose REST API
├── package.json          # Monorepo root (npm workspaces)
└── .gitignore
```

---

## 🚀 Getting Started

### 1. Install all dependencies (run once from the root)
```bash
npm install
```

### 2. Set up environment variables
```bash
# Copy the example env file and fill in your values
cp apps/backend/.env.example apps/backend/.env
```

Edit `apps/backend/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/kaching_bundles
```

### 3. Run both frontend & backend together
```bash
npm run dev
```

Or run them individually:
```bash
npm run dev:frontend   # Vite on http://localhost:5173
npm run dev:backend    # Express on http://localhost:5000
```

---

## 🔌 API

The Vite dev server proxies all `/api/*` requests to the Express backend automatically — no CORS issues during development.

| Method | Endpoint       | Description     |
|--------|---------------|-----------------|
| GET    | /api/health   | Health check    |

---

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 19, Vite, Shopify Polaris     |
| Backend   | Express 5, dotenv, cors             |
| Database  | MongoDB via Mongoose                |
| Tooling   | ESLint, concurrently, npm workspaces|

---

## 📦 Scripts

| Command              | Description                          |
|----------------------|--------------------------------------|
| `npm run dev`        | Run frontend + backend together      |
| `npm run dev:frontend` | Run only the frontend             |
| `npm run dev:backend`  | Run only the backend              |
| `npm run lint`       | Lint the frontend code               |
