import { Router } from "express";
import { 
    createCharacterStatus, 
    deleteCharacterStatus, 
    getCharacterStatus, 
    getCharacterStatusByID, 
    getCharacterStatusByCharacter,
    updateCharacterStatus 
} from "../handlers/characterStatus";

const router = Router();

// GET /api/character-status - Get all character status
router.get('/', getCharacterStatus);

// GET /api/character-status/character/:characterId - Get status by character ID
router.get('/character/:characterId', getCharacterStatusByCharacter);

// GET /api/character-status/:id - Get character status by ID
router.get('/:id', getCharacterStatusByID);

// POST /api/character-status - Create new character status
router.post('/', createCharacterStatus);

// PUT /api/character-status/:id - Update character status
router.put('/:id', updateCharacterStatus);

// DELETE /api/character-status/:id - Delete character status
router.delete('/:id', deleteCharacterStatus);

export default router; 