import { Router } from "express";
import { 
    createCharacter, 
    deleteCharacter, 
    getCharacterByID, 
    getCharacters, 
    getCharactersByAccount,
    updateCharacter 
} from "../handlers/characters";

const router = Router();

// GET /api/characters - Get all characters
router.get('/', getCharacters);

// GET /api/characters/account/:accountId - Get characters by account ID
router.get('/account/:accountId', getCharactersByAccount);

// GET /api/characters/:id - Get character by ID
router.get('/:id', getCharacterByID);

// POST /api/characters - Create new character
router.post('/', createCharacter);

// PUT /api/characters/:id - Update character
router.put('/:id', updateCharacter);

// DELETE /api/characters/:id - Delete character
router.delete('/:id', deleteCharacter);

export default router; 