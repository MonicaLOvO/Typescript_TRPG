"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const characterItems_1 = require("../handlers/characterItems");
const router = (0, express_1.Router)();
// GET /api/character-items - Get all character items
router.get('/', characterItems_1.getCharacterItems);
// GET /api/character-items/character/:characterId - Get items by character ID
router.get('/character/:characterId', characterItems_1.getCharacterItemsByCharacter);
// GET /api/character-items/:id - Get character item by ID
router.get('/:id', characterItems_1.getCharacterItemByID);
// POST /api/character-items - Create new character item
router.post('/', characterItems_1.createCharacterItem);
// PUT /api/character-items/:id - Update character item
router.put('/:id', characterItems_1.updateCharacterItem);
// DELETE /api/character-items/:id - Delete character item
router.delete('/:id', characterItems_1.deleteCharacterItem);
exports.default = router;
