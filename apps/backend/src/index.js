import app from './App.js'
import connectDB from './db/dbConnect.js'
import 'dotenv/config'

const PORT = process.env.PORT || 5000

// ─── Database + Server Start ──────────────────────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`)
  })
})
