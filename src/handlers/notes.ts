import { Request, Response } from "express";
import { NoteDto, CreateNoteDto } from "../dtos/Note.dto";
import { prisma } from "../lib/prisma";

// GET /api/notes - Get all notes
export function getNotes(req: Request, res: Response) {
    prisma.note.findMany({
        select: {
            id: true,
            actorId: true,
            title: true,
            content: true,
            createdAt: true,
            updatedAt: true
        }
    })
    .then((notes: any) => {
        res.json(notes);
    })
    .catch((error: any) => {
        console.error('Error fetching notes:', error);
        res.status(500).json([]);
    });
}

// GET /api/notes/:id - Get note by ID
export function getNoteByID(req: Request, res: Response) {
    const { id } = req.params;
    
    prisma.note.findUnique({
        where: { id },
        select: {
            id: true,
            actorId: true,
            title: true,
            content: true,
            createdAt: true,
            updatedAt: true
        }
    })
    .then((note: any) => {
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(note);
    })
    .catch((error: any) => {
        console.error('Error fetching note:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// GET /api/notes/actor/:actorId - Get notes by actor ID
export function getNotesByActor(req: Request, res: Response) {
    const { actorId } = req.params;
    
    prisma.note.findMany({
        where: { actorId },
        select: {
            id: true,
            actorId: true,
            title: true,
            content: true,
            createdAt: true,
            updatedAt: true
        }
    })
    .then((notes: any) => {
        res.json(notes);
    })
    .catch((error: any) => {
        console.error('Error fetching notes by actor:', error);
        res.status(500).json([]);
    });
}

// POST /api/notes - Create new note
export function createNote(req: Request, res: Response) {
    const noteDto = req.body as CreateNoteDto;
    
    // Check if actor exists
    prisma.roomActor.findUnique({
        where: { id: noteDto.actorId }
    })
    .then((actor: any) => {
        if (!actor) {
            res.status(400).json({ error: 'Actor not found' });
            return null;
        }
        
        return prisma.note.create({
            data: {
                actorId: noteDto.actorId,
                title: noteDto.title || '',
                content: noteDto.content || ''
            },
            select: {
                id: true,
                actorId: true,
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true
            }
        });
    })
    .then((note: any) => {
        if (note) {
            res.status(201).json(note);
        }
    })
    .catch((error: any) => {
        console.error('Error creating note:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// PUT /api/notes/:id - Update note
export function updateNote(req: Request, res: Response) {
    const { id } = req.params;
    const noteDto = req.body as NoteDto;
    
    prisma.note.findUnique({
        where: { id }
    })
    .then((existingNote: any) => {
        if (!existingNote) {
            res.status(404).json({ error: 'Note not found' });
            return null;
        }
        
        return prisma.note.update({
            where: { id },
            data: {
                ...(noteDto.title !== undefined && { title: noteDto.title }),
                ...(noteDto.content !== undefined && { content: noteDto.content }),
                ...(noteDto.actorId && { actorId: noteDto.actorId })
            },
            select: {
                id: true,
                actorId: true,
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true
            }
        });
    })
    .then((note: any) => {
        if (note) res.json(note);
    })
    .catch((error: any) => {
        console.error('Error updating note:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

// DELETE /api/notes/:id - Delete note
export function deleteNote(req: Request, res: Response) {
    const { id } = req.params;
    
    prisma.note.findUnique({
        where: { id }
    })
    .then((existingNote: any) => {
        if (!existingNote) {
            res.status(404).json({ error: 'Note not found' });
            return null;
        }
        
        return prisma.note.delete({
            where: { id }
        });
    })
    .then((result: any) => {
        if (result) {
            res.json({ message: 'Note deleted successfully' });
        }
    })
    .catch((error: any) => {
        console.error('Error deleting note:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
} 