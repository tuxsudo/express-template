import express from 'express';

export const router = express.Router();

router.get('/', (req, res) => {
    res.send({...({
        greeting: "Hello world"
    })});
});


export default router;
