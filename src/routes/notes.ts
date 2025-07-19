import { Router } from "express";
import { 
    createNote, 
    deleteNote, 
    getNoteByID, 
    getNotes, 
    getNotesByActor,
    updateNote 
} from "../handlers/notes";

const router = Router();

// GET /api/notes - Get all notes
router.get('/', getNotes);

// GET /api/notes/actor/:actorId - Get notes by actor ID
router.get('/actor/:actorId', getNotesByActor);

// GET /api/notes/:id - Get note by ID
router.get('/:id', getNoteByID);

// POST /api/notes - Create new note
router.post('/', createNote);

// PUT /api/notes/:id - Update note
router.put('/:id', updateNote);

// DELETE /api/notes/:id - Delete note
router.delete('/:id', deleteNote);

export default router; 