import express from 'express';
//import { searchMPBuy } from '../database/mongodb.js';

const router = express.Router();

router.get('/:merchant_order_id/:status', async (req, res) => {
    //const { merchant_order_id } = req.params;
    //const buy = await searchMPBuy(merchant_order_id);
    //res.json(buy);
    res.json({ message: 'Buy confirmed' })
});

export default router;