"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const characters_1 = require("../handlers/characters");
const router = (0, express_1.Router)();
// GET /api/characters - Get all characters
router.get('/', characters_1.getCharacters);
// GET /api/characters/account/:accountId - Get characters by account ID
router.get('/account/:accountId', characters_1.getCharactersByAccount);
// GET /api/characters/:id - Get character by ID
router.get('/:id', characters_1.getCharacterByID);
// POST /api/characters - Create new character
router.post('/', characters_1.createCharacter);
// PUT /api/characters/:id - Update character
router.put('/:id', characters_1.updateCharacter);
// DELETE /api/characters/:id - Delete character
router.delete('/:id', characters_1.deleteCharacter);
exports.default = router;
