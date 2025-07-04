import { Request, Response } from "express";
import { CharacterBaseDto, CreateCharacterBaseDto } from "../dtos/CharacterBase.dto";
import { prisma } from "../lib/prisma";

// GET /api/characters - Get all characters
export function getCharacters(req: Request, res: Response) {
    prisma.characterBase.findMany({
        select: {
            id: true,
            accountId: true,
            name: true,
            age: true,
            gender: true,
            description: true,
            occupation: true,
            era: true,
            imageId: true,
            str: true,
            con: true,
            siz: true,
            dex: true,
            app: true,
            int: true,
            pow: true,
            edu: true,
            luck: true,
            hp: true,
            mp: true,
            san: true,
            mov: true,
            createdAt: true,
            updatedAt: true
        }
    })
    .then((characters: any) => {
        res.json(characters);
    })
    .catch((error: any) => {
        console.error('Error fetching characters:', error);
        res.status(500).json([]);
    });
}

// GET /api/characters/:id - Get character by ID
export function getCharacterByID(req: Request, res: Response) {
    const { id } = req.params;
    
    prisma.characterBase.findUnique({
        where: { id },
        select: {
            id: true,
            accountId: true,
            name: true,
            age: true,
            gender: true,
            description: true,
            occupation: true,
            era: true,
            imageId: true,
            str: true,
            con: true,
            siz: true,
            dex: true,
            app: true,
            int: true,
            pow: true,
            edu: true,
            luck: true,
            hp: true,
            mp: true,
            san: true,
            mov: true,
            createdAt: true,
            updatedAt: true
        }
    })
    .then((character: any) => {
        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }
        res.json(character);
    })
    .catch((error: any) => {
        console.error('Error fetching character:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// GET /api/characters/account/:accountId - Get characters by account ID
export function getCharactersByAccount(req: Request, res: Response) {
    const { accountId } = req.params;
    
    prisma.characterBase.findMany({
        where: { accountId },
        select: {
            id: true,
            accountId: true,
            name: true,
            age: true,
            gender: true,
            description: true,
            occupation: true,
            era: true,
            imageId: true,
            str: true,
            con: true,
            siz: true,
            dex: true,
            app: true,
            int: true,
            pow: true,
            edu: true,
            luck: true,
            hp: true,
            mp: true,
            san: true,
            mov: true,
            createdAt: true,
            updatedAt: true
        }
    })
    .then((characters: any) => {
        res.json(characters);
    })
    .catch((error: any) => {
        console.error('Error fetching characters by account:', error);
        res.status(500).json([]);
    });
}

// POST /api/characters - Create new character
export function createCharacter(req: Request, res: Response) {
    const characterDto = req.body as CreateCharacterBaseDto;
    
    // Check if account exists
    prisma.account.findUnique({
        where: { id: characterDto.accountId }
    })
    .then((account: any) => {
        if (!account) {
            res.status(400).json({ error: 'Account not found' });
            return null;
        }
        
        return prisma.characterBase.create({
            data: {
                accountId: characterDto.accountId,
                name: characterDto.name,
                age: characterDto.age,
                gender: characterDto.gender,
                description: characterDto.description,
                occupation: characterDto.occupation,
                era: characterDto.era,
                imageId: characterDto.imageId,
                str: characterDto.str || 0,
                con: characterDto.con || 0,
                siz: characterDto.siz || 0,
                dex: characterDto.dex || 0,
                app: characterDto.app || 0,
                int: characterDto.int || 0,
                pow: characterDto.pow || 0,
                edu: characterDto.edu || 0,
                luck: characterDto.luck,
                hp: characterDto.hp || 0,
                mp: characterDto.mp || 0,
                san: characterDto.san || 0,
                mov: characterDto.mov || 0
            },
            select: {
                id: true,
                accountId: true,
                name: true,
                age: true,
                gender: true,
                description: true,
                occupation: true,
                era: true,
                imageId: true,
                str: true,
                con: true,
                siz: true,
                dex: true,
                app: true,
                int: true,
                pow: true,
                edu: true,
                luck: true,
                hp: true,
                mp: true,
                san: true,
                mov: true,
                createdAt: true,
                updatedAt: true
            }
        });
    })
    .then((character: any) => {
        if (character) {
            res.status(201).json(character);
        }
    })
    .catch((error: any) => {
        console.error('Error creating character:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// PUT /api/characters/:id - Update character
export function updateCharacter(req: Request, res: Response) {
    const { id } = req.params;
    const characterDto = req.body as CharacterBaseDto;
    
    prisma.characterBase.findUnique({
        where: { id }
    })
    .then((existingCharacter: any) => {
        if (!existingCharacter) {
            res.status(404).json({ error: 'Character not found' });
            return null;
        }
        
        return prisma.characterBase.update({
            where: { id },
            data: {
                ...(characterDto.name && { name: characterDto.name }),
                ...(characterDto.age !== undefined && { age: characterDto.age }),
                ...(characterDto.gender !== undefined && { gender: characterDto.gender }),
                ...(characterDto.description !== undefined && { description: characterDto.description }),
                ...(characterDto.occupation !== undefined && { occupation: characterDto.occupation }),
                ...(characterDto.era !== undefined && { era: characterDto.era }),
                ...(characterDto.imageId !== undefined && { imageId: characterDto.imageId }),
                ...(characterDto.str !== undefined && { str: characterDto.str }),
                ...(characterDto.con !== undefined && { con: characterDto.con }),
                ...(characterDto.siz !== undefined && { siz: characterDto.siz }),
                ...(characterDto.dex !== undefined && { dex: characterDto.dex }),
                ...(characterDto.app !== undefined && { app: characterDto.app }),
                ...(characterDto.int !== undefined && { int: characterDto.int }),
                ...(characterDto.pow !== undefined && { pow: characterDto.pow }),
                ...(characterDto.edu !== undefined && { edu: characterDto.edu }),
                ...(characterDto.luck !== undefined && { luck: characterDto.luck }),
                ...(characterDto.hp !== undefined && { hp: characterDto.hp }),
                ...(characterDto.mp !== undefined && { mp: characterDto.mp }),
                ...(characterDto.san !== undefined && { san: characterDto.san }),
                ...(characterDto.mov !== undefined && { mov: characterDto.mov })
            },
            select: {
                id: true,
                accountId: true,
                name: true,
                age: true,
                gender: true,
                description: true,
                occupation: true,
                era: true,
                imageId: true,
                str: true,
                con: true,
                siz: true,
                dex: true,
                app: true,
                int: true,
                pow: true,
                edu: true,
                luck: true,
                hp: true,
                mp: true,
                san: true,
                mov: true,
                createdAt: true,
                updatedAt: true
            }
        });
    })
    .then((character: any) => {
        if (character) res.json(character);
    })
    .catch((error: any) => {
        console.error('Error updating character:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// DELETE /api/characters/:id - Delete character
export function deleteCharacter(req: Request, res: Response) {
    const { id } = req.params;
    
    prisma.characterBase.findUnique({
        where: { id }
    })
    .then((existingCharacter: any) => {
        if (!existingCharacter) {
            res.status(404).json({ error: 'Character not found' });
            return null;
        }
        
        return prisma.characterBase.delete({
            where: { id }
        });
    })
    .then((result: any) => {
        if (result) {
            res.json({ message: 'Character deleted successfully' });
        }
    })
    .catch((error: any) => {
        console.error('Error deleting character:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
} 