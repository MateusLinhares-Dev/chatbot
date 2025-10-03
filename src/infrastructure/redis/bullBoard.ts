import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { approvalQueue } from '../queue/approvalQueue.js';

export const setupBullBoard = (app: any) => {
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');

  createBullBoard({
    queues: [new BullMQAdapter(approvalQueue)],
    serverAdapter,
  });

  app.use('/admin/queues', serverAdapter.getRouter());
};
