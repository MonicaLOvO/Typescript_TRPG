import { Router } from 'express';
import {
    getAllClassStatus,
    getClassStatusById,
    getClassStatusByClassId,
    createClassStatus,
    updateClassStatus,
    deleteClassStatus,
} from '../handlers/classStatus';

const router = Router();

// GET /api/class-status - Get all class status
router.get('/', getAllClassStatus);

// GET /api/class-status/class/:classId - Get class status by class ID
router.get('/class/:classId', getClassStatusByClassId);

// GET /api/class-status/:id - Get class status by ID
router.get('/:id', getClassStatusById);

// POST /api/class-status - Create new class status
router.post('/', createClassStatus);

// PUT /api/class-status/:id - Update class status
router.put('/:id', updateClassStatus);

// DELETE /api/class-status/:id - Delete class status
router.delete('/:id', deleteClassStatus);

export default router; 