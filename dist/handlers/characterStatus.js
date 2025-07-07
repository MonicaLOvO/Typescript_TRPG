"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharacterStatus = getCharacterStatus;
exports.getCharacterStatusByID = getCharacterStatusByID;
exports.getCharacterStatusByCharacter = getCharacterStatusByCharacter;
exports.createCharacterStatus = createCharacterStatus;
exports.updateCharacterStatus = updateCharacterStatus;
exports.deleteCharacterStatus = deleteCharacterStatus;
const prisma_1 = require("../lib/prisma");
// GET /api/character-status - Get all character status
function getCharacterStatus(req, res) {
    prisma_1.prisma.characterStatus.findMany({
        select: {
            id: true,
            statusName: true,
            value: true,
            description: true,
            characterId: true,
            createdAt: true,
            updatedAt: true
        }
    })
        .then((status) => {
        res.json(status);
    })
        .catch((error) => {
        console.error('Error fetching character status:', error);
        res.status(500).json([]);
    });
}
// GET /api/character-status/:id - Get character status by ID
function getCharacterStatusByID(req, res) {
    const { id } = req.params;
    prisma_1.prisma.characterStatus.findUnique({
        where: { id },
        select: {
            id: true,
            statusName: true,
            value: true,
            description: true,
            characterId: true,
            createdAt: true,
            updatedAt: true
        }
    })
        .then((status) => {
        if (!status) {
            return res.status(404).json({ error: 'Character status not found' });
        }
        res.json(status);
    })
        .catch((error) => {
        console.error('Error fetching character status:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}
// GET /api/character-status/character/:characterId - Get status by character ID
function getCharacterStatusByCharacter(req, res) {
    const { characterId } = req.params;
    prisma_1.prisma.characterStatus.findMany({
        where: { characterId },
        select: {
            id: true,
            statusName: true,
            value: true,
            description: true,
            characterId: true,
            createdAt: true,
            updatedAt: true
        }
    })
        .then((status) => {
        res.json(status);
    })
        .catch((error) => {
        console.error('Error fetching character status by character:', error);
        res.status(500).json([]);
    });
}
// POST /api/character-status - Create new character status
function createCharacterStatus(req, res) {
    const statusDto = req.body;
    // Check if character exists
    prisma_1.prisma.characterBase.findUnique({
        where: { id: statusDto.characterId }
    })
        .then((character) => {
        if (!character) {
            res.status(400).json({ error: 'Character not found' });
            return null;
        }
        return prisma_1.prisma.characterStatus.create({
            data: {
                statusName: statusDto.statusName,
                value: statusDto.value || 0,
                description: statusDto.description,
                characterId: statusDto.characterId
            },
            select: {
                id: true,
                statusName: true,
                value: true,
                description: true,
                characterId: true,
                createdAt: true,
                updatedAt: true
            }
        });
    })
        .then((status) => {
        if (status) {
            res.status(201).json(status);
        }
    })
        .catch((error) => {
        console.error('Error creating character status:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}
// PUT /api/character-status/:id - Update character status
function updateCharacterStatus(req, res) {
    const { id } = req.params;
    const statusDto = req.body;
    prisma_1.prisma.characterStatus.findUnique({
        where: { id }
    })
        .then((existingStatus) => {
        if (!existingStatus) {
            res.status(404).json({ error: 'Character status not found' });
            return null;
        }
        return prisma_1.prisma.characterStatus.update({
            where: { id },
            data: Object.assign(Object.assign(Object.assign({}, (statusDto.statusName && { statusName: statusDto.statusName })), (statusDto.value !== undefined && { value: statusDto.value })), (statusDto.description !== undefined && { description: statusDto.description })),
            select: {
                id: true,
                statusName: true,
                value: true,
                description: true,
                characterId: true,
                createdAt: true,
                updatedAt: true
            }
        });
    })
        .then((status) => {
        if (status)
            res.json(status);
    })
        .catch((error) => {
        console.error('Error updating character status:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}
// DELETE /api/character-status/:id - Delete character status
function deleteCharacterStatus(req, res) {
    const { id } = req.params;
    prisma_1.prisma.characterStatus.findUnique({
        where: { id }
    })
        .then((existingStatus) => {
        if (!existingStatus) {
            res.status(404).json({ error: 'Character status not found' });
            return null;
        }
        return prisma_1.prisma.characterStatus.delete({
            where: { id }
        });
    })
        .then((result) => {
        if (result) {
            res.json({ message: 'Character status deleted successfully' });
        }
    })
        .catch((error) => {
        console.error('Error deleting character status:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}
