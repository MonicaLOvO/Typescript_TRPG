"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCharacter = exports.updateCharacter = exports.createCharacter = exports.getCharactersByAccount = exports.getCharacterByID = exports.getCharacters = void 0;
const prisma_1 = require("../lib/prisma");
// GET /api/characters - Get all characters
const getCharacters = (req, res) => {
    prisma_1.prisma.characterBase.findMany({
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
        .then((characters) => {
        res.json(characters);
    })
        .catch((error) => {
        console.error('Error fetching characters:', error);
        res.status(500).json([]);
    });
};
exports.getCharacters = getCharacters;
// GET /api/characters/:id - Get character by ID
const getCharacterByID = (req, res) => {
    const { id } = req.params;
    prisma_1.prisma.characterBase.findUnique({
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
        .then((character) => {
        if (!character) {
            res.status(404).json({ error: 'Character not found' });
            return;
        }
        res.json(character);
    })
        .catch((error) => {
        console.error('Error fetching character:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
};
exports.getCharacterByID = getCharacterByID;
// GET /api/characters/account/:accountId - Get characters by account ID
const getCharactersByAccount = (req, res) => {
    const { accountId } = req.params;
    prisma_1.prisma.characterBase.findMany({
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
        .then((characters) => {
        res.json(characters);
    })
        .catch((error) => {
        console.error('Error fetching characters by account:', error);
        res.status(500).json([]);
    });
};
exports.getCharactersByAccount = getCharactersByAccount;
// POST /api/characters - Create new character
const createCharacter = (req, res) => {
    const characterDto = req.body;
    // Validate required fields
    if (!characterDto.accountId) {
        res.status(400).json({ error: 'accountId is required' });
        return;
    }
    if (!characterDto.name) {
        res.status(400).json({ error: 'name is required' });
        return;
    }
    console.log('Creating character with data:', characterDto);
    // Check if account exists
    prisma_1.prisma.account.findUnique({
        where: { id: characterDto.accountId }
    })
        .then((account) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        if (!account) {
            console.log('Account not found:', characterDto.accountId);
            res.status(400).json({ error: 'Account not found', accountId: characterDto.accountId });
            return;
        }
        console.log('Account found, creating character...');
        return prisma_1.prisma.characterBase.create({
            data: {
                accountId: characterDto.accountId,
                name: characterDto.name,
                age: (_a = characterDto.age) !== null && _a !== void 0 ? _a : null,
                gender: (_b = characterDto.gender) !== null && _b !== void 0 ? _b : null,
                description: (_c = characterDto.description) !== null && _c !== void 0 ? _c : null,
                occupation: (_d = characterDto.occupation) !== null && _d !== void 0 ? _d : null,
                era: (_e = characterDto.era) !== null && _e !== void 0 ? _e : null,
                imageId: (_f = characterDto.imageId) !== null && _f !== void 0 ? _f : null,
                str: (_g = characterDto.str) !== null && _g !== void 0 ? _g : 0,
                con: (_h = characterDto.con) !== null && _h !== void 0 ? _h : 0,
                siz: (_j = characterDto.siz) !== null && _j !== void 0 ? _j : 0,
                dex: (_k = characterDto.dex) !== null && _k !== void 0 ? _k : 0,
                app: (_l = characterDto.app) !== null && _l !== void 0 ? _l : 0,
                int: (_m = characterDto.int) !== null && _m !== void 0 ? _m : 0,
                pow: (_o = characterDto.pow) !== null && _o !== void 0 ? _o : 0,
                edu: (_p = characterDto.edu) !== null && _p !== void 0 ? _p : 0,
                luck: (_q = characterDto.luck) !== null && _q !== void 0 ? _q : null,
                hp: (_r = characterDto.hp) !== null && _r !== void 0 ? _r : 0,
                mp: (_s = characterDto.mp) !== null && _s !== void 0 ? _s : 0,
                san: (_t = characterDto.san) !== null && _t !== void 0 ? _t : 0,
                mov: (_u = characterDto.mov) !== null && _u !== void 0 ? _u : 0
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
        .then((character) => {
        if (character) {
            console.log('Character created successfully:', character.id);
            res.status(201).json(character);
        }
        else {
            // This should not happen, but just in case
            res.status(500).json({ error: 'Failed to create character' });
        }
    })
        .catch((error) => {
        console.error('Error creating character:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error.message,
            code: error.code
        });
    });
};
exports.createCharacter = createCharacter;
// PUT /api/characters/:id - Update character
const updateCharacter = (req, res) => {
    const { id } = req.params;
    const characterDto = req.body;
    prisma_1.prisma.characterBase.findUnique({
        where: { id }
    })
        .then((existingCharacter) => {
        if (!existingCharacter) {
            res.status(404).json({ error: 'Character not found' });
            return;
        }
        return prisma_1.prisma.characterBase.update({
            where: { id },
            data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (characterDto.name !== undefined && { name: characterDto.name })), (characterDto.age !== undefined && { age: characterDto.age })), (characterDto.gender !== undefined && { gender: characterDto.gender })), (characterDto.description !== undefined && { description: characterDto.description })), (characterDto.occupation !== undefined && { occupation: characterDto.occupation })), (characterDto.era !== undefined && { era: characterDto.era })), (characterDto.imageId !== undefined && { imageId: characterDto.imageId })), (characterDto.str !== undefined && { str: characterDto.str })), (characterDto.con !== undefined && { con: characterDto.con })), (characterDto.siz !== undefined && { siz: characterDto.siz })), (characterDto.dex !== undefined && { dex: characterDto.dex })), (characterDto.app !== undefined && { app: characterDto.app })), (characterDto.int !== undefined && { int: characterDto.int })), (characterDto.pow !== undefined && { pow: characterDto.pow })), (characterDto.edu !== undefined && { edu: characterDto.edu })), (characterDto.luck !== undefined && { luck: characterDto.luck })), (characterDto.hp !== undefined && { hp: characterDto.hp })), (characterDto.mp !== undefined && { mp: characterDto.mp })), (characterDto.san !== undefined && { san: characterDto.san })), (characterDto.mov !== undefined && { mov: characterDto.mov })),
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
        .then((character) => {
        if (character)
            res.json(character);
    })
        .catch((error) => {
        console.error('Error updating character:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
};
exports.updateCharacter = updateCharacter;
// DELETE /api/characters/:id - Delete character
const deleteCharacter = (req, res) => {
    const { id } = req.params;
    prisma_1.prisma.characterBase.findUnique({
        where: { id }
    })
        .then((existingCharacter) => {
        if (!existingCharacter) {
            res.status(404).json({ error: 'Character not found' });
            return;
        }
        return prisma_1.prisma.characterBase.delete({
            where: { id }
        });
    })
        .then((result) => {
        if (result) {
            res.json({ message: 'Character deleted successfully' });
        }
    })
        .catch((error) => {
        console.error('Error deleting character:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
};
exports.deleteCharacter = deleteCharacter;
