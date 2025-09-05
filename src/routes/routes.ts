import express from 'express';
import { MessageWebhookTeams } from '../controllers/useControllerMessages'

const router = express.Router()

router.post('/api/messages', MessageWebhookTeams)

export { router };