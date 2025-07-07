"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharacterItems = getCharacterItems;
exports.getCharacterItemByID = getCharacterItemByID;
exports.getCharacterItemsByCharacter = getCharacterItemsByCharacter;
exports.createCharacterItem = createCharacterItem;
exports.updateCharacterItem = updateCharacterItem;
exports.deleteCharacterItem = deleteCharacterItem;
const prisma_1 = require("../lib/prisma");
// GET /api/character-items - Get all character items
function getCharacterItems(req, res) {
    prisma_1.prisma.characterItems.findMany({
        select: {
            id: true,
            itemName: true,
            value: true,
            quantity: true,
            description: true,
            diceId: true,
            characterId: true,
            createdAt: true,
            updatedAt: true
        }
    })
        .then((items) => {
        res.json(items);
    })
        .catch((error) => {
        console.error('Error fetching character items:', error);
        res.status(500).json([]);
    });
}
// GET /api/character-items/:id - Get character item by ID
function getCharacterItemByID(req, res) {
    const { id } = req.params;
    prisma_1.prisma.characterItems.findUnique({
        where: { id },
        select: {
            id: true,
            itemName: true,
            value: true,
            quantity: true,
            description: true,
            diceId: true,
            characterId: true,
            createdAt: true,
            updatedAt: true
        }
    })
        .then((item) => {
        if (!item) {
            return res.status(404).json({ error: 'Character item not found' });
        }
        res.json(item);
    })
        .catch((error) => {
        console.error('Error fetching character item:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}
// GET /api/character-items/character/:characterId - Get items by character ID
function getCharacterItemsByCharacter(req, res) {
    const { characterId } = req.params;
    prisma_1.prisma.characterItems.findMany({
        where: { characterId },
        select: {
            id: true,
            itemName: true,
            value: true,
            quantity: true,
            description: true,
            diceId: true,
            characterId: true,
            createdAt: true,
            updatedAt: true
        }
    })
        .then((items) => {
        res.json(items);
    })
        .catch((error) => {
        console.error('Error fetching character items by character:', error);
        res.status(500).json([]);
    });
}
// POST /api/character-items - Create new character item
function createCharacterItem(req, res) {
    const itemDto = req.body;
    // Check if character exists
    prisma_1.prisma.characterBase.findUnique({
        where: { id: itemDto.characterId }
    })
        .then((character) => {
        if (!character) {
            res.status(400).json({ error: 'Character not found' });
            return null;
        }
        return prisma_1.prisma.characterItems.create({
            data: {
                itemName: itemDto.itemName,
                value: itemDto.value,
                quantity: itemDto.quantity || 1,
                description: itemDto.description,
                diceId: itemDto.diceId,
                characterId: itemDto.characterId
            },
            select: {
                id: true,
                itemName: true,
                value: true,
                quantity: true,
                description: true,
                diceId: true,
                characterId: true,
                createdAt: true,
                updatedAt: true
            }
        });
    })
        .then((item) => {
        if (item) {
            res.status(201).json(item);
        }
    })
        .catch((error) => {
        console.error('Error creating character item:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}
// PUT /api/character-items/:id - Update character item
function updateCharacterItem(req, res) {
    const { id } = req.params;
    const itemDto = req.body;
    prisma_1.prisma.characterItems.findUnique({
        where: { id }
    })
        .then((existingItem) => {
        if (!existingItem) {
            res.status(404).json({ error: 'Character item not found' });
            return null;
        }
        return prisma_1.prisma.characterItems.update({
            where: { id },
            data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (itemDto.itemName && { itemName: itemDto.itemName })), (itemDto.value !== undefined && { value: itemDto.value })), (itemDto.quantity !== undefined && { quantity: itemDto.quantity })), (itemDto.description !== undefined && { description: itemDto.description })), (itemDto.diceId !== undefined && { diceId: itemDto.diceId })),
            select: {
                id: true,
                itemName: true,
                value: true,
                quantity: true,
                description: true,
                diceId: true,
                characterId: true,
                createdAt: true,
                updatedAt: true
            }
        });
    })
        .then((item) => {
        if (item)
            res.json(item);
    })
        .catch((error) => {
        console.error('Error updating character item:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}
// DELETE /api/character-items/:id - Delete character item
function deleteCharacterItem(req, res) {
    const { id } = req.params;
    prisma_1.prisma.characterItems.findUnique({
        where: { id }
    })
        .then((existingItem) => {
        if (!existingItem) {
            res.status(404).json({ error: 'Character item not found' });
            return null;
        }
        return prisma_1.prisma.characterItems.delete({
            where: { id }
        });
    })
        .then((result) => {
        if (result) {
            res.json({ message: 'Character item deleted successfully' });
        }
    })
        .catch((error) => {
        console.error('Error deleting character item:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}
