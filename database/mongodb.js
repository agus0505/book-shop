import { getConnection } from "./connectionMongoDB.js";



export const addPayData = async (payData) => {
    try {
        const database = await getConnection()
        if (!database) return
        await database.collection("Compra").insertOne(payData)
    } catch (error) {
        console.error(error)
    }
}

export const addConfirmedBuyData = async (buyData) => {
    try {
        const database = await getConnection()
        if (!database) return
        await database.collection("Confirmed_buy").insertOne(buyData)
    } catch (error) {
        console.error(error)
    }
}

export const searchMPBuy = async (MerchantOrderId) => {
    try {
        const database = await getConnection();
        if (database) {
            const collection = database.collection("Confirmed_buy");
            const buy = await collection.findOne({ ID: String(MerchantOrderId) })
            return buy; 
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};


