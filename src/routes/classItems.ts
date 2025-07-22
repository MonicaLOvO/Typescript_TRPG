import { Router } from 'express';
import {
    getAllClassItems,
    getClassItemsById,
    getClassItemsByClassId,
    createClassItems,
    updateClassItems,
    deleteClassItems,
} from '../handlers/classItems';

const router = Router();

// GET /api/class-items - Get all class items
router.get('/', getAllClassItems);

// GET /api/class-items/:id - Get class item by ID
router.get('/:id', getClassItemsById);

// GET /api/class-items/class/:classId - Get class items by class ID
router.get('/class/:classId', getClassItemsByClassId);

// POST /api/class-items - Create new class item
router.post('/', createClassItems);

// PUT /api/class-items/:id - Update class item
router.put('/:id', updateClassItems);

// DELETE /api/class-items/:id - Delete class item
router.delete('/:id', deleteClassItems);

export default router; 