import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateClassStatusDto, UpdateClassStatusDto } from '../dtos/ClassStatus.dto';

const prisma = new PrismaClient();

export const getAllClassStatus = async (req: Request, res: Response) => {
    try {
        const classStatus = await prisma.classStatus.findMany({
            include: {
                class: true,
            },
        });
        res.json(classStatus);
    } catch (error) {
        console.error('Error fetching class status:', error);
        res.status(500).json({ error: 'Failed to fetch class status' });
    }
};

export const getClassStatusById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const classStatusItem = await prisma.classStatus.findUnique({
            where: { id },
            include: {
                class: true,
            },
        });

        if (!classStatusItem) {
            return res.status(404).json({ error: 'Class status not found' });
        }

        res.json(classStatusItem);
    } catch (error) {
        console.error('Error fetching class status:', error);
        res.status(500).json({ error: 'Failed to fetch class status' });
    }
};

export const getClassStatusByClassId = async (req: Request, res: Response) => {
    try {
        const { classId } = req.params;
        const classStatus = await prisma.classStatus.findMany({
            where: { classId },
        });
        res.json(classStatus);
    } catch (error) {
        console.error('Error fetching class status by class ID:', error);
        res.status(500).json({ error: 'Failed to fetch class status' });
    }
};

export const createClassStatus = async (req: Request, res: Response) => {
    try {
        const classStatusData: CreateClassStatusDto = req.body;

        const classStatus = await prisma.classStatus.create({
            data: {
                ...classStatusData,
                value: classStatusData.value || 0,
            },
            include: {
                class: true,
            },
        });

        res.status(201).json(classStatus);
    } catch (error) {
        console.error('Error creating class status:', error);
        res.status(500).json({ error: 'Failed to create class status' });
    }
};

export const updateClassStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData: UpdateClassStatusDto = req.body;

        const classStatus = await prisma.classStatus.update({
            where: { id },
            data: updateData,
            include: {
                class: true,
            },
        });

        res.json(classStatus);
    } catch (error) {
        console.error('Error updating class status:', error);
        res.status(500).json({ error: 'Failed to update class status' });
    }
};

export const deleteClassStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.classStatus.delete({
            where: { id },
        });

        res.json({ message: 'Class status deleted successfully' });
    } catch (error) {
        console.error('Error deleting class status:', error);
        res.status(500).json({ error: 'Failed to delete class status' });
    }
}; 