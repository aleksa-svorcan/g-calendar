import express from 'express';
import { fetchEvents, createEvent } from '../controllers/event.js'

const router = express.Router();

router.get('/', fetchEvents);
router.post('/', createEvent);

export default router;