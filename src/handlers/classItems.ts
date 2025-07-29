import { Request, Response, RequestHandler } from 'express';
import { CreateClassItemsDto, UpdateClassItemsDto } from '../dtos/ClassItems.dto';
import { prisma } from '../lib/prisma';

export const getAllClassItems: RequestHandler = async (req, res) => {
    try {
        const classItems = await prisma.classItems.findMany({
            include: {
                class: true,
                dice: true,
            },
        });
        res.json(classItems);
    } catch (error) {
        console.error('Error fetching class items:', error);
        res.status(500).json({ error: 'Failed to fetch class items' });
    }
};

export const getClassItemsById: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const classItem = await prisma.classItems.findUnique({
            where: { id },
            include: {
                class: true,
                dice: true,
            },
        });

        if (!classItem) {
            res.status(404).json({ error: 'Class item not found' });
            return;
        }

        res.json(classItem);
    } catch (error) {
        console.error('Error fetching class item:', error);
        res.status(500).json({ error: 'Failed to fetch class item' });
    }
};

export const getClassItemsByClassId: RequestHandler = async (req, res) => {
    try {
        const { classId } = req.params;
        const classItems = await prisma.classItems.findMany({
            where: { classId },
            include: {
                dice: true,
            },
        });
        res.json(classItems);
    } catch (error) {
        console.error('Error fetching class items by class ID:', error);
        res.status(500).json({ error: 'Failed to fetch class items' });
    }
};

export const createClassItems: RequestHandler = async (req, res) => {
    try {
        const classItemData: CreateClassItemsDto = req.body;

        const classItem = await prisma.classItems.create({
            data: {
                ...classItemData,
                quantity: classItemData.quantity || 1,
            },
            include: {
                class: true,
                dice: true,
            },
        });

        res.status(201).json(classItem);
    } catch (error) {
        console.error('Error creating class item:', error);
        res.status(500).json({ error: 'Failed to create class item' });
    }
};

export const updateClassItems: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData: UpdateClassItemsDto = req.body;

        const classItem = await prisma.classItems.update({
            where: { id },
            data: updateData,
            include: {
                class: true,
                dice: true,
            },
        });

        res.json(classItem);
    } catch (error) {
        console.error('Error updating class item:', error);
        res.status(500).json({ error: 'Failed to update class item' });
    }
};

export const deleteClassItems: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.classItems.delete({
            where: { id },
        });

        res.json({ message: 'Class item deleted successfully' });
    } catch (error) {
        console.error('Error deleting class item:', error);
        res.status(500).json({ error: 'Failed to delete class item' });
    }
}; 