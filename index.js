import express from 'express';
import cors from 'cors';
import path from 'path';
import payRouter from './api/pay.js';
import getFeedbackRouter from './api/getFeedback.js';
import getBuyRouter from './api/getBuy.js';
import webhooksRouter from './api/webhooks.js';
import { PORT } from './src/constants/config.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));


app.use('/api/pay', payRouter);
app.use('/getfeedback', getFeedbackRouter);
app.use('/api/getBuy', getBuyRouter);
app.use('/webhooks', webhooksRouter);

app.get('*', (req, res) => {
    res.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
