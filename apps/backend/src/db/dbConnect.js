import mongoose from 'mongoose'
import 'dotenv/config'
import dns from 'dns'

// Fix for MongoDB DNS issues (ECONNREFUSED) by using specific DNS servers
dns.setServers(['8.8.8.8', '8.8.4.4'])

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`✅ MongoDB connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(`❌ MongoDB connection error: ${err.message}`)
        process.exit(1)
    }
}

export default connectDB

