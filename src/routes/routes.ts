import express from 'express';
import { MessageWebhookTeams } from '../controllers/useControllerMessages'
import { NotifyFollowUpStart } from '../controllers/useControllerNotifyFollowUpStart';
import { validate } from '../services/middleware/middlewareValidateUserReq';
import { defaultInterfaceInfoReqNotify } from '../dto/validation/zodInfoReqNotify';
import { NotifyFollowUpEnd } from '../controllers/useControllerNotifyFollowUpEnd';
import { NotifyTrackingStart } from '../controllers/useControllerNotifyTrackingStart';
import { NotifyTrackingEnd } from '../controllers/useControllerActionTrackingEnd';

const router = express.Router()

router.post('/api/messages', MessageWebhookTeams)
router.post('/api/notifyFollowUpStart', validate(defaultInterfaceInfoReqNotify), NotifyFollowUpStart)
router.post('/api/notifyFollowUpEnd', validate(defaultInterfaceInfoReqNotify), NotifyFollowUpEnd)
router.post('/api/notifyTrackingStart', validate(defaultInterfaceInfoReqNotify), NotifyTrackingStart)
router.post('/api/notifyTrackingEnd', validate(defaultInterfaceInfoReqNotify), NotifyTrackingEnd)

export { router };