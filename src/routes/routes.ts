import express from 'express';
import { MessageWebhookTeams } from '../controllers/useControllerMessages'
import { NotifyFollowUpStart } from '../controllers/useControllerNotifyFollowUpStart';

const router = express.Router()

router.post('/api/messages', MessageWebhookTeams)
router.post('/api/notifyFollowUpStart', NotifyFollowUpStart)

export { router };