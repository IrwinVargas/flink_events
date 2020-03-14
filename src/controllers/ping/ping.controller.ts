import {Router} from 'express';
const ping = Router();

ping.get('/ping',(req, res)=>{
    
    res.status(200).json({ status: 'ok' });
});

module.exports = ping;