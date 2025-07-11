import { Router } from 'express';
import * as actorHandler from '../handlers/actors';

const router = Router();

router.get('/:id', actorHandler.getActorById);
router.post('/', actorHandler.createActor);
router.put('/', actorHandler.updateActor);
router.get('/room/:roomId', actorHandler.getAllActorByRoom);
router.delete('/:id', actorHandler.deleteActor);

export default router; 