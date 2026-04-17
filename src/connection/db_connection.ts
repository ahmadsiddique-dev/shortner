import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

export default async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        return
    }

    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/link`)
        
        connection.isConnected = db.connections[0].readyState

    } catch (error) {
        process.exit()
    }
}