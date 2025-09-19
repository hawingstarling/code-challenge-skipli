import express from 'express';
import heathCheck from './health';

const router = express.Router();

router.use('/', heathCheck)

export default router;