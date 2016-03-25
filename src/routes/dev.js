import express from 'express';

export const router = express.Router();

router.get('/config', (req, res) => {
    res.send({});
});


export default router;
