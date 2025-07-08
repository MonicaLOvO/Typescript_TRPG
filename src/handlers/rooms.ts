import { Request, Response } from "express";
import { RoomDto, CreateRoomDto } from "../dtos/Room.dto";
import { prisma } from "../lib/prisma";

// GET /api/rooms - Get all rooms
export function getRooms(req: Request, res: Response) {
    prisma.room.findMany({
        select: {
            id: true,
            accountId: true,
            name: true,
            createdAt: true,
            updatedAt: true
        }
    })
    .then((rooms: any) => {
        res.json(rooms);
    })
    .catch((error: any) => {
        console.error('Error fetching rooms:', error);
        res.status(500).json([]);
    });
}

// GET /api/rooms/:id - Get room by ID
export function getRoomByID(req: Request, res: Response) {
    const { id } = req.params;
    
    prisma.room.findUnique({
        where: { id },
        select: {
            id: true,
            accountId: true,
            name: true,
            createdAt: true,
            updatedAt: true
        }
    })
    .then((room: any) => {
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json(room);
    })
    .catch((error: any) => {
        console.error('Error fetching room:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// GET /api/rooms/account/:accountId - Get rooms by account ID
export function getRoomsByAccount(req: Request, res: Response) {
    const { accountId } = req.params;
    
    prisma.room.findMany({
        where: { accountId },
        select: {
            id: true,
            accountId: true,
            name: true,
            createdAt: true,
            updatedAt: true
        }
    })
    .then((rooms: any) => {
        res.json(rooms);
    })
    .catch((error: any) => {
        console.error('Error fetching rooms by account:', error);
        res.status(500).json([]);
    });
}

// POST /api/rooms - Create new room
export function createRoom(req: Request, res: Response) {
    const roomDto = req.body as CreateRoomDto;
    
    // Check if account exists
    prisma.account.findUnique({
        where: { id: roomDto.accountId }
    })
    .then((account: any) => {
        if (!account) {
            res.status(400).json({ error: 'Account not found' });
            return null;
        }
        
        return prisma.room.create({
            data: {
                accountId: roomDto.accountId,
                name: roomDto.name
            },
            select: {
                id: true,
                accountId: true,
                name: true,
                createdAt: true,
                updatedAt: true
            }
        });
    })
    .then((room: any) => {
        if (room) {
            res.status(201).json(room);
        }
    })
    .catch((error: any) => {
        console.error('Error creating room:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// PUT /api/rooms/:id - Update room
export function updateRoom(req: Request, res: Response) {
    const { id } = req.params;
    const roomDto = req.body as RoomDto;
    
    prisma.room.findUnique({
        where: { id }
    })
    .then((existingRoom: any) => {
        if (!existingRoom) {
            res.status(404).json({ error: 'Room not found' });
            return null;
        }
        
        return prisma.room.update({
            where: { id },
            data: {
                ...(roomDto.name && { name: roomDto.name }),
                ...(roomDto.accountId && { accountId: roomDto.accountId })
            },
            select: {
                id: true,
                accountId: true,
                name: true,
                createdAt: true,
                updatedAt: true
            }
        });
    })
    .then((room: any) => {
        if (room) res.json(room);
    })
    .catch((error: any) => {
        console.error('Error updating room:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// DELETE /api/rooms/:id - Delete room
export function deleteRoom(req: Request, res: Response) {
    const { id } = req.params;
    
    prisma.room.findUnique({
        where: { id }
    })
    .then((existingRoom: any) => {
        if (!existingRoom) {
            res.status(404).json({ error: 'Room not found' });
            return null;
        }
        
        return prisma.room.delete({
            where: { id }
        });
    })
    .then((result: any) => {
        if (result) {
            res.json({ message: 'Room deleted successfully' });
        }
    })
    .catch((error: any) => {
        console.error('Error deleting room:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
} 