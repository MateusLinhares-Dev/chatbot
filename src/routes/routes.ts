import express from 'express';
import { MessageWebhookTeams } from '../controllers/useControllerMessages.js'
import { NotifyFollowUpStart } from '../controllers/useControllerNotifyFollowUpStart.js';
import { validate } from '../services/middleware/middlewareValidateUserReq.js';
import { defaultInterfaceInfoReqNotify } from '../dto/validation/zodInfoReqNotify.js';
import { NotifyFollowUpEnd } from '../controllers/useControllerNotifyFollowUpEnd.js';
import { NotifyTrackingStart } from '../controllers/useControllerNotifyTrackingStart.js';
import { NotifyTrackingEnd } from '../controllers/useControllerActionTrackingEnd.js';

const router = express.Router()

router.post('/api/messages', MessageWebhookTeams)
router.post('/api/notifyFollowUpStart', validate(defaultInterfaceInfoReqNotify), NotifyFollowUpStart)
router.post('/api/notifyFollowUpEnd', validate(defaultInterfaceInfoReqNotify), NotifyFollowUpEnd)
router.post('/api/notifyTrackingStart', validate(defaultInterfaceInfoReqNotify), NotifyTrackingStart)
router.post('/api/notifyTrackingEnd', validate(defaultInterfaceInfoReqNotify), NotifyTrackingEnd)

export { router };