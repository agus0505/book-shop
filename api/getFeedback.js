import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    res.redirect(`/feedback/${req.query.merchant_order_id}/${req.query.status}`);
});

export default router;