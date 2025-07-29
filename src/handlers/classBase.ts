import { Request, Response, RequestHandler } from 'express';
import { CreateClassBaseDto, UpdateClassBaseDto } from '../dtos/ClassBase.dto';
import { prisma } from '../lib/prisma';

// GET /api/class-bases - Get all class bases
export const getAllClassBases: RequestHandler = (req, res) => {
    prisma.classBase.findMany({
        include: {
            image: true,
            items: true,
            status: true,
        },
    })
    .then((classBases: any) => {
        res.json(classBases);
    })
    .catch((error: any) => {
        console.error('Error fetching class bases:', error);
        res.status(500).json({ error: 'Failed to fetch class bases' });
    });
};

// GET /api/class-bases/:id - Get class base by ID
export const getClassBaseById: RequestHandler = (req, res) => {
    const { id } = req.params;
    
    prisma.classBase.findUnique({
        where: { id },
        include: {
            image: true,
            items: true,
            status: true,
        },
    })
    .then((classBase: any) => {
        if (!classBase) {
            res.status(404).json({ error: 'Class base not found' });
            return;
        }
        res.json(classBase);
    })
    .catch((error: any) => {
        console.error('Error fetching class base:', error);
        res.status(500).json({ error: 'Failed to fetch class base' });
    });
};

// POST /api/class-bases - Create new class base
export const createClassBase: RequestHandler = (req, res) => {
    const classBaseData: CreateClassBaseDto = req.body;

    // Set default values for stats if not provided
    const defaultStats = {
        str: 0,
        con: 0,
        siz: 0,
        dex: 0,
        app: 0,
        int: 0,
        pow: 0,
        edu: 0,
        hp: 0,
        mp: 0,
        san: 0,
        mov: 0,
    };

    const data = {
        name: classBaseData.name,
        age: classBaseData.age,
        gender: classBaseData.gender,
        description: classBaseData.description,
        occupation: classBaseData.occupation,
        era: classBaseData.era,
        imageId: classBaseData.imageId,
        luck: classBaseData.luck,
        str: classBaseData.str ?? defaultStats.str,
        con: classBaseData.con ?? defaultStats.con,
        siz: classBaseData.siz ?? defaultStats.siz,
        dex: classBaseData.dex ?? defaultStats.dex,
        app: classBaseData.app ?? defaultStats.app,
        int: classBaseData.int ?? defaultStats.int,
        pow: classBaseData.pow ?? defaultStats.pow,
        edu: classBaseData.edu ?? defaultStats.edu,
        hp: classBaseData.hp ?? defaultStats.hp,
        mp: classBaseData.mp ?? defaultStats.mp,
        san: classBaseData.san ?? defaultStats.san,
        mov: classBaseData.mov ?? defaultStats.mov,
    };

    prisma.classBase.create({
        data,
        include: {
            image: true,
            items: true,
            status: true,
        },
    })
    .then((classBase: any) => {
        res.status(201).json(classBase);
    })
    .catch((error: any) => {
        console.error('Error creating class base:', error);
        res.status(500).json({ error: 'Failed to create class base' });
    });
};

// PUT /api/class-bases/:id - Update class base
export const updateClassBase: RequestHandler = (req, res) => {
    const { id } = req.params;
    const updateData: UpdateClassBaseDto = req.body;

    prisma.classBase.update({
        where: { id },
        data: updateData,
        include: {
            image: true,
            items: true,
            status: true,
        },
    })
    .then((classBase: any) => {
        res.json(classBase);
    })
    .catch((error: any) => {
        console.error('Error updating class base:', error);
        res.status(500).json({ error: 'Failed to update class base' });
    });
};

// DELETE /api/class-bases/:id - Delete class base
export const deleteClassBase: RequestHandler = (req, res) => {
    const { id } = req.params;

    prisma.classBase.delete({
        where: { id },
    })
    .then(() => {
        res.json({ message: 'Class base deleted successfully' });
    })
    .catch((error: any) => {
        console.error('Error deleting class base:', error);
        res.status(500).json({ error: 'Failed to delete class base' });
    });
}; 