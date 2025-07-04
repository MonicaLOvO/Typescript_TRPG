import { Router } from "express";
import { 
    createCharacterItem, 
    deleteCharacterItem, 
    getCharacterItemByID, 
    getCharacterItems, 
    getCharacterItemsByCharacter,
    updateCharacterItem 
} from "../handlers/characterItems";

const router = Router();

// GET /api/character-items - Get all character items
router.get('/', getCharacterItems);

// GET /api/character-items/character/:characterId - Get items by character ID
router.get('/character/:characterId', getCharacterItemsByCharacter);

// GET /api/character-items/:id - Get character item by ID
router.get('/:id', getCharacterItemByID);

// POST /api/character-items - Create new character item
router.post('/', createCharacterItem);

// PUT /api/character-items/:id - Update character item
router.put('/:id', updateCharacterItem);

// DELETE /api/character-items/:id - Delete character item
router.delete('/:id', deleteCharacterItem);

export default router; 