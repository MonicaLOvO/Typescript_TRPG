import { Request, Response } from "express";
import { CharacterItemsDto, CreateCharacterItemsDto } from "../dtos/CharacterItems.dto";
import { prisma } from "../lib/prisma";

// GET /api/character-items - Get all character items
export function getCharacterItems(req: Request, res: Response) {
    prisma.characterItems.findMany({
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
    .then((items: any) => {
        res.json(items);
    })
    .catch((error: any) => {
        console.error('Error fetching character items:', error);
        res.status(500).json([]);
    });
}

// GET /api/character-items/:id - Get character item by ID
export function getCharacterItemByID(req: Request, res: Response) {
    const { id } = req.params;
    
    prisma.characterItems.findUnique({
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
    .then((item: any) => {
        if (!item) {
            return res.status(404).json({ error: 'Character item not found' });
        }
        res.json(item);
    })
    .catch((error: any) => {
        console.error('Error fetching character item:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// GET /api/character-items/character/:characterId - Get items by character ID
export function getCharacterItemsByCharacter(req: Request, res: Response) {
    const { characterId } = req.params;
    
    prisma.characterItems.findMany({
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
    .then((items: any) => {
        res.json(items);
    })
    .catch((error: any) => {
        console.error('Error fetching character items by character:', error);
        res.status(500).json([]);
    });
}

// POST /api/character-items - Create new character item
export function createCharacterItem(req: Request, res: Response) {
    const itemDto = req.body as CreateCharacterItemsDto;
    
    // Check if character exists
    prisma.characterBase.findUnique({
        where: { id: itemDto.characterId }
    })
    .then((character: any) => {
        if (!character) {
            res.status(400).json({ error: 'Character not found' });
            return null;
        }
        
        return prisma.characterItems.create({
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
    .then((item: any) => {
        if (item) {
            res.status(201).json(item);
        }
    })
    .catch((error: any) => {
        console.error('Error creating character item:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// PUT /api/character-items/:id - Update character item
export function updateCharacterItem(req: Request, res: Response) {
    const { id } = req.params;
    const itemDto = req.body as CharacterItemsDto;
    
    prisma.characterItems.findUnique({
        where: { id }
    })
    .then((existingItem: any) => {
        if (!existingItem) {
            res.status(404).json({ error: 'Character item not found' });
            return null;
        }
        
        return prisma.characterItems.update({
            where: { id },
            data: {
                ...(itemDto.itemName && { itemName: itemDto.itemName }),
                ...(itemDto.value !== undefined && { value: itemDto.value }),
                ...(itemDto.quantity !== undefined && { quantity: itemDto.quantity }),
                ...(itemDto.description !== undefined && { description: itemDto.description }),
                ...(itemDto.diceId !== undefined && { diceId: itemDto.diceId })
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
    .then((item: any) => {
        if (item) res.json(item);
    })
    .catch((error: any) => {
        console.error('Error updating character item:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// DELETE /api/character-items/:id - Delete character item
export function deleteCharacterItem(req: Request, res: Response) {
    const { id } = req.params;
    
    prisma.characterItems.findUnique({
        where: { id }
    })
    .then((existingItem: any) => {
        if (!existingItem) {
            res.status(404).json({ error: 'Character item not found' });
            return null;
        }
        
        return prisma.characterItems.delete({
            where: { id }
        });
    })
    .then((result: any) => {
        if (result) {
            res.json({ message: 'Character item deleted successfully' });
        }
    })
    .catch((error: any) => {
        console.error('Error deleting character item:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
} 