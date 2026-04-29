import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes 
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Kaching Bundles API is running 🚀' })
})

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' })
})

export default app
