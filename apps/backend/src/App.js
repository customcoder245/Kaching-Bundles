import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes 
app.get('/api/status', (req, res) => {
    res.json({ status: 'ok', message: 'Kaching Bundles API is running 🚀' })
})

// Serve static files from the frontend build directory
const frontendPath = path.join(__dirname, '../../frontend/dist')
app.use(express.static(frontendPath))

// Handle SPA routing - send all non-API requests to index.html
app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API route not found' })
    }
    res.sendFile(path.join(frontendPath, 'index.html'))
})

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(`[ERROR] ${new Date().toISOString()}:`, err.stack)
    res.status(err.status || 500).json({ 
        error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message 
    })
})

export default app
