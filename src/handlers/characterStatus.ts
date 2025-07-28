import { Request, Response } from "express";
import { CharacterStatusDto, CreateCharacterStatusDto } from "../dtos/CharacterStatus.dto";
import { prisma } from "../lib/prisma";

// GET /api/character-status - Get all character status
export function getCharacterStatus(req: Request, res: Response) {
    prisma.characterStatus.findMany({
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
    .then((status: any) => {
        res.json(status);
    })
    .catch((error: any) => {
        console.error('Error fetching character status:', error);
        res.status(500).json([]);
    });
}

// GET /api/character-status/:id - Get character status by ID
export function getCharacterStatusByID(req: Request, res: Response) {
    const { id } = req.params;
    
    // Validate that id is provided
    if (!id) {
        res.status(400).json({ error: 'Character status ID is required' });
        return;
    }
    
    prisma.characterStatus.findUnique({
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
    .then((status: any) => {
        if (!status) {
            return res.status(404).json({ error: 'Character status not found' });
        }
        res.json(status);
    })
    .catch((error: any) => {
        console.error('Error fetching character status:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// GET /api/character-status/character/:characterId - Get status by character ID
export function getCharacterStatusByCharacter(req: Request, res: Response) {
    const { characterId } = req.params;
    
    // Validate that characterId is provided
    if (!characterId) {
        res.status(400).json({ error: 'Character ID is required' });
        return;
    }
    
    prisma.characterStatus.findMany({
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
    .then((status: any) => {
        res.json(status);
    })
    .catch((error: any) => {
        console.error('Error fetching character status by character:', error);
        res.status(500).json([]);
    });
}

// POST /api/character-status - Create new character status
export function createCharacterStatus(req: Request, res: Response) {
    const statusDto = req.body as CreateCharacterStatusDto;
    
    // Validate required fields
    if (!statusDto.characterId || !statusDto.statusName) {
        res.status(400).json({ 
            error: 'Missing required fields: characterId and statusName are required' 
        });
        return;
    }
    
    // Check if character exists
    prisma.characterBase.findUnique({
        where: { id: statusDto.characterId }
    })
    .then((character: any) => {
        if (!character) {
            res.status(400).json({ error: 'Character not found' });
            return null;
        }
        
        return prisma.characterStatus.create({
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
    .then((status: any) => {
        if (status) {
            res.status(201).json(status);
        }
    })
    .catch((error: any) => {
        console.error('Error creating character status:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// PUT /api/character-status/:id - Update character status
export function updateCharacterStatus(req: Request, res: Response) {
    const { id } = req.params;
    const statusDto = req.body as CharacterStatusDto;
    
    // Validate that id is provided
    if (!id) {
        res.status(400).json({ error: 'Character status ID is required' });
        return;
    }
    
    prisma.characterStatus.findUnique({
        where: { id }
    })
    .then((existingStatus: any) => {
        if (!existingStatus) {
            res.status(404).json({ error: 'Character status not found' });
            return null;
        }
        
        return prisma.characterStatus.update({
            where: { id },
            data: {
                ...(statusDto.statusName && { statusName: statusDto.statusName }),
                ...(statusDto.value !== undefined && { value: statusDto.value }),
                ...(statusDto.description !== undefined && { description: statusDto.description })
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
    .then((status: any) => {
        if (status) res.json(status);
    })
    .catch((error: any) => {
        console.error('Error updating character status:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// DELETE /api/character-status/:id - Delete character status
export function deleteCharacterStatus(req: Request, res: Response) {
    const { id } = req.params;
    
    // Validate that id is provided
    if (!id) {
        res.status(400).json({ error: 'Character status ID is required' });
        return;
    }
    
    prisma.characterStatus.findUnique({
        where: { id }
    })
    .then((existingStatus: any) => {
        if (!existingStatus) {
            res.status(404).json({ error: 'Character status not found' });
            return null;
        }
        
        return prisma.characterStatus.delete({
            where: { id }
        });
    })
    .then((result: any) => {
        if (result) {
            res.json({ message: 'Character status deleted successfully' });
        }
    })
    .catch((error: any) => {
        console.error('Error deleting character status:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
} 