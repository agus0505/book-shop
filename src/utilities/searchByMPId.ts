import { MongoClient } from "mongodb";
import { Purchase } from "../components/Feedback";

const getConnection = async () => {
    try {
        const mongoUrl = "mongodb://localhost:27017/Compras_libros"
        const client = await MongoClient.connect(mongoUrl)
        return client.db()
    } catch (error) {
        console.error(error)
    }
}

export const searchMPBuy = async (MerchantOrderId: string): Promise<Purchase | null> => {
    try {
        const database = await getConnection();
        if (database) {
            const collection = database.collection("Confirmed_buy");
            const buy = await collection.findOne({ ID: MerchantOrderId }) as Purchase | null; 
            return buy; 
        }
    } catch (error) {
        console.error(error);
    }
    return null; 
}