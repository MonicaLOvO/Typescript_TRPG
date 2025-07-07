"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const characterStatus_1 = require("../handlers/characterStatus");
const router = (0, express_1.Router)();
// GET /api/character-status - Get all character status
router.get('/', characterStatus_1.getCharacterStatus);
// GET /api/character-status/character/:characterId - Get status by character ID
router.get('/character/:characterId', characterStatus_1.getCharacterStatusByCharacter);
// GET /api/character-status/:id - Get character status by ID
router.get('/:id', characterStatus_1.getCharacterStatusByID);
// POST /api/character-status - Create new character status
router.post('/', characterStatus_1.createCharacterStatus);
// PUT /api/character-status/:id - Update character status
router.put('/:id', characterStatus_1.updateCharacterStatus);
// DELETE /api/character-status/:id - Delete character status
router.delete('/:id', characterStatus_1.deleteCharacterStatus);
exports.default = router;
