import { MongoClient } from "mongodb";
import { MONGODB_URL } from "../src/constants/config.js";

const getConnection = async () => {
    try {
        const mongoUrl = MONGODB_URL
        const client = await MongoClient.connect(mongoUrl)
        return client.db()
    } catch (error) {
        console.error(error)
    }
}

export { getConnection }