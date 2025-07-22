import { Router } from 'express';
import {
    getAllClassBases,
    getClassBaseById,
    createClassBase,
    updateClassBase,
    deleteClassBase,
} from '../handlers/classBase';

const router = Router();

// GET /api/class-bases - Get all class bases
router.get('/', getAllClassBases);

// GET /api/class-bases/:id - Get class base by ID
router.get('/:id', getClassBaseById);

// POST /api/class-bases - Create new class base
router.post('/', createClassBase);

// PUT /api/class-bases/:id - Update class base
router.put('/:id', updateClassBase);

// DELETE /api/class-bases/:id - Delete class base
router.delete('/:id', deleteClassBase);

export default router; 